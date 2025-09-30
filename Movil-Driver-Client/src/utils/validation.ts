// Utilidades de validación reutilizables

/**
 * Valida si un email tiene formato correcto
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un teléfono tiene formato correcto (números colombianos)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^3[0-9]{9}$/; // 10 dígitos empezando con 3
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida si una identificación es válida (números colombianos)
 */
export const isValidIdentification = (id: string): boolean => {
  const idRegex = /^[0-9]{8,10}$/;
  return idRegex.test(id.replace(/\s/g, ''));
};

/**
 * Valida si una contraseña es segura
 */
export const isValidPassword = (password: string): boolean => {
  // Al menos 6 caracteres, una letra y un número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  return passwordRegex.test(password);
};

/**
 * Valida si un texto no está vacío
 */
export const isNotEmpty = (text: string): boolean => {
  return Boolean(text && text.trim().length > 0);
};

/**
 * Valida longitud de texto
 */
export const isValidLength = (text: string, min: number, max: number): boolean => {
  const length = text.trim().length;
  return length >= min && length <= max;
};

/**
 * Valida si un número está en un rango
 */
export const isInRange = (number: number, min: number, max: number): boolean => {
  return number >= min && number <= max;
};

/**
 * Valida coordenadas geográficas
 */
export const isValidCoordinate = (lat: number, lon: number): boolean => {
  return isInRange(lat, -90, 90) && isInRange(lon, -180, 180);
};

/**
 * Valida timestamp
 */
export const isValidTimestamp = (timestamp: number): boolean => {
  return timestamp > 0 && timestamp <= Date.now();
};

/**
 * Obtiene el primer error de validación
 */
export const getFirstValidationError = (errors: string[]): string | null => {
  return errors.length > 0 ? errors[0] : null;
};

/**
 * Combina múltiples validaciones
 */
export const combineValidations = (
  ...validations: Array<{ isValid: boolean; error: string }>
): { isValid: boolean; errors: string[] } => {
  const errors = validations
    .filter(validation => !validation.isValid)
    .map(validation => validation.error);

  return {
    isValid: errors.length === 0,
    errors
  };
};