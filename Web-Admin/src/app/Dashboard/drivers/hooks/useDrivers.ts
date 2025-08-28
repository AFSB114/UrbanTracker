import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Driver, DriverFormData, DriverStatistics, UseDriversReturn } from '../types/driverTypes';

const MOCK_DRIVERS: Driver[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    identification: "12345678",
  },
  {
    id: 2,
    name: "María García",
    identification: "87654321",
  },
  {
    id: 3,
    name: "José Rodríguez",
    identification: "11223344",
  },
];

const INITIAL_FORM_DATA: DriverFormData = {
  name: '',
  identification: '',
};

export const useDrivers = (): UseDriversReturn => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<DriverFormData>(INITIAL_FORM_DATA);

  // Load initial drivers
  useEffect(() => {
    const loadDrivers = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setDrivers(MOCK_DRIVERS);
      } catch (error) {
        console.error('Failed to load drivers:', error);
      }
    };

    loadDrivers();
  }, []);

  // Filter drivers based on search term
  const filteredDrivers = useMemo(() => {
    if (!searchTerm.trim()) {
      return drivers;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    return drivers.filter(driver => 
      driver.name.toLowerCase().includes(searchLower) ||
      driver.identification.toLowerCase().includes(searchLower)
    );
  }, [drivers, searchTerm]);

  // Calculate statistics
  const statistics = useMemo((): DriverStatistics => {
    return {
      totalDrivers: drivers.length,
      activeDrivers: drivers.length, // All drivers are considered active in this simple version
      newThisMonth: Math.floor(drivers.length * 0.3), // Mock: 30% are new this month
    };
  }, [drivers]);

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setEditingDriver(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  }, []);

  const openEditModal = useCallback((driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      identification: driver.identification,
    });
    setIsDialogOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingDriver(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  // Form data handler
  const updateFormData = useCallback((field: keyof DriverFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Save driver (create or update)
  const saveDriver = useCallback(async () => {
    try {
      // Validate form
      if (!formData.name.trim() || !formData.identification.trim()) {
        throw new Error('Name and identification are required');
      }

      // Check for duplicate identification
      const isDuplicate = drivers.some(driver => 
        driver.identification === formData.identification.trim() && 
        driver.id !== editingDriver?.id
      );

      if (isDuplicate) {
        throw new Error('A driver with this identification already exists');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingDriver) {
        // Update existing driver
        setDrivers(prev =>
          prev.map(driver =>
            driver.id === editingDriver.id
              ? {
                  ...driver,
                  name: formData.name.trim(),
                  identification: formData.identification.trim(),
                }
              : driver
          )
        );
      } else {
        // Create new driver
        const newId = Math.max(...drivers.map(d => d.id), 0) + 1;
        const newDriver: Driver = {
          id: newId,
          name: formData.name.trim(),
          identification: formData.identification.trim(),
        };
        setDrivers(prev => [...prev, newDriver]);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving driver:', error);
      throw error; // Re-throw for component to handle
    }
  }, [drivers, editingDriver, formData, closeModal]);

  // Delete driver
  const deleteDriver = useCallback(async (id: number) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDrivers(prev => prev.filter(driver => driver.id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
      throw error;
    }
  }, []);

  return {
    filteredDrivers,
    searchTerm,
    isDialogOpen,
    editingDriver,
    formData,
    statistics,
    setSearchTerm,
    openCreateModal,
    openEditModal,
    closeModal,
    updateFormData,
    saveDriver,
    deleteDriver,
  };
};