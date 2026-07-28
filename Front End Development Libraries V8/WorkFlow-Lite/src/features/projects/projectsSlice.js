import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';
import { nowISO } from '../../utils/dates';

const initialState = {
  items: {}, // { [id]: Project }
  allIds: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectCreated: {
      reducer(state, action) {
        const project = action.payload;
        state.items[project.id] = project;
        state.allIds.push(project.id);
      },
      prepare({ name, description = '', color = '#0d6efd' }) {
        const timestamp = nowISO();
        return {
          payload: {
            id: nanoid(),
            name,
            description,
            color,
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        };
      },
    },
    projectUpdated(state, action) {
      const { id, changes } = action.payload;
      const project = state.items[id];
      if (!project) return;
      Object.assign(project, changes, { updatedAt: nowISO() });
    },
    projectDeleted(state, action) {
      const id = action.payload;
      delete state.items[id];
      state.allIds = state.allIds.filter((existingId) => existingId !== id);
    },
  },
});

export const { projectCreated, projectUpdated, projectDeleted } = projectsSlice.actions;
export default projectsSlice.reducer;

// --- Selectores ---

const selectProjectsState = (state) => state.projects;

export const selectAllProjects = createSelector(selectProjectsState, (projectsState) =>
  projectsState.allIds.map((id) => projectsState.items[id]),
);

export const selectProjectById = (state, projectId) => state.projects.items[projectId];
