# Definition of Done (DoD) por fase

Regla general: una fase no se da por terminada por haber invertido las
horas estimadas, sino por cumplir **todos** los checks de su DoD. Si al
llegar al límite de horas estimado no se cumplen, se registra honestamente
como "en progreso" y se decide si continuar o recortar alcance — nunca se
marca como hecho sin verificar.

Estimación total: **45-60 horas** (1-2 semanas de trabajo dedicado).

---

## Fase 0 — Diseño (6-8 h)

- [ ] Modelo de datos cerrado (`02_Data_Model.md`), sin campos "por decidir".
- [ ] Wireframes de las pantallas principales (`04_Wireframes.md`).
- [ ] Diagrama del estado Redux (`03_Redux_Diagram.md`).
- [ ] Alcance V1 congelado (`01_Scope.md`) — cualquier idea nueva va a
      `06_Roadmap.md`, no al scope actual.

## Fase 1 — Configuración (2-3 h)

- [ ] `npm install` funciona desde cero, sin errores.
- [ ] `npm run dev` levanta la app sin errores en consola.
- [ ] `npm run build` finaliza correctamente.
- [ ] `npm run lint` no reporta errores (warnings son aceptables si están
      justificados).

## Fase 2 — Arquitectura base (4-5 h)

- [ ] La app renderiza el layout completo (`App.jsx` + `Header`).
- [ ] Redux DevTools muestra el estado inicial de los 4 slices.
- [ ] Ningún componente de esta fase contiene lógica de negocio todavía
      (sin dispatch de acciones de dominio aún).

## Fase 3 — CRUD de proyectos (6-8 h)

- [ ] Crear, editar y eliminar proyectos funcionan desde la interfaz.
- [ ] El estado Redux (`projects` slice) refleja correctamente cada
      operación — verificado con Redux DevTools, no solo "a ojo" en la UI.
- [ ] Tras recargar la página (F5), los proyectos creados persisten.

## Fase 4 — CRUD de tareas (8-10 h)

- [ ] Crear, editar, eliminar y cambiar estado de tareas funcionan desde
      la interfaz.
- [ ] Toda tarea tiene siempre un `projectId` válido — no existen tareas
      huérfanas (verificado con el test de integridad en
      `tests/features/tasksSlice.test.js`).
- [ ] Al eliminar un proyecto, sus tareas desaparecen también (mismo test).
- [ ] Tras recargar la página, las tareas y su estado persisten
      correctamente.

## Fase 5 — Filtros y búsqueda (4-6 h)

- [ ] Los selectores de tareas visibles usan `createSelector`
      (`filtersSlice.js`) — verificado leyendo el código, no solo
      probando que "funciona".
- [ ] Cambiar un filtro no muta el array original de tareas (verificado
      con el test correspondiente).
- [ ] Combinar búsqueda + filtro de estado + filtro de prioridad produce
      resultados coherentes (probado manualmente con al menos 2
      combinaciones).

## Fase 6 — Estilos (4-6 h)

- [ ] La aplicación es usable en una ventana de 375px de ancho (mobile) y
      en escritorio — verificado con las devtools del navegador, no solo
      redimensionando la ventana a ojo.
- [ ] No hay estilos duplicados evidentes entre `_components.scss` y
      utilidades de Bootstrap ya existentes.
- [ ] El tema de Bootstrap refleja las variables de `_variables.scss`
      (colores personalizados visibles en botones/badges).

## Fase 7 — Testing (5-7 h)

- [ ] `npm test` — todos los tests pasan.
- [ ] Existe al menos un test por cada reducer principal (`projects`,
      `tasks`).
- [ ] Existe al menos un test para los selectores memoizados
      (`selectVisibleTasks`).
- [ ] Existe al menos un test de componente (`PriorityBadge` u otro).
- [ ] Existe al menos un test que ejercite un flujo de dos pasos (p. ej.
      crear proyecto → crear tarea → verificar integridad).
- [ ] No hay tests triviales cuyo único propósito sea aumentar un número
      de cobertura (`expect(true).toBe(true)` o equivalentes).

## Fase 8 — Documentación (3-4 h)

- [ ] Un tercero puede clonar el repositorio y ejecutarlo siguiendo
      únicamente el `README.md` — idealmente verificado pidiéndole a
      otra persona que lo intente, o repitiendo el proceso en una carpeta
      limpia.
- [ ] Todas las funcionalidades de la V1 (`01_Scope.md`) están
      documentadas y su casilla marcada como completa.
- [ ] El roadmap V2 (`06_Roadmap.md`) está separado explícitamente de lo
      implementado — nadie debería poder confundir "hecho" con "planeado".
