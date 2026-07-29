import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  selectAllTasks,
  selectTasksByProjectId,
} from '../tasks/tasksSlice';
import { TASK_PRIORITY_WEIGHT } from '../../constants/task';

const initialState = {
  searchTerm: '',
  status: 'all', // 'all' | TASK_STATUS
  priority: 'all', // 'all' | TASK_PRIORITY
  sortBy: 'createdAt', // 'createdAt' | 'title' | 'priority'
  sortDirection: 'desc', // 'asc' | 'desc'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchTermChanged(state, action) {
      state.searchTerm = action.payload;
    },
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    priorityFilterChanged(state, action) {
      state.priority = action.payload;
    },
    sortChanged(state, action) {
      const { sortBy, sortDirection } = action.payload;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    filtersReset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  searchTermChanged,
  statusFilterChanged,
  priorityFilterChanged,
  sortChanged,
  filtersReset,
} = filtersSlice.actions;
export default filtersSlice.reducer;

// --- Selectores derivados ---
// IMPORTANTE: nunca mutar el array de tareas original; siempre trabajar
// sobre copias al ordenar.

const selectFiltersState = (state) => state.filters;

function applyFilters(tasks, filters) {
  const term = filters.searchTerm.trim().toLowerCase();

  let result = tasks;

  if (term) {
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term),
    );
  }

  if (filters.status !== 'all') {
    result = result.filter((task) => task.status === filters.status);
  }

  if (filters.priority !== 'all') {
    result = result.filter((task) => task.priority === filters.priority);
  }

  return result;
}

function applySort(tasks, sortBy, sortDirection) {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'priority') {
      comparison = TASK_PRIORITY_WEIGHT[a.priority] - TASK_PRIORITY_WEIGHT[b.priority];
    } else {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  return sorted;
}

// Tareas visibles a nivel global (usado, p. ej., en dashboards/estadísticas)
export const selectVisibleTasks = createSelector(
  [selectAllTasks, selectFiltersState],
  (tasks, filters) => {
    const filtered = applyFilters(tasks, filters);
    return applySort(filtered, filters.sortBy, filters.sortDirection);
  },
);

// Tareas visibles dentro de un proyecto concreto (usado en la vista de proyecto)
export const selectVisibleTasksByProject = createSelector(
  [selectTasksByProjectId, selectFiltersState],
  (tasks, filters) => {
    const filtered = applyFilters(tasks, filters);
    return applySort(filtered, filters.sortBy, filters.sortDirection);
  },
);
