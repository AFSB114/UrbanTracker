import React, { useState, useEffect } from "react";
import { Bus } from "lucide-react";
import { RoutesDetail, Route } from "./routes-detail";

// Interface para la respuesta del backend
interface RouteResDto {
  id: number;
  numberRoute: string;
  description: string;
  totalDistance: number;
  waypoints: number;
  outboundImageUrl: string;
  returnImageUrl: string;
}

// Componente principal que muestra la lista de rutas o el detalle de una ruta seleccionada
export function RoutesPanel({ showTitle = false, selected, setSelected }: { showTitle?: boolean, selected: number | null, setSelected: (routeId: number | null) => void }) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/public/route');
        if (!response.ok) throw new Error('Error al cargar rutas');
        const data = await response.json();
        // Asumir que data.data es el array de RouteResDto
        const mappedRoutes: Route[] = data.data.map((r: RouteResDto) => ({
          id: r.id,
          name: r.numberRoute,
          description: r.description,
          start: '', // Se cargará en detalle
          end: '',
          imageStart: r.outboundImageUrl,
          imageEnd: r.returnImageUrl,
          startDetail: '',
          endDetail: '',
        }));
        setRoutes(mappedRoutes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  if (loading) return <div className="text-zinc-100">Cargando rutas...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-2 py-2 p-1">
      {/* Encabezado con título y botón de volver si hay una ruta seleccionada */}
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          {selected !== null && (
            <button
              className="flex items-center gap-1 text-zinc-400 text-sm font-medium px-0.5 py-0 rounded-md border border-transparent transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-zinc-800 bg-transparent cursor-pointer hover:bg-zinc-900 hover:border-zinc-400 hover:text-zinc-100"
              onClick={() => setSelected(null)}
              title="Volver a la lista"
              type="button"
            >
              {/* Flecha para volver */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <h2 className="text-lg font-semibold text-zinc-100">
            {selected === null ? "Rutas recomendadas" : "Ruta seleccionada"}
          </h2>
        </div>
      )}

      {/* Si no hay ruta seleccionada, mostrar la lista de rutas */}
      {selected === null ? (
        <div className="space-y-3">
          {routes.map((route) => (
            // Tarjeta resumen de cada ruta
            <div
              key={route.id}
              className="bg-zinc-800 text-zinc-100 p-4 rounded-xl w-full font-sans border border-zinc-700 flex flex-col shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelected(route.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <h4 className="text-base font-semibold leading-tight text-zinc-100">{route.name}</h4>
                  <p className="text-xs text-zinc-400 leading-tight">{route.description}</p>
                </div>
                <div className="flex items-center justify-center -ml-2">
                  {/* Imagen del bus */}
                  <img src="/bus-img.png" alt="Bus" className="w-30 h-10 object-contain" />
                </div>
              </div>
              <div className="border-t border-zinc-700 my-2" />
              <div className="flex flex-col gap-1">
                {/* Línea de información de inicio */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full border border-zinc-700" />
                  <span className="text-xs text-zinc-400 font-medium">Comienza:</span>
                  <span className="text-xs text-zinc-100">{route.start || 'Cargando...'}</span>
                </div>
                {/* Línea de información de fin */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-zinc-700" />
                  <span className="text-xs text-zinc-400 font-medium">Termina:</span>
                  <span className="text-xs text-zinc-100">{route.end || 'Cargando...'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Si hay una ruta seleccionada, mostrar el detalle usando el componente importado
        <RoutesDetail route={routes.find(r => r.id === selected)!} onBack={() => setSelected(null)} />
      )}
    </div>
  );
}

