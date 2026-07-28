# Alcance V1 — Congelado

Fecha de congelación: al completar Fase 0 (ver `05_Definition_of_Done.md`).

Cualquier idea nueva que surja durante el desarrollo se anota en
`06_Roadmap.md` y NO se implementa en esta versión, sin excepción.

## Entidades

- **Project**: contenedor de tareas.
- **Task**: unidad de trabajo, pertenece siempre a un Project.

## Funcionalidades incluidas

### Proyectos
- [ ] Crear proyecto
- [ ] Editar proyecto
- [ ] Eliminar proyecto (elimina también sus tareas — integridad referencial)

### Tareas
- [ ] Crear tarea (asociada a un proyecto existente)
- [ ] Editar tarea
- [ ] Eliminar tarea
- [ ] Cambiar estado (todo / in-progress / done)

### Búsqueda y filtros
- [ ] Búsqueda por texto (título + descripción)
- [ ] Filtro por estado
- [ ] Filtro por prioridad
- [ ] Ordenamiento (fecha, título, prioridad)

### Persistencia
- [ ] Guardar en `localStorage`
- [ ] Recuperar al recargar la página
- [ ] Versión de esquema desde el día 1 (sin migraciones reales aún)

### UI
- [ ] Layout responsive (mobile-first)
- [ ] Tema Bootstrap personalizado vía Sass
- [ ] Estados vacíos (empty states)

## Explícitamente fuera de alcance

Ver `00_Project_Contract.md` → sección "Qué NO entra en la V1" y
`06_Roadmap.md` para el detalle de qué se pospone y por qué.
