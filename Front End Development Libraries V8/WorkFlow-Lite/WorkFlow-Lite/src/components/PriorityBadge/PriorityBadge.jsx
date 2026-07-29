import { TASK_PRIORITY, TASK_PRIORITY_LABELS } from '../../constants/task';

const VARIANT_BY_PRIORITY = {
  [TASK_PRIORITY.LOW]: 'bg-secondary-subtle text-secondary-emphasis',
  [TASK_PRIORITY.MEDIUM]: 'bg-warning-subtle text-warning-emphasis',
  [TASK_PRIORITY.HIGH]: 'bg-danger-subtle text-danger-emphasis',
};

export default function PriorityBadge({ priority }) {
  const className = VARIANT_BY_PRIORITY[priority] ?? VARIANT_BY_PRIORITY[TASK_PRIORITY.LOW];
  return (
    <span className={`priority-badge ${className}`}>
      {TASK_PRIORITY_LABELS[priority]}
    </span>
  );
}
