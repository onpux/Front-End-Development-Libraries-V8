import { createSlice } from '@reduxjs/toolkit';

// Estado de interfaz que NO debe persistir entre sesiones:
// modales abiertos, tema activo, sidebar colapsada, etc.
const initialState = {
  activeModal: null, // null | 'createProject' | 'editProject' | 'createTask' | 'editTask'
  activeEntityId: null, // id de la entidad que se está editando, si aplica
  theme: 'light', // 'light' | 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    modalOpened(state, action) {
      state.activeModal = action.payload.modal;
      state.activeEntityId = action.payload.entityId ?? null;
    },
    modalClosed(state) {
      state.activeModal = null;
      state.activeEntityId = null;
    },
    themeToggled(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { modalOpened, modalClosed, themeToggled } = uiSlice.actions;
export default uiSlice.reducer;
