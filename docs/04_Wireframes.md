# Wireframes — WorkFlow Lite

Wireframes de baja fidelidad en ASCII. Suficientes para guiar la
implementación; no sustituyen decisiones de diseño visual detalladas.

## 1. Vista principal (lista de proyectos)

```
┌─────────────────────────────────────────────┐
│ WorkFlow Lite                        [+ Nuevo]│
├─────────────────────────────────────────────┤
│                                               │
│  ┌───────────────┐  ┌───────────────┐        │
│  │ ● Proyecto A   │  │ ● Proyecto B   │        │
│  │ 5 tareas       │  │ 2 tareas       │        │
│  └───────────────┘  └───────────────┘        │
│                                               │
└─────────────────────────────────────────────┘
```

## 2. Vista de proyecto (lista de tareas)

```
┌─────────────────────────────────────────────┐
│ < Proyecto A                          [+ Tarea]│
├─────────────────────────────────────────────┤
│ [ Buscar... ] [Estado ▾] [Prioridad ▾] [Orden ▾]│
├─────────────────────────────────────────────┤
│ ┌───────────────────────────────────────┐   │
│ │ Configurar Vite            [Alta]  ✓  │   │
│ ├───────────────────────────────────────┤   │
│ │ Diseñar modelo de datos    [Media]    │   │
│ ├───────────────────────────────────────┤   │
│ │ Escribir tests             [Baja]     │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## 3. Modal — crear/editar tarea

```
┌───────────────────────────────┐
│ Nueva tarea                [x]│
├───────────────────────────────┤
│ Título     [___________________]│
│ Descripción[___________________]│
│ Prioridad  [ Baja / Media / Alta ]│
│ Estado     [ Por hacer ▾ ]      │
│                                 │
│              [Cancelar] [Guardar]│
└───────────────────────────────┘
```

## 4. Mobile (< 768px)

```
┌───────────────────┐
│ WorkFlow Lite   ☰  │
├───────────────────┤
│ [ Buscar...      ] │
├───────────────────┤
│ ● Proyecto A       │
│   5 tareas         │
├───────────────────┤
│ ● Proyecto B       │
│   2 tareas         │
├───────────────────┤
│         [+ Nuevo]  │
└───────────────────┘
```

## Estados especiales a cubrir

- **Vacío**: sin proyectos → `EmptyState` invitando a crear el primero.
- **Vacío con filtros activos**: hay tareas, pero el filtro no arroja
  resultados → mensaje distinto ("no hay coincidencias", con opción de
  limpiar filtros).
- **Error**: fallo al leer/escribir `localStorage` (ver
  `src/services/storage.js`, ya maneja el `catch`).
