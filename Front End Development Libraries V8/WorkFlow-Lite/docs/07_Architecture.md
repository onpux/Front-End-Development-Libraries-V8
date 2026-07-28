# Arquitectura

## Estructura de carpetas

```
src/
├── app/            # Store de Redux y hooks tipados (useAppDispatch/useAppSelector)
├── assets/         # Imágenes, iconos estáticos
├── components/     # Componentes de UI genéricos, sin lógica de dominio
│   ├── Header/
│   ├── EmptyState/
│   ├── Button/
│   └── PriorityBadge/
├── constants/       # Fuente única de verdad para enums de dominio (status, priority)
├── features/        # Un slice de Redux por dominio, con sus selectores junto al reducer
│   ├── projects/
│   ├── tasks/
│   ├── filters/
│   └── ui/
├── hooks/           # Custom hooks reutilizables (useDebounce, useLocalStorage, etc.)
├── services/         # Acceso a APIs externas o localStorage — la única capa que
│                      # sabe que existe `localStorage`
├── styles/           # Sass modular (@use), personalización de Bootstrap
├── utils/            # Funciones puras sin dependencias de React ni Redux
└── main.jsx          # Entrypoint
```

## Principios de organización

**Un slice = una carpeta en `features/`.** El reducer, las actions y los
selectores de un dominio viven juntos. Esto evita el problema típico de
"un reducer gigante": cada slice es responsable solo de su porción del
estado y no conoce el resto del store salvo a través de
`extraReducers` (como hace `tasksSlice` al escuchar `projectDeleted`).

**Los selectores derivados viven donde tiene sentido su dependencia.**
`selectVisibleTasks` depende de `tasks` y `filters`, así que vive en
`filtersSlice.js` en vez de en `tasksSlice.js` — porque conceptualmente es
"tasks filtradas según el criterio actual", no una propiedad intrínseca de
`tasks`.

**`components/` no sabe nada de Redux.** Los componentes en esta carpeta
reciben datos por props y no hacen `useSelector`/`useDispatch`
directamente salvo excepciones justificadas (como componentes de layout
que leen el tema). La conexión con el store ocurre en componentes de
`features/` o en el nivel de página.

**`services/storage.js` es la única frontera con `localStorage`.**
Ningún slice ni componente llama a `localStorage` directamente. Esto es lo
que permite que la versión de esquema y las futuras migraciones vivan en
un solo lugar (ver `02_Data_Model.md`, decisión #3).

## Por qué no se usa `createEntityAdapter` de Redux Toolkit

Se usa el patrón `{ items, allIds }` escrito a mano en vez de
`createEntityAdapter` para que la estructura del estado sea explícita y
fácil de explicar sin dar por hecho que quien revisa el código conoce esa
utilidad concreta de Redux Toolkit. Es un patrón intercambiable: migrar a
`createEntityAdapter` no cambiaría la forma observable del estado, solo
la implementación interna del slice.

## Trade-offs conscientes

- **Sin React Router en la V1**: con solo dos vistas conceptuales
  (lista de proyectos, detalle de proyecto) manejadas como estado de UI
  simple, añadir un router es complejidad sin beneficio claro para lo que
  el certificado evalúa. Si el proyecto creciera, sería el primer
  candidato a introducir.
- **Debounce de 300ms en la persistencia**: evita escribir a
  `localStorage` en cada tecla al escribir en un formulario. Es una
  optimización deliberada, no prematura, porque el punto de guardado
  (cualquier cambio de estado) es conocido desde el diseño.
