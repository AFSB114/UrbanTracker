import type { Company, CompanyFormData } from '../types/companyTypes';

const API_URL = 'http://localhost:8085/api/v1/public/company';

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.error("Error cargando empresas:", response.status, await response.text());
      throw new Error("Error al cargar empresas");
    }
    const result = await response.json();
    console.log("Respuesta GET:", result);
    return result.data;
  },

  create: async (data: CompanyFormData): Promise<Company> => {
    console.log("Enviando datos al backend:", data);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error creando empresa:", response.status, await response.text());
      throw new Error("No se pudo crear la empresa");
    }

    const result = await response.json();
    console.log("Respuesta POST:", result);
    return result.data; 
  },

  update: async (id: number, data: CompanyFormData): Promise<Company> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error actualizando empresa:", response.status, await response.text());
      throw new Error("No se pudo actualizar la empresa");
    }

    const result = await response.json();
    console.log("Respuesta PUT:", result);
    return result.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Error eliminando empresa:", response.status, await response.text());
      throw new Error("No se pudo eliminar la empresa");
    }
  },
};