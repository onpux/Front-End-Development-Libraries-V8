import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';
import { nowISO } from '../../utils/dates';
import { TASK_STATUS } from '../../constants/task';
import { projectDeleted } from '../projects/projectsSlice';

const initialState = {
  items: {}, // { [id]: Task }
  allIds: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskCreated: {
      reducer(state, action) {
        const task = action.payload;
        state.items[task.id] = task;
        state.allIds.push(task.id);
      },
      prepare({ projectId, title, description = '', priority, status }) {
        const timestamp = nowISO();
        return {
          payload: {
            id: nanoid(),
            projectId,
            title,
            description,
            status: status ?? TASK_STATUS.TODO,
            priority,
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        };
      },
    },
    taskUpdated(state, action) {
      const { id, changes } = action.payload;
      const task = state.items[id];
      if (!task) return;
      Object.assign(task, changes, { updatedAt: nowISO() });
    },
    taskStatusChanged(state, action) {
      const { id, status } = action.payload;
      const task = state.items[id];
      if (!task) return;
      task.status = status;
      task.updatedAt = nowISO();
    },
    taskDeleted(state, action) {
      const id = action.payload;
      delete state.items[id];
      state.allIds = state.allIds.filter((existingId) => existingId !== id);
    },
  },
  extraReducers: (builder) => {
    // Regla de integridad: si se borra un proyecto, sus tareas no quedan huérfanas.
    builder.addCase(projectDeleted, (state, action) => {
      const deletedProjectId = action.payload;
      const idsToRemove = state.allIds.filter(
        (id) => state.items[id].projectId === deletedProjectId,
      );
      idsToRemove.forEach((id) => delete state.items[id]);
      state.allIds = state.allIds.filter((id) => !idsToRemove.includes(id));
    });
  },
});

export const { taskCreated, taskUpdated, taskStatusChanged, taskDeleted } =
  tasksSlice.actions;
export default tasksSlice.reducer;

// --- Selectores ---

const selectTasksState = (state) => state.tasks;

export const selectAllTasks = createSelector(selectTasksState, (tasksState) =>
  tasksState.allIds.map((id) => tasksState.items[id]),
);

export const selectTasksByProjectId = createSelector(
  [selectAllTasks, (_state, projectId) => projectId],
  (tasks, projectId) => tasks.filter((task) => task.projectId === projectId),
);
