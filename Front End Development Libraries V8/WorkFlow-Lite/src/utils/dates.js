/**
 * Todas las fechas del dominio se guardan como string ISO 8601 (UTC).
 * Nunca guardar instancias de Date directamente en el estado Redux:
 * no son serializables de forma fiable en localStorage ni en Redux DevTools.
 */

export function nowISO() {
  return new Date().toISOString();
}

export function formatDate(isoString, locale = 'es-ES') {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
