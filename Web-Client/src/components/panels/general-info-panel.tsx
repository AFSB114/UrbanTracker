
export function MessagesPanel() {
  return (
    <div className="h-full overflow-y-auto px-2 py-2">
      {/* Main title */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Información general</h2>
      </div>

      {/* Card: General */}
  <div className="bg-white text-gray-900 p-4 rounded-xl w-full font-sans border border-gray-300 flex flex-col shadow-sm mb-4 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <div className="mb-2">
          <h4 className="text-base font-semibold leading-tight text-gray-900 mb-1">General</h4>
        </div>
  <div className="border-t border-gray-300 my-2"></div>
        <div className="flex flex-row items-center justify-between gap-4 mb-3">
          <div className="text-xs text-gray-700 leading-tight flex-1">
            Somos una entidad descentralizada del Municipio de Neiva, conformada por un equipo comprometido con el uso eficiente de los recursos y el trabajo articulado con entidades públicas, transportadores y comunidad.
          </div>
          {/* Bus (image) */}
          <span className="flex-shrink-0 flex items-center justify-center ml-6" style={{ minWidth: 110 }}>
            <img src="/bus-ruta-img.png" alt="Bus institucional" className="w-28 h-20 object-cover rounded-lg" />
          </span>
        </div>
      </div>

      {/* Card: Operation Policies */}
  <div className="bg-white text-gray-900 p-4 rounded-xl w-full font-sans border border-gray-300 flex flex-col shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <div className="mb-2">
          <h4 className="text-base font-semibold leading-tight text-gray-900 mb-1">Políticas de Operación</h4>
        </div>
    <div className="border-t border-gray-300 my-2"></div>
  <div className="text-xs text-gray-700 leading-tight flex-1">
          SETP TRANSFEDERAL S.A.S. es una entidad comprometida en desarrollar el Sistema Estratégico de Transporte Público del Municipio de Neiva mediante la ejecución de los componentes operacionales, sociales, institucionales y de infraestructura, los cuales están articulados con el Plan de Desarrollo “Mandato Ciudadano Territorio de Vida y Paz” 2020 – 2023” dentro del programa “Primero Neiva con el SETP”.
          <br /><br />
          De igual forma estamos articulados con el Plan de Ordenamiento Territorial a través de su planeación, organización, socialización, evaluación y control constante de la ejecución del proyecto, cumpliendo con los principios de transparencia, economía, imparcialidad, celeridad, eficiencia, eficacia, igualdad, responsabilidad, objetividad, profesionalismo y subsidiaridad en el logro de los resultados que nos permitan cumplir a los ciudadanos mejorando su movilidad y calidad de vida.
        </div>
      </div>
    </div>
  );
}
