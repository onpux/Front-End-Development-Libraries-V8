// Capa de persistencia. Toda lectura/escritura a localStorage pasa por aquí.
// Incluye versión de esquema desde el día 1, aunque en V1 no haya migraciones
// reales todavía: así, si el modelo cambia en V2, ya existe el mecanismo.

const STORAGE_KEY = 'workflow-lite:state';
const SCHEMA_VERSION = 1;

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);

    if (parsed.__version !== SCHEMA_VERSION) {
      // Punto de extensión: aquí se añadirían funciones de migración
      // por versión (v1 -> v2 -> v3) cuando el modelo evolucione.
      console.warn(
        `[storage] Versión de esquema distinta (guardada: ${parsed.__version}, actual: ${SCHEMA_VERSION}). Se ignora el estado persistido.`,
      );
      return undefined;
    }

    return parsed.state;
  } catch (err) {
    console.error('[storage] Error leyendo el estado persistido:', err);
    return undefined;
  }
}

export function saveState(state) {
  try {
    const payload = JSON.stringify({
      __version: SCHEMA_VERSION,
      state,
    });
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (err) {
    console.error('[storage] Error guardando el estado:', err);
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
