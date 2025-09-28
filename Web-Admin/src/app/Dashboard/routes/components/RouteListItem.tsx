import { Edit3, Trash2 } from 'lucide-react';
import { RouteResponse } from '../types/routeTypes';

interface RouteListItemProps {
  route: RouteResponse;
  onEdit: (route: RouteResponse) => void;
  onDelete: (routeId: number) => void;
}

export default function RouteListItem({ route, onEdit, onDelete }: RouteListItemProps) {
  return (
    <div className="p-6 hover:bg-zinc-750 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-xl font-medium text-white">
              {route.numberRoute}
            </h3>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                route.active
                  ? "bg-green-800 text-green-200"
                  : "bg-red-800 text-red-200"
              }`}
            >
              {route.active ? "Activa" : "Inactiva"}
            </span>
          </div>

          {route.description && (
            <p className="text-zinc-400 mb-3 max-w-2xl">
              {route.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="text-zinc-500">
              <span className="font-medium text-zinc-300">
                Distancia:
              </span>{" "}
              {route.totalDistance || 0} km
            </div>
            <div className="text-zinc-500">
              <span className="font-medium text-zinc-300">
                Puntos:
              </span>{" "}
              {route.waypoints}
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-6">
          <button
            onClick={() => onEdit(route)}
            className="text-blue-400 hover:text-blue-300 px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-900 hover:bg-opacity-20 transition-colors flex items-center gap-2"
          >
            <Edit3 size={16} />
            Editar
          </button>
          <button
            onClick={() => onDelete(route.id!)}
            className="text-red-400 hover:text-red-300 px-4 py-2 text-sm font-medium rounded-md hover:bg-red-900 hover:bg-opacity-20 transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}