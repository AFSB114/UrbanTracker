
export function StopInfoPanel() {
  return (
  <div className="h-full overflow-y-auto hide-scrollbar px-2 py-2 p-1">
      {/* Main title */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-zinc-100">Información sobre los paraderos</h2>
      </div>

      {/* Card: Paraderos */}
      <div className="bg-zinc-800 text-zinc-100 p-4 rounded-xl w-full font-sans border border-zinc-700 flex flex-col shadow-sm mb-4 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <div className="mb-2">
          <h4 className="text-base font-semibold leading-tight text-zinc-100 mb-1">Paraderos</h4>
          <span className="text-xs text-zinc-400 leading-tight">Total de paraderos 573</span>
        </div>
        <div className="border-t border-zinc-700 my-2"></div>
        <div className="flex flex-row items-center justify-between gap-4 mb-3">
          <div className="text-xs text-zinc-400 leading-tight flex-1">
            Los neivanos podrán identificar tres tipologías de paraderos: 500 banderas, 19 tótem y 54 M10, cada uno con secciones informativas esenciales que facilitarán la elección de rutas y paradas.
          </div>
          {/* Stop location (image) */}
          <span className="flex-shrink-0 flex items-center justify-center ml-6" style={{ minWidth: 54 }}>
            <img src="/ubicacion-img.png" alt="Icono paradero" className="w-14 h-14 object-contain" />
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <img src="/paraderos.png" alt="Paradero" className="w-40 h-24 object-cover rounded" />
          <div className="text-xs text-zinc-400 leading-tight flex-1">
            En este espacio también se podrá encontrar un código QR que direcciona a la página web, donde se podrá encontrar información completa de paraderos y rutas
          </div>
        </div>
      </div>

      {/* Card: Sus partes */}
      <div className="bg-zinc-800 text-zinc-100 p-4 rounded-xl w-full font-sans border border-zinc-700 flex flex-col shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <div className="mb-2">
          <h4 className="text-base font-semibold leading-tight text-zinc-100 mb-1">Sus partes</h4>
          <span className="text-xs text-zinc-400 leading-tight">Secciones informativas</span>
        </div>
        <div className="border-t border-zinc-700 my-2"></div>
        <div className="flex flex-row items-center justify-between gap-4 mb-3">
          <div className="text-xs text-zinc-400 leading-tight flex-1">
            Cada sección informativa te facilitará la elección de rutas y paradas.
          </div>
          {/* Parts (image) */}
          <span className="flex-shrink-0 flex items-center justify-center ml-6" style={{ minWidth: 60 }}>
            <img src="/paradero-img.png" alt="Icono partes" className="w-12 h-12 object-contain" />
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <img src="/partes-paradero-img.png" alt="Partes del paradero" className="w-full max-w-xs object-contain rounded" />
        </div>
      </div>
    </div>
  );
}
