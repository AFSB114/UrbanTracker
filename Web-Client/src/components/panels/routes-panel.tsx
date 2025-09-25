import React from "react";
import { Bus } from "lucide-react";
import { RoutesDetail, Route } from "./routes-detail";

// Datos estáticos de ejemplo para las rutas
const ROUTES: Route[] = [
  {
    name: "Ruta 999",
    description: "Antigua ruta 63",

    start: "Cr 7 con 90",
    end: "Conj. M Paula",

    imageStart: "/ruta1.png",
    imageEnd: "/ruta2.png",

    startDetail: "Carrera 7 con.",
    endDetail: "Estación Central.",
  },
];

// Componente principal que muestra la lista de rutas o el detalle de una ruta seleccionada
export function RoutesPanel({ showTitle = false, selected, setSelected }: { showTitle?: boolean, selected: number | null, setSelected: (idx: number | null) => void }) {
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
          {ROUTES.map((route, idx) => (
            // Tarjeta resumen de cada ruta
            <div
              key={route.name}
              className="bg-zinc-800 text-zinc-100 p-4 rounded-xl w-full font-sans border border-zinc-700 flex flex-col shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelected(idx)}
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
                  <span className="text-xs text-zinc-100">{route.start}</span>
                </div>
                {/* Línea de información de fin */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-zinc-700" />
                  <span className="text-xs text-zinc-400 font-medium">Termina:</span>
                  <span className="text-xs text-zinc-100">{route.end}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Si hay una ruta seleccionada, mostrar el detalle usando el componente importado
        <RoutesDetail route={ROUTES[selected]} onBack={() => setSelected(null)} />
      )}
    </div>
  );
}

