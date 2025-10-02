import React, { useState, useEffect } from "react";
import { Bus } from "lucide-react";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useVehiclePositions } from '../map/vehicle-context';
import { useRoutePoints } from '../map/route-context';

// Interface que define la estructura de una ruta de transporte público
export interface Route {
  id: number;
  name: string;
  description: string;

  start: string;
  end: string;

  imageStart: string;
  imageEnd: string;

  startDetail: string;
  endDetail: string;
}

// Interface para mensajes de telemetría de vehículos
export interface VehicleTelemetryMessage {
 vehicleId: string;
 timestamp: string;
 latitude: number;
 longitude: number;
 source: string;
}

// Componente que muestra el detalle de una ruta seleccionada
export function RoutesDetail({ route, onBack }: { route: Route; onBack: () => void }) {
  const [fullRoute, setFullRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const { setVehiclePositions } = useVehiclePositions();
  const { setOutboundPoints, setReturnPoints } = useRoutePoints();

  useEffect(() => {
    if (route.start) {
      setFullRoute(route);
      return;
    }
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/public/route/${route.id}/GEOMETRY`);
        if (!response.ok) throw new Error('Error al cargar detalle de ruta');
        const data = await response.json();
        // Asumir data.data es RouteDetailsResDto
        const detail = data.data;
        // Mapear waypoints a start/end
        const waypoints = detail.waypoints;
        const first = waypoints.find((w: any) => w.sequence === 1);
        const last = waypoints.reduce((prev: any, curr: any) => curr.sequence > prev.sequence ? curr : prev);

        // Separar puntos outbound y return
        const outboundPoints = waypoints
          .filter((w: any) => w.destine === 'OUTBOUND')
          .sort((a: any, b: any) => a.sequence - b.sequence)
          .map((w: any) => [w.longitude, w.latitude] as [number, number]);

        const returnPoints = waypoints
          .filter((w: any) => w.destine === 'RETURN')
          .sort((a: any, b: any) => a.sequence - b.sequence)
          .map((w: any) => [w.longitude, w.latitude] as [number, number]);

        // Setear puntos de ruta en el contexto
        setOutboundPoints(outboundPoints);
        setReturnPoints(returnPoints);

        setFullRoute({
          ...route,
          start: `${first.latitude}, ${first.longitude}`,
          end: `${last.latitude}, ${last.longitude}`,
          startDetail: `Inicio: ${first.latitude}, ${first.longitude}`,
          endDetail: `Fin: ${last.latitude}, ${last.longitude}`,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {0 
        setLoading(false);
      }
    };
    fetchDetail();
  }, [route]);

  useEffect(() => {
    if (!fullRoute) {
      // No limpiar los puntos para mantener las rutas visibles
      return;
    }

    // Limpiar posiciones anteriores al cambiar de ruta
    setVehiclePositions(new Map());

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws/connect'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe(`/topic/route/${route.id}/telemetry`, (message) => {
          console.log('Received telemetry:', message.body);
          setTelemetry(message.body);
          try {
            const telemetryData: VehicleTelemetryMessage = JSON.parse(message.body);
            setVehiclePositions(prev => new Map(prev.set(telemetryData.vehicleId, telemetryData)));
            setParseError(null); // Limpiar error si se parsea correctamente
          } catch (err) {
            console.error('Error parsing telemetry JSON:', err);
            setParseError('Error al parsear mensaje de telemetría: formato JSON inválido');
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
      // Limpiar posiciones al desmontar
      setVehiclePositions(new Map());
      // No limpiar rutas para mantenerlas visibles
    };
  }, [fullRoute, setVehiclePositions]);

  // Limpiar puntos de ruta al desmontar el componente (cuando se deselecciona la ruta)
  useEffect(() => {
    return () => {
      setOutboundPoints(null);
      setReturnPoints(null);
    };
  }, [setOutboundPoints, setReturnPoints]);

  if (loading) return <div className="text-zinc-100">Cargando detalle...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!fullRoute) return null;

  return (
    <div className="space-y-4 overflow-y-auto hide-scrollbar p-1">
      {/* Tarjeta resumen de la ruta */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex flex-col gap-2 shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <h4 className="text-base font-semibold leading-tight text-zinc-100">{fullRoute.name}</h4>
            <p className="text-xs text-zinc-400 leading-tight">{fullRoute.description}</p>
          </div>
          <div className="flex items-center justify-center -ml-2">
            <img src="/bus-img.png" alt="Bus" className="w-30 h-10 object-contain" />
          </div>
        </div>
        <div className="border-t border-zinc-700 my-2" />
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Imagen y datos de inicio */}
          <div className="flex flex-col items-center">
            <img src={fullRoute.imageStart} alt="Ruta inicio" className="w-24 h-24 object-contain mb-1 rounded" />
            <div className="flex items-center gap-1 mt-2">
              <span className="bg-green-500 w-3 h-3 rounded-full" />
              <span className="text-xs text-zinc-400 font-semibold">Inicia</span>
            </div>
            <span className="text-xs text-zinc-100 text-center">{fullRoute.start}</span>
          </div>
          {/* Imagen y datos de fin */}
          <div className="flex flex-col items-center">
            <img src={fullRoute.imageEnd} alt="Ruta termina" className="w-24 h-24 object-contain mb-1 rounded" />
            <div className="flex items-center gap-1 mt-2">
              <span className="bg-red-500 w-3 h-3 rounded-full" />
              <span className="text-xs text-zinc-400 font-semibold">Termina</span>
            </div>
            <span className="text-xs text-zinc-100 text-center">{fullRoute.end}</span>
          </div>
        </div>
      </div>
      {/* Tarjeta de detalles del recorrido */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 max-w-full overflow-hidden shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
        <h4 className="font-semibold text-zinc-100 mb-2">Recorrido</h4>
        <div className="border-t border-zinc-700 my-2" />
        <div className="flex flex-col gap-2">
          {/* Detalle de inicio */}
          <div className="flex gap-2 mb-1 items-start">
            <span className="bg-green-500 w-3 h-3 rounded-full flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="text-xs text-zinc-400 font-medium flex-shrink-0">Inicia:</span>
              <span className="text-xs text-zinc-100 break-words whitespace-pre-line overflow-hidden max-w-full" style={{ display: 'block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{fullRoute.startDetail}</span>
            </div>
          </div>
          {/* Detalle de fin */}
          <div className="flex gap-2 items-start">
            <span className="bg-red-500 w-3 h-3 rounded-full flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0 max-w-full">
              <span className="text-xs text-zinc-400 font-medium flex-shrink-0">Termina:</span>
              <span className="text-xs text-zinc-100 break-words whitespace-pre-line overflow-hidden max-w-full" style={{ display: 'block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{fullRoute.endDetail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
