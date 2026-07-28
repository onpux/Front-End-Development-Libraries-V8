# WorkFlow Lite

Aplicación de gestión de proyectos y tareas construida como proyecto de
portafolio para demostrar el dominio de **React, Redux Toolkit, Sass y
Bootstrap** al nivel evaluado por el certificado **Front End Development
Libraries (v8)** de FreeCodeCamp.

Este repositorio es una **especificación ejecutable**: no es solo código,
sino también el contrato de alcance, el modelo de datos, la arquitectura y
los criterios de "terminado" que guiaron su construcción. Ver la carpeta
[`docs/`](./docs) para el detalle completo.

## Por qué este proyecto existe así

La versión inicial de este proyecto intentaba demostrar simultáneamente
tres niveles distintos de competencia (certificado, profesional y senior),
lo cual diluía lo que realmente evaluaba. Se recortó deliberadamente a un
alcance verificable en 45-60 horas. El razonamiento completo y lo que se
descartó conscientemente está en [`docs/00_Project_Contract.md`](./docs/00_Project_Contract.md)
y [`docs/06_Roadmap.md`](./docs/06_Roadmap.md).

## Stack

- React 18
- Redux Toolkit + React Redux
- Sass (`@use`, sin `@import`) + Bootstrap 5 personalizado
- Vite
- Vitest + React Testing Library

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Cómo probar

```bash
npm test              # ejecuta la suite una vez
npm run test:watch    # modo watch
npm run test:coverage # con reporte de cobertura
```

## Cómo compilar

```bash
npm run build
npm run preview   # sirve el build de producción localmente
```

## Estructura del repositorio

```
WorkFlow-Lite/
├── docs/            # Contrato, scope, modelo de datos, arquitectura, DoD, roadmap
├── src/              # Código fuente (ver docs/07_Architecture.md)
├── tests/            # Tests unitarios y de componentes
└── package.json
```

## Documentación

| Documento | Contenido |
|---|---|
| [00_Project_Contract.md](./docs/00_Project_Contract.md) | Qué demuestra este proyecto y qué no |
| [01_Scope.md](./docs/01_Scope.md) | Alcance V1 congelado, con checklist |
| [02_Data_Model.md](./docs/02_Data_Model.md) | Entidades y decisiones de modelado |
| [03_Redux_Diagram.md](./docs/03_Redux_Diagram.md) | Forma del estado y flujo de acciones |
| [04_Wireframes.md](./docs/04_Wireframes.md) | Pantallas principales |
| [05_Definition_of_Done.md](./docs/05_Definition_of_Done.md) | Criterios verificables por fase |
| [06_Roadmap.md](./docs/06_Roadmap.md) | Lo que queda fuera, a propósito |
| [07_Architecture.md](./docs/07_Architecture.md) | Organización del código y trade-offs |
| [IMPLEMENTATION_CHECKLIST.md](./docs/IMPLEMENTATION_CHECKLIST.md) | Checklist de tareas para ir implementando sin desviarse |

## Estado del proyecto

Scaffold inicial completo: configuración, arquitectura de carpetas, modelo
de datos, slices de Redux (`projects`, `tasks`, `filters`, `ui`), estilos
Sass base, componentes mínimos y tests de ejemplo para cada capa
(reducer, selector, componente). A partir de aquí, seguir
`docs/IMPLEMENTATION_CHECKLIST.md` fase por fase.

## Licencia

MIT — ver [LICENSE](./LICENSE).
