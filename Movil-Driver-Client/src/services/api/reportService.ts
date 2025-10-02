export interface ReportData {
  asunto: string;
  descripcion: string;
  timestamp: string;
  tipo?: string;
  prioridad?: 'baja' | 'media' | 'alta' | 'urgente';
}

export interface ReportValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ReportService {
  /**
   * Envía un reporte de novedad
   */
  static async sendReport(
    reportData: Omit<ReportData, 'timestamp'>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Validar datos del reporte
      const validation = this.validateReportData(reportData);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Datos inválidos: ${validation.errors.join(', ')}`,
        };
      }

      const report: ReportData = {
        ...reportData,
        timestamp: new Date().toISOString(),
        tipo: reportData.tipo || 'novedad',
        prioridad: reportData.prioridad || 'media',
      };

      // Por ahora, simular envío exitoso
      // TODO: Integrar con API real para envío de reportes
      console.log('📋 Reporte preparado para envío:', report);

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { success: true };
    } catch (error) {
      console.error('❌ Error enviando reporte:', error);
      return {
        success: false,
        error: 'Error interno del servidor',
      };
    }
  }

  /**
   * Valida los datos de un reporte
   */
  static validateReportData(
    reportData: Omit<ReportData, 'timestamp' | 'tipo' | 'prioridad'>
  ): ReportValidationResult {
    const errors: string[] = [];

    // Validar asunto
    if (!reportData.asunto || reportData.asunto.trim().length === 0) {
      errors.push('El asunto es requerido');
    } else if (reportData.asunto.length < 5) {
      errors.push('El asunto debe tener al menos 5 caracteres');
    } else if (reportData.asunto.length > 100) {
      errors.push('El asunto no puede exceder 100 caracteres');
    }

    // Validar descripción
    if (!reportData.descripcion || reportData.descripcion.trim().length === 0) {
      errors.push('La descripción es requerida');
    } else if (reportData.descripcion.length < 10) {
      errors.push('La descripción debe tener al menos 10 caracteres');
    } else if (reportData.descripcion.length > 500) {
      errors.push('La descripción no puede exceder 500 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Obtiene estadísticas de reportes (simulado)
   */
  static async getReportStats(): Promise<{
    total: number;
    pendientes: number;
    resueltos: number;
    ultimoReporte?: string;
  }> {
    // Simular datos de estadísticas
    // TODO: Integrar con API real
    return {
      total: 15,
      pendientes: 3,
      resueltos: 12,
      ultimoReporte: new Date().toISOString(),
    };
  }

  /**
   * Formatea un reporte para mostrar en la UI
   */
  static formatReportForDisplay(report: ReportData): {
    asunto: string;
    descripcion: string;
    fecha: string;
    prioridad: string;
    tipo: string;
  } {
    return {
      asunto: report.asunto,
      descripcion:
        report.descripcion.length > 100
          ? `${report.descripcion.substring(0, 100)}...`
          : report.descripcion,
      fecha: new Date(report.timestamp).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      prioridad: report.prioridad || 'media',
      tipo: report.tipo || 'novedad',
    };
  }

  /**
   * Genera un ID único para el reporte
   */
  static generateReportId(): string {
    return `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
