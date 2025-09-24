import React from "react";
import { Bus } from "lucide-react";

// Interface que define la estructura de una ruta de transporte público
export interface Route {
  name: string;            // Nombre de la ruta
  description: string;     // Descripción breve
  start: string;           // Punto de inicio
  end: string;             // Punto final
  startDetail: string;     // Detalle del inicio
  endDetail: string;       // Detalle del final
  imageStart: string;      // Imagen del inicio
  imageEnd: string;        // Imagen del final
  referenceImage: string;  // Imagen de referencia del trayecto
}

// Componente que muestra el detalle de una ruta seleccionada
export function RoutesDetail({ route, onBack }: { route: Route; onBack: () => void }) {
  return (
    <div className="space-y-4">
      {/* Tarjeta resumen de la ruta */}
  <div className="bg-white border border-gray-300 rounded-xl p-4 flex flex-col gap-2 shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <h4 className="text-base font-semibold leading-tight text-gray-900">{route.name}</h4>
            <p className="text-xs text-gray-600 leading-tight">{route.description}</p>
          </div>
          <div className="flex items-center justify-center -ml-2">
            <img src="/bus-img.png" alt="Bus" className="w-30 h-10 object-contain" />
          </div>
        </div>
  <div className="border-t border-gray-300 my-2" />
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Imagen y datos de inicio */}
          <div className="flex flex-col items-center">
            <img src={route.imageStart} alt="Ruta inicio" className="w-24 h-24 object-contain mb-1 border border-gray-200 rounded" />
            <div className="flex items-center gap-1 mt-2">
              <span className="bg-green-500 w-3 h-3 rounded-full" />
              <span className="text-xs text-gray-700 font-semibold">Inicia</span>
            </div>
            <span className="text-xs text-gray-800 text-center">{route.start}</span>
          </div>
          {/* Imagen y datos de fin */}
          <div className="flex flex-col items-center">
            <img src={route.imageEnd} alt="Ruta termina" className="w-24 h-24 object-contain mb-1 border border-gray-200 rounded" />
            <div className="flex items-center gap-1 mt-2">
              <span className="bg-red-500 w-3 h-3 rounded-full" />
              <span className="text-xs text-gray-700 font-semibold">Termina</span>
            </div>
            <span className="text-xs text-gray-800 text-center">{route.end}</span>
          </div>
        </div>
      </div>
      {/* Tarjeta de detalles del recorrido */}
  <div className="bg-white border border-gray-300 rounded-xl p-4 max-w-full overflow-hidden shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <h4 className="font-semibold text-gray-900 mb-2">Recorrido</h4>
  <div className="border-t border-gray-300 my-2" />
        <div className="flex flex-col gap-2">
          {/* Detalle de inicio */}
          <div className="flex gap-2 mb-1 items-start">
            <span className="bg-green-500 w-3 h-3 rounded-full flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="text-xs text-gray-700 font-medium flex-shrink-0">Inicia:</span>
              <span className="text-xs text-gray-800 break-words whitespace-pre-line overflow-hidden max-w-full" style={{ display: 'block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{route.startDetail}</span>
            </div>
          </div>
          {/* Detalle de fin */}
          <div className="flex gap-2 items-start">
            <span className="bg-red-500 w-3 h-3 rounded-full flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="text-xs text-gray-700 font-medium flex-shrink-0">Termina:</span>
              <span className="text-xs text-gray-800 break-words whitespace-pre-line overflow-hidden max-w-full" style={{ display: 'block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{route.endDetail}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tarjeta de referencia visual del trayecto */}
  <div className="bg-white border border-gray-300 rounded-xl p-4 flex flex-col gap-2 mt-4 shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <h4 className="font-semibold text-gray-900 mb-2">Referencia del trayecto</h4>
  <div className="border-t border-gray-300 my-2" />
        <div className="flex justify-center items-center">
          <img
            src={route.referenceImage}
            alt="Referencia del trayecto"
            className="w-80 h-60 object-contain rounded border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
