# Checklist de implementación

Cada item corresponde a lo que sería un issue individual. Márcalos a
medida que cumplen el DoD de su fase (`05_Definition_of_Done.md`), no
antes. El scaffold entregado ya resuelve una parte de Fase 0-2; revisa qué
ya existe antes de reimplementar.

## Fase 0 — Diseño
- [x] Modelo de datos (`02_Data_Model.md`)
- [x] Wireframes (`04_Wireframes.md`)
- [x] Diagrama Redux (`03_Redux_Diagram.md`)
- [x] Scope congelado (`01_Scope.md`)

## Fase 1 — Configuración
- [x] Vite + React + Redux Toolkit + Sass + Bootstrap instalados (`package.json`)
- [x] ESLint + Prettier configurados
- [ ] `npm install` verificado en máquina limpia
- [ ] `npm run build` verificado

## Fase 2 — Arquitectura base
- [x] Estructura de carpetas
- [x] Store con persistencia debounced (`app/store.js`)
- [x] Layout mínimo (`App.jsx`, `Header`)
- [ ] Verificar en Redux DevTools que los 4 slices aparecen con su estado inicial

## Fase 3 — CRUD de proyectos
- [x] Slice `projects` con `projectCreated`, `projectUpdated`, `projectDeleted`
- [x] Selectores `selectAllProjects`, `selectProjectById`
- [x] Tests del reducer
- [ ] Componente `ProjectList` (grid de `ProjectCard`)
- [ ] Componente `ProjectCard`
- [ ] Componente `ProjectForm` (crear/editar) dentro de un `Modal`
- [ ] Confirmación antes de eliminar un proyecto
- [ ] Verificar persistencia tras recargar (manual)

## Fase 4 — CRUD de tareas
- [x] Slice `tasks` con integridad referencial (`extraReducers` sobre `projectDeleted`)
- [x] Selectores `selectAllTasks`, `selectTasksByProjectId`
- [x] Tests del reducer + integridad referencial
- [ ] Componente `TaskList`
- [ ] Componente `TaskCard` (usa `PriorityBadge`)
- [ ] Componente `TaskForm` (crear/editar) dentro de un `Modal`
- [ ] Selector de estado (`todo`/`in-progress`/`done`) en `TaskCard`
- [ ] Validaciones de formulario: título requerido (1-120 chars), longitud de descripción

## Fase 5 — Filtros y búsqueda
- [x] Slice `filters` con `selectVisibleTasks`/`selectVisibleTasksByProject` (`createSelector`)
- [x] Tests de filtrado y ordenamiento
- [ ] Componente `SearchBar` (considerar `useDebounce`, ver Fase 5 extendida)
- [ ] Componente `Filters` (selects de estado/prioridad + orden)
- [ ] Custom hook `useDebounce` para el input de búsqueda
- [ ] Verificar combinaciones de filtros manualmente (búsqueda + estado + prioridad)

## Fase 6 — Estilos
- [x] Sass modular con `@use` (`_variables`, `_mixins`, `_functions`, `_layout`, `_components`, `_pages`)
- [x] Bootstrap personalizado vía variables (`main.scss`)
- [ ] Revisión responsive en 375px, 768px, 1200px
- [ ] Custom hook `useTheme` + toggle de tema oscuro (usa `uiSlice.themeToggled`)
- [ ] Estados vacíos con y sin filtros activos (`EmptyState` ya existe como base)

## Fase 7 — Testing
- [x] Test de reducer `projects`
- [x] Test de reducer `tasks` + integridad referencial
- [x] Test de selector `selectVisibleTasks`
- [x] Test de componente `PriorityBadge`
- [ ] Test de integración: crear proyecto → crear tarea → aparece en la lista
- [ ] `npm run test:coverage` ejecutado y revisado (sin meta numérica, solo
      verificar que las piezas críticas están cubiertas)

## Fase 8 — Documentación
- [x] README con instrucciones de instalación/ejecución/testing
- [ ] Capturas de pantalla o GIF del flujo principal
- [ ] Revisar que todas las casillas de `01_Scope.md` reflejen el estado real
- [ ] Pedir a alguien más que clone y ejecute siguiendo solo el README

## Custom hooks pendientes (usados en varias fases)

- [ ] `useDebounce(value, delay)`
- [ ] `useLocalStorage` — opcional si `services/storage.js` ya cubre el caso
- [ ] `useTheme` — lee/actualiza `ui.theme` vía Redux
- [ ] `useModal` — abre/cierra `ui.activeModal` con `activeEntityId`
