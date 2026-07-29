# Project Contract — WorkFlow Lite

## Propósito

Este proyecto existe para demostrar, con alto grado de confianza y de forma
verificable, el dominio de las competencias evaluadas por el certificado
**Front End Development Libraries (v8)** de FreeCodeCamp: React, Redux,
Bootstrap y Sass.

No existe para demostrar nivel senior, arquitectura de producción a gran
escala, ni dominio de TypeScript, testing exhaustivo o rendimiento avanzado.
Esas competencias se abordarán, si se desea, en un **segundo proyecto
independiente** (ver `06_Roadmap.md`).

## Regla de oro

> Si una funcionalidad no ayuda a demostrar React, Redux, Sass o Bootstrap
> a nivel del certificado v8, no entra en la V1. Se anota en el roadmap y se
> sigue adelante.

## Qué SÍ entra en la V1

- Componentes React reutilizables, props, estado, hooks, formularios,
  renderizado condicional, listas.
- Redux Toolkit: slices, reducers, actions, selectores memoizados
  (`createSelector`).
- Sass modular con `@use`, variables, mixins, partials.
- Bootstrap personalizado vía variables de Sass (no solo importado tal cual).
- Persistencia simple en `localStorage` con versión de esquema.
- Testing básico: reducers, un selector, dos componentes, un flujo de
  integración.

## Qué NO entra en la V1

- TypeScript.
- Cobertura de testing como objetivo en sí mismo (no hay meta de "80%").
- Drag & drop.
- Comentarios, checklists o usuarios por tarea.
- Migraciones de esquema reales (el mecanismo existe, pero no se ejercita).
- `React.lazy`, `Suspense`, code splitting.
- Backend o sincronización remota.

## Cómo se usa este documento

Antes de añadir cualquier funcionalidad no listada en `01_Scope.md`,
volver a este contrato y responder: **¿esto demuestra el certificado v8, o
demuestra otra cosa?** Si es lo segundo, va al roadmap.
