# Diagrama del estado Redux

## Forma del store

```
RootState
├── projects
│   ├── items: { [id]: Project }
│   └── allIds: string[]
│
├── tasks
│   ├── items: { [id]: Task }
│   └── allIds: string[]
│
├── filters
│   ├── searchTerm: string
│   ├── status: 'all' | TaskStatus
│   ├── priority: 'all' | TaskPriority
│   ├── sortBy: 'createdAt' | 'title' | 'priority'
│   └── sortDirection: 'asc' | 'desc'
│
└── ui   (NO se persiste)
    ├── activeModal: string | null
    ├── activeEntityId: string | null
    └── theme: 'light' | 'dark'
```

Nota sobre la normalización: `projects` y `tasks` usan el patrón
`{ items, allIds }` en vez de arrays planos. Es el mismo patrón que
`createEntityAdapter` de Redux Toolkit formaliza; aquí se implementa a
mano para que sea explícito y fácil de explicar en una entrevista, pero es
intercambiable por `createEntityAdapter` sin cambiar la forma del estado
observable.

## Slices y sus responsabilidades

| Slice      | Responsabilidad                                         | Se persiste |
|------------|-----------------------------------------------------------|:-----------:|
| `projects` | CRUD de proyectos                                          | Sí |
| `tasks`    | CRUD de tareas + integridad referencial con `projects`     | Sí |
| `filters`  | Estado de búsqueda, filtros y ordenamiento                 | Sí |
| `ui`       | Estado efímero de interfaz (modales, tema)                 | No |

## Flujo de una acción típica: crear tarea

```
UI (TaskForm)
   │
   │ dispatch(taskCreated({ projectId, title, priority }))
   ▼
tasksSlice.reducer
   │  - genera id (nanoid)
   │  - genera createdAt/updatedAt (nowISO)
   │  - status por defecto: 'todo'
   ▼
store.subscribe() → debounce 300ms → saveState() → localStorage
   │
   ▼
selectVisibleTasksByProject (createSelector)
   │  - filtra por proyecto, búsqueda, estado, prioridad
   │  - ordena según filters.sortBy/sortDirection
   ▼
UI vuelve a renderizar solo si el resultado memoizado cambia
```

## Por qué `filters` es un slice separado de `tasks`

Separar el estado de "qué hay" (`tasks`) del estado de "qué se está
mirando ahora" (`filters`) permite que los selectores de `filters`
combinen ambos sin que `tasksSlice` necesite saber nada de búsqueda o
ordenamiento. Esto es lo que en la rúbrica del certificado se evalúa como
"estado global normalizado y selectores memorizados": los selectores en
`filtersSlice.js` (`selectVisibleTasks`, `selectVisibleTasksByProject`)
son el ejemplo central de `createSelector` en este proyecto.
