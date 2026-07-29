import { describe, it, expect } from 'vitest';
import tasksReducer, { taskCreated } from '../../src/features/tasks/tasksSlice';
import projectsReducer, {
  projectCreated,
  projectDeleted,
} from '../../src/features/projects/projectsSlice';
import { TASK_PRIORITY } from '../../src/constants/task';

describe('tasksSlice', () => {
  it('crea una tarea asociada a un proyecto con status por defecto "todo"', () => {
    const state = tasksReducer(
      { items: {}, allIds: [] },
      taskCreated({ projectId: 'p1', title: 'Tarea 1', priority: TASK_PRIORITY.MEDIUM }),
    );
    const [id] = state.allIds;
    expect(state.items[id].status).toBe('todo');
    expect(state.items[id].projectId).toBe('p1');
  });

  it('elimina las tareas huérfanas cuando se borra su proyecto (extraReducer)', () => {
    // Simula el flujo real: crear proyecto, crear tarea, borrar proyecto.
    let projectsState = projectsReducer(undefined, projectCreated({ name: 'P1' }));
    const [projectId] = projectsState.allIds;

    let tasksState = tasksReducer(
      { items: {}, allIds: [] },
      taskCreated({ projectId, title: 'Tarea huérfana', priority: TASK_PRIORITY.LOW }),
    );
    expect(tasksState.allIds).toHaveLength(1);

    const deleteAction = projectDeleted(projectId);
    projectsState = projectsReducer(projectsState, deleteAction);
    tasksState = tasksReducer(tasksState, deleteAction);

    expect(tasksState.allIds).toHaveLength(0);
  });
});
