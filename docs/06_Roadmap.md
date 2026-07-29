# Roadmap V2 (no implementado)

Todo lo listado aquí está **explícitamente fuera de la V1**. Nada de esto
cuenta como "hecho" hasta que se mueva a `01_Scope.md` de una futura
versión, con su propio DoD.

La intención de esta lista es doble: (1) evitar que estas ideas se cuelen
en la V1 por impulso durante el desarrollo, y (2) dejar constancia de que
fueron consideradas y descartadas conscientemente, no por desconocimiento.

## Candidatas a un segundo proyecto (nivel senior/arquitectura avanzada)

- **TypeScript**: migración completa del proyecto, con tipos estrictos
  para `Project`, `Task` y el estado Redux.
- **Testing exhaustivo**: cobertura como métrica de calidad de proceso
  (ej. 80%+), tests de integración end-to-end con Playwright o Cypress.
- **Drag & drop** entre columnas de estado (`todo` → `in-progress` →
  `done`), lo que requeriría introducir el campo `order: number` en
  `Task` mediante una migración de esquema real (el mecanismo de versión
  ya existe en `src/services/storage.js`, ver `02_Data_Model.md`).
- **Rendimiento avanzado**: `React.memo`, `useMemo`/`useCallback` de
  forma sistemática (no solo donde ya son necesarios), `React.lazy` +
  `Suspense`, code splitting por ruta.
- **Comentarios y checklists por tarea**: subentidades anidadas, lo que
  complica la normalización del estado.
- **Multi-usuario / responsables de tarea**: requiere una entidad `User`
  y decisiones de autenticación, aunque sea simulada.
- **Actividad / auditoría**: registro de cambios por entidad.
- **Accesibilidad profunda**: auditoría completa con axe-core, navegación
  por teclado exhaustiva, gestión de foco en modales anidados.
- **Backend real**: API REST o GraphQL en lugar de `localStorage`, con
  sincronización y manejo de conflictos.

## Por qué se separan y no se integran en la V1

Ver `00_Project_Contract.md`. Mezclar estas competencias con las del
certificado v8 diluye lo que el proyecto puede demostrar de forma clara:
un evaluador (o el propio autor, revisando el repo meses después) debe
poder mirar la V1 y concluir en minutos "esto demuestra React + Redux +
Sass + Bootstrap", sin tener que separar mentalmente qué parte pertenece
a qué nivel de competencia.
