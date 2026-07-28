export default function EmptyState({ title, description }) {
  return (
    <div className="text-center py-5 text-secondary">
      <p className="fw-semibold mb-1">{title}</p>
      {description && <p className="small mb-0">{description}</p>}
    </div>
  );
}
