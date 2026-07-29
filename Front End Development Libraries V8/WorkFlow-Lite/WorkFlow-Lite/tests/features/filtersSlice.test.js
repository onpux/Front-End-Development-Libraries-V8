import { describe, it, expect } from 'vitest';
import { selectVisibleTasks } from '../../src/features/filters/filtersSlice';
import { TASK_PRIORITY } from '../../src/constants/task';

function buildState({ tasks, filters }) {
  return {
    tasks: {
      items: Object.fromEntries(tasks.map((t) => [t.id, t])),
      allIds: tasks.map((t) => t.id),
    },
    filters: {
      searchTerm: '',
      status: 'all',
      priority: 'all',
      sortBy: 'createdAt',
      sortDirection: 'desc',
      ...filters,
    },
  };
}

describe('selectVisibleTasks', () => {
  const baseTasks = [
    {
      id: '1',
      projectId: 'p1',
      title: 'Configurar Vite',
      description: '',
      status: 'done',
      priority: TASK_PRIORITY.LOW,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      projectId: 'p1',
      title: 'Diseñar modelo de datos',
      description: '',
      status: 'todo',
      priority: TASK_PRIORITY.HIGH,
      createdAt: '2026-01-02T00:00:00.000Z',
    },
  ];

  it('filtra por término de búsqueda sin mutar el estado original', () => {
    const state = buildState({ tasks: baseTasks, filters: { searchTerm: 'modelo' } });
    const result = selectVisibleTasks(state);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Diseñar modelo de datos');
    // El array original de tasks no debe haberse alterado
    expect(state.tasks.allIds).toHaveLength(2);
  });

  it('filtra por prioridad', () => {
    const state = buildState({ tasks: baseTasks, filters: { priority: TASK_PRIORITY.HIGH } });
    const result = selectVisibleTasks(state);
    expect(result).toHaveLength(1);
    expect(result[0].priority).toBe(TASK_PRIORITY.HIGH);
  });

  it('ordena por prioridad ascendente', () => {
    const state = buildState({
      tasks: baseTasks,
      filters: { sortBy: 'priority', sortDirection: 'asc' },
    });
    const result = selectVisibleTasks(state);
    expect(result[0].priority).toBe(TASK_PRIORITY.LOW);
    expect(result[1].priority).toBe(TASK_PRIORITY.HIGH);
  });
});
