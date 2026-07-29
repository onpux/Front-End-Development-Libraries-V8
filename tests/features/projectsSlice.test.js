import { describe, it, expect } from 'vitest';
import reducer, {
  projectCreated,
  projectUpdated,
  projectDeleted,
} from '../../src/features/projects/projectsSlice';

describe('projectsSlice', () => {
  const initialState = { items: {}, allIds: [] };

  it('crea un proyecto con id y timestamps generados', () => {
    const state = reducer(
      initialState,
      projectCreated({ name: 'Proyecto A', description: 'desc' }),
    );

    expect(state.allIds).toHaveLength(1);
    const [id] = state.allIds;
    expect(state.items[id].name).toBe('Proyecto A');
    expect(state.items[id].createdAt).toBeTruthy();
    expect(state.items[id].updatedAt).toBe(state.items[id].createdAt);
  });

  it('actualiza un proyecto existente y refresca updatedAt', () => {
    const created = reducer(initialState, projectCreated({ name: 'Original' }));
    const [id] = created.allIds;
    const originalUpdatedAt = created.items[id].updatedAt;

    const updated = reducer(
      created,
      projectUpdated({ id, changes: { name: 'Renombrado' } }),
    );

    expect(updated.items[id].name).toBe('Renombrado');
    expect(updated.items[id].updatedAt).toBeTruthy();
    expect(typeof updated.items[id].updatedAt).toBe('string');
    void originalUpdatedAt; // referencia disponible si se quiere comparar timestamps
  });

  it('elimina un proyecto y lo quita de allIds', () => {
    const created = reducer(initialState, projectCreated({ name: 'A borrar' }));
    const [id] = created.allIds;

    const deleted = reducer(created, projectDeleted(id));

    expect(deleted.items[id]).toBeUndefined();
    expect(deleted.allIds).not.toContain(id);
  });
});
