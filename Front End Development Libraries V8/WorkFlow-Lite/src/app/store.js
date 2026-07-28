import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import filtersReducer from '../features/filters/filtersSlice';
import uiReducer from '../features/ui/uiSlice';
import { loadState, saveState } from '../services/storage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  preloadedState,
});

// Persistimos solo las "slices" de datos de dominio, no la UI efímera
// (modales abiertos, etc. no deben sobrevivir a un refresh).
let saveTimeout = null;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    saveState({
      projects: state.projects,
      tasks: state.tasks,
      filters: state.filters,
    });
  }, 300);
});
