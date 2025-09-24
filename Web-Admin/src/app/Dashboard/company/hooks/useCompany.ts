import { useState, useEffect, useMemo, useCallback } from "react";
import { companyService } from "../services/companyService";
import type { Company, CompanyFormData, UseCompaniesReturn, PaginationData, PaginationConfig, CompanyStatistics, } from "../types/companyTypes";

const INITIAL_FORM_DATA: CompanyFormData = {
  name: "",
  nit: "",
  phone: "",
  email: "",
  country: "colombia",
};

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useCompanies = (): UseCompaniesReturn => {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<CompanyFormData>(INITIAL_FORM_DATA);

  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);


  const loadCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to load companies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);


  const filteredCompanies = useMemo(() => {
    const safeCompanies = Array.isArray(companies) ? companies : [];

    if (!searchTerm.trim()) {
      return safeCompanies;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    if (statusFilter === "all") {
      return companies.filter(company =>
        company.name.toLowerCase().includes(searchLower) ||
        company.nit.toLowerCase().includes(searchLower) ||
        company.phone.toLowerCase().includes(searchLower) ||
        company.email.toLowerCase().includes(searchLower) ||
        company.country.toLowerCase().includes(searchLower)
      );
    }

    return companies.filter(company =>
      company.name.toLowerCase().includes(searchLower) ||
      company.nit.toLowerCase().includes(searchLower) ||
      company.phone.toLowerCase().includes(searchLower) ||
      company.email.toLowerCase().includes(searchLower) ||
      company.country.toLowerCase().includes(searchLower)
    );
  }, [companies, searchTerm, statusFilter]);

  useEffect(() => {
    setPaginationConfig((prev) => ({ ...prev, page: 1 }));
  }, [paginationConfig.itemsPerPage]);

  // Calculate pagination data (now using server data)
  const pagination = useMemo((): PaginationData => {
    const totalItems = companies.length;
    const totalPages = Math.ceil(totalItems / paginationConfig.itemsPerPage);
    const currentPage = Math.min(paginationConfig.page, Math.max(1, totalPages));
    const startIndex = (currentPage - 1) * paginationConfig.itemsPerPage;
    const endIndex = Math.min(startIndex + paginationConfig.itemsPerPage, totalItems);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: paginationConfig.itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [companies.length, paginationConfig]);

  const paginatedCompanies = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return companies.slice(startIndex, endIndex);
  }, [companies, pagination]);

  // Calculate statistics
  const statistics = useMemo((): CompanyStatistics => {
    return {
      totalCompanies: companies.length,
      activeCompanies: companies.length,
      inactiveCompanies: companies.length,
      newThisMonth: Math.floor(companies.length * 0.3),
    };
  }, [companies.length]);

  const setPage = useCallback((page: number) => {
    setPaginationConfig((prev) => ({ ...prev, page }));
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setPaginationConfig((prev) => ({
      ...prev,
      itemsPerPage,
      page: 1,
    }));
  }, []);

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setEditingCompany(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  }, []);

  const openEditModal = useCallback((company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      nit: company.nit,
      phone: company.phone,
      email: company.email,
      country: company.country,
    });
    setIsDialogOpen(true);
  }, []);

  const openDeleteModal = useCallback((company: Company) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingCompany(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setCompanyToDelete(null);
  }, []);

  // Form data handler
  const updateFormData = useCallback((field: keyof CompanyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveCompany = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      // Client-side validation
      if (!formData.name.trim() || !formData.nit.trim()) {
        throw {
          message: "El nombre y el NIT son obligatorios",
          status: 400,
        }
      }

      const companyData = {
        name: formData.name.trim(),
        nit: formData.nit.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        country: formData.country.trim(),
      };

      if (editingCompany) {
        await companyService.update(editingCompany.id, companyData);
      } else {
        await companyService.create(companyData);
      }

      await loadCompanies(); 
      closeModal();
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [editingCompany, formData, closeModal, isSaving, loadCompanies]);

  // Delete company
  const confirmDeleteCompany = useCallback(async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await companyService.delete(companyToDelete!.id);
      await loadCompanies();
      closeDeleteModal();
    } catch (error) {
      throw error; 
    } finally {
      setIsDeleting(false);
    }
  }, [companyToDelete, closeDeleteModal, isDeleting, loadCompanies]);

  return {
    // Data
    filteredCompanies,
    paginatedCompanies,
    searchTerm,
    statistics,
    pagination,

    // Modal states
    isDialogOpen,
    isDeleteModalOpen,
    editingCompany,
    companyToDelete,
    formData,

    // Loading states
    isLoading,
    isDeleting,
    isSaving,

    // Actions
    setSearchTerm,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveCompany,
    confirmDeleteCompany,
    setStatusFilter,
  };
};