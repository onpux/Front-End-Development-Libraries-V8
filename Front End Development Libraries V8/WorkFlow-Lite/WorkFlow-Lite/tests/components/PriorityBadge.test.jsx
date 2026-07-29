import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PriorityBadge from '../../src/components/PriorityBadge/PriorityBadge';
import { TASK_PRIORITY } from '../../src/constants/task';

describe('<PriorityBadge />', () => {
  it('muestra la etiqueta en español correspondiente a la prioridad', () => {
    render(<PriorityBadge priority={TASK_PRIORITY.HIGH} />);
    expect(screen.getByText('Alta')).toBeInTheDocument();
  });

  it('renderiza sin lanzar error para cada prioridad válida', () => {
    Object.values(TASK_PRIORITY).forEach((priority) => {
      const { unmount } = render(<PriorityBadge priority={priority} />);
      unmount();
    });
  });
});
