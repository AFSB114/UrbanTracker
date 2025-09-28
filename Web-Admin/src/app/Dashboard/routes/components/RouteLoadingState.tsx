export default function RouteLoadingState() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Cargando rutas...</p>
      </div>
    </div>
  );
}