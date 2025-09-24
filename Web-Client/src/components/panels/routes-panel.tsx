import { Bus } from "lucide-react"
import { useState } from "react"

interface RoutesPanelProps {
  showTitle?: boolean;
}

export function RoutesPanel({ showTitle = false }: RoutesPanelProps) {
  const routes = [
    {
      name: "Ruta 999",
      description: "Antigua ruta 63",
      start: "Cr 7 con 90",
      end: "Conj. M Paula",
      startDetail: "Carrera 7 con . 90GHFGHGHFGHFGHGH",
      endDetail: "Estación Central. 9HFGHGH",
      imageStart: "/ruta1.png",
      imageEnd: "/ruta2.png",
    },
    {
      name: "Ruta 101",
      description: "Centro - Universidad",
      start: "Cra 10 con 20",
      end: "Est. Central",
      startDetail: "Cra 10 con 20",
      endDetail: "Estación Central. 90GHFGHGHFGHFGHGHFGHFGHH",
      imageStart: "/ruta1.png",
      imageEnd: "/ruta2.png",
    },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="h-full overflow-y-auto px-2 py-2">
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          {selected !== null && (
            <button
              className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm font-medium px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-blue-200 bg-transparent border-none"
              onClick={() => setSelected(null)}
              title="Volver a la lista"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <h2 className="text-lg font-semibold text-gray-900">
            {selected === null ? "Rutas recomendadas" : "Ruta seleccionada"}
          </h2>
        </div>
      )}
      {selected === null ? (
        <div className="space-y-3">
          {routes.map((route, idx) => (
            <div
              key={idx}
              className="bg-white text-gray-900 p-4 rounded-lg w-full font-sans border border-gray-200 flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelected(idx)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Bus className="w-8 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold leading-tight text-gray-900">{route.name}</h4>
                  <p className="text-xs text-gray-600 leading-tight">{route.description}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full border border-gray-200"></div>
                  <span className="text-xs text-gray-700 font-medium">Comienza:</span>
                  <span className="text-xs text-gray-800">{route.start}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-gray-200"></div>
                  <span className="text-xs text-gray-700 font-medium">Termina:</span>
                  <span className="text-xs text-gray-800">{route.end}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Back button is now in the title bar if showTitle is true */}
          <div className="bg-white border border-gray-300 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Bus className="w-8 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="text-base font-semibold leading-tight text-gray-900">{routes[selected].name}</h4>
                <p className="text-xs text-gray-600 leading-tight">{routes[selected].description}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex flex-col items-center">
                <img src={routes[selected].imageStart} alt="Ruta inicio" className="w-24 h-24 object-contain mb-1 border border-gray-200 rounded" />
                <div className="flex items-center gap-1 mt-2">
                  <span className="bg-green-500 w-3 h-3 rounded-full"></span>
                  <span className="text-xs text-gray-700 font-semibold">Inicia</span>
                </div>
                <span className="text-xs text-gray-800 text-center">{routes[selected].start}</span>
              </div>
              <div className="flex flex-col items-center">
                <img src={routes[selected].imageEnd} alt="Ruta termina" className="w-24 h-24 object-contain mb-1 border border-gray-200 rounded" />
                <div className="flex items-center gap-1 mt-2">
                  <span className="bg-red-500 w-3 h-3 rounded-full"></span>
                  <span className="text-xs text-gray-700 font-semibold">Termina</span>
                </div>
                <span className="text-xs text-gray-800 text-center">{routes[selected].end}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-300 rounded-xl p-4 max-w-full overflow-hidden">
            <h4 className="font-semibold text-gray-900 mb-2">Recorrido</h4>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 mb-1 items-start">
                <span className="bg-green-500 w-3 h-3 rounded-full flex-shrink-0 mt-1"></span>
                <div className="flex flex-col min-w-0 max-w-full">
                  <span className="text-xs text-gray-700 font-medium flex-shrink-0">Inicia:</span>
                  <span className="text-xs text-gray-800 break-words whitespace-pre-line overflow-hidden max-w-full" style={{ display: 'block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{routes[selected].startDetail}</span>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="bg-red-500 w-3 h-3 rounded-full flex-shrink-0 mt-1"></span>
                <div className="flex flex-col min-w-0 max-w-full">
                  <span className="text-xs text-gray-700 font-medium flex-shrink-0">Termina:</span>
                  <span className="text-xs text-gray-800 break-words whitespace-pre-line overflow-hidden max-w-full" style={{ display: 'block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{routes[selected].endDetail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
