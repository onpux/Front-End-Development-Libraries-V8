# Modelo de datos

## Entidades

### Project

```ts
Project {
  id: string            // nanoid
  name: string           // requerido, 1-60 caracteres
  description: string    // opcional, "" por defecto
  color: string           // hex, para diferenciar proyectos en UI
  createdAt: string      // ISO 8601, ver nota abajo
  updatedAt: string      // ISO 8601
}
```

### Task

```ts
Task {
  id: string            // nanoid
  projectId: string      // FK a Project.id — nunca huérfana
  title: string           // requerido, 1-120 caracteres
  description: string    // opcional, "" por defecto
  status: 'todo' | 'in-progress' | 'done'   // ver constants/task.js
  priority: 'low' | 'medium' | 'high'        // ver constants/task.js
  createdAt: string      // ISO 8601
  updatedAt: string      // ISO 8601
}
```

## Decisiones de diseño y por qué

### 1. `status` y `priority` como enums cerrados

No se usan strings libres. Ambos valores están centralizados en
`src/constants/task.js` como única fuente de verdad. Cualquier componente,
selector o test que necesite comparar contra un estado o prioridad importa
desde ahí — nunca se escribe el string literal en otro archivo.

Razón: sin TypeScript no hay chequeo en tiempo de compilación. Un typo como
`'in-progres'` en un string libre repartido por el código no lanza error,
simplemente hace que la tarea desaparezca silenciosamente de los filtros.
Centralizarlo no elimina el riesgo por completo, pero lo reduce a un solo
punto de fallo en vez de N.

### 2. Fechas como string ISO 8601, no como `Date`

`Date` no sobrevive a `JSON.stringify` / `JSON.parse` de forma directa: se
serializa a string y, al leer de `localStorage`, se recupera como string,
no como instancia de `Date`, salvo que se reconstruya explícitamente.

Decisión: guardar `createdAt` / `updatedAt` como string ISO desde el
origen (`nowISO()` en `src/utils/dates.js`), tanto en el estado Redux como
en `localStorage`. Nunca se guarda un objeto `Date` en el store. El
formateo a fecha legible ocurre solo en la capa de presentación
(`formatDate()`), nunca en el estado.

### 3. Sin campo `order` en la V1

La V1 no incluye reordenación manual ni drag & drop (ver
`00_Project_Contract.md`). El orden de las tareas se deriva siempre de
`createdAt`, `title` o `priority` a través del selector de ordenamiento.

Si en V2 se añade reordenación manual, se introduce un campo `order:
number` mediante una migración de esquema explícita (ver
`src/services/storage.js`, que ya contempla versión de esquema desde el
día 1 precisamente para este caso).

## Relación entre entidades

```
Project (1) ──── (N) Task
```

Regla de integridad: al eliminar un `Project`, todas sus `Task` asociadas
se eliminan en la misma operación (implementado como `extraReducer` en
`tasksSlice.js`, escuchando la acción `projectDeleted`). No deben existir
tareas huérfanas en ningún momento del ciclo de vida de la aplicación.
