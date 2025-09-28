import { Plus } from 'lucide-react';

interface RouteHeaderProps {
  onCreateRoute: () => void;
}

export default function RouteHeader({ onCreateRoute }: RouteHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Gestión de Rutas</h1>
        <p className="text-zinc-400 mt-2">
          Administra las rutas de transporte
        </p>
      </div>
      <button
        onClick={onCreateRoute}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
      >
        <Plus size={20} />
        Nueva Ruta
      </button>
    </div>
  );
}