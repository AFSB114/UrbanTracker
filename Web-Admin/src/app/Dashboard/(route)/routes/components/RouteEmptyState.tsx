import { Plus, Route } from 'lucide-react';

interface RouteEmptyStateProps {
  onCreateRoute: () => void;
}

export default function RouteEmptyState({ onCreateRoute }: RouteEmptyStateProps) {
  return (
    <div className="p-12 text-center">
      <Route size={48} className="mx-auto text-zinc-600 mb-4" />
      <h3 className="text-lg font-medium text-zinc-400 mb-2">
        No hay rutas registradas
      </h3>
      <p className="text-zinc-500 mb-6">
        Crea tu primera ruta para comenzar
      </p>
      <button
        onClick={onCreateRoute}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto"
      >
        <Plus size={20} />
        Crear Primera Ruta
      </button>
    </div>
  );
}