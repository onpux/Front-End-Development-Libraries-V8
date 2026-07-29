import Header from './components/Header/Header';
import EmptyState from './components/EmptyState/EmptyState';

// Fase 2 (Arquitectura base) solo debe renderizar el layout, sin lógica
// de negocio real todavía. Ver docs/05_Definition_of_Done.md.
export default function App() {
  return (
    <div className="app-shell">
      <div className="app-main">
        <Header />
        <EmptyState
          title="Aún no hay proyectos"
          description="Crea tu primer proyecto para empezar a organizar tareas."
        />
      </div>
    </div>
  );
}
