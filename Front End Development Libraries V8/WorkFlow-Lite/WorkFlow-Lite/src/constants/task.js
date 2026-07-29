// Fuente única de verdad para los valores permitidos de una Task.
// No usar strings "mágicos" en ningún otro archivo: importar siempre desde aquí.

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const TASK_STATUS_LIST = Object.values(TASK_STATUS);

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'Por hacer',
  [TASK_STATUS.IN_PROGRESS]: 'En progreso',
  [TASK_STATUS.DONE]: 'Hecho',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TASK_PRIORITY_LIST = Object.values(TASK_PRIORITY);

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Baja',
  [TASK_PRIORITY.MEDIUM]: 'Media',
  [TASK_PRIORITY.HIGH]: 'Alta',
};

// Orden de prioridad para sorting (mayor número = más urgente)
export const TASK_PRIORITY_WEIGHT = {
  [TASK_PRIORITY.LOW]: 1,
  [TASK_PRIORITY.MEDIUM]: 2,
  [TASK_PRIORITY.HIGH]: 3,
};
