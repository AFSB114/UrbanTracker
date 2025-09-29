interface RouteErrorStateProps {
  error: string;
}

export default function RouteErrorState({ error }: RouteErrorStateProps) {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400 mb-4">Error al cargar rutas: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}