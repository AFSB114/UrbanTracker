import type { Company, CompanyFormData } from '../types/companyTypes';
import { CompaniesApi } from './api/companyApi';

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    const result = await CompaniesApi.getAllCompanies();
    if (!result.success) {
      console.error("Error cargando empresas:", result.message);
      throw new Error(result.message || "Error al cargar empresas");
    }
    console.log("Respuesta GET:", result);
    return result.data || [];
  },

  create: async (data: CompanyFormData): Promise<Company> => {
    console.log("Enviando datos al backend:", data);
    const result = await CompaniesApi.createCompany(data);
    if (!result.success) {
      console.error("Error creando empresa:", result.message);
      throw new Error(result.message || "No se pudo crear la empresa");
    }
    console.log("Respuesta POST:", result);
    return result.data!;
  },

  update: async (id: number, data: CompanyFormData): Promise<Company> => {
    const result = await CompaniesApi.updateCompany(id, data);
    if (!result.success) {
      console.error("Error actualizando empresa:", result.message);
      throw new Error(result.message || "No se pudo actualizar la empresa");
    }
    console.log("Respuesta PUT:", result);
    return result.data!;
  },

  delete: async (id: number): Promise<void> => {
    const result = await CompaniesApi.deleteCompany(id);
    if (!result.success) {
      console.error("Error eliminando empresa:", result.message);
      throw new Error(result.message || "No se pudo eliminar la empresa");
    }
  },
};