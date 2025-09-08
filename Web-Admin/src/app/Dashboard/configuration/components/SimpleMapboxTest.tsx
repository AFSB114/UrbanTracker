import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SimpleMapboxTest: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('Inicializando...');

  useEffect(() => {
    // Verificar token
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    console.log('Token found:', token ? 'YES' : 'NO');
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'NONE');

    if (!token) {
      setError('Token de Mapbox no encontrado. Verifica tu .env.local');
      return;
    }

    if (!mapContainer.current) {
      setError('Contenedor del mapa no encontrado');
      return;
    }

    try {
      setStatus('Configurando token...');
      mapboxgl.accessToken = token;

      setStatus('Creando mapa...');
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-74.0, 4.6], // Bogotá
        zoom: 10
      });

      map.current.on('load', () => {
        setStatus('Mapa cargado exitosamente!');
        console.log('Mapa cargado correctamente');
      });

      map.current.on('error', (e) => {
        console.error('Error del mapa:', e);
        setError(`Error del mapa: ${e.error?.message || 'Error desconocido'}`);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err : any) {
      console.error('Error creando mapa:', err);
      setError(`Error creando mapa: ${err.message}`);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Test de Mapbox</h2>
      
      {/* Status y Errores */}
      <div className="mb-4 space-y-2">
        <div className="text-blue-600">Estado: {status}</div>
        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded">
            Error: {error}
          </div>
        )}
      </div>

      {/* Información de Debug */}
      <div className="mb-4 text-sm text-gray-600">
        <div>Token configurado: {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅' : '❌'}</div>
        <div>Mapbox GL JS cargado: {typeof mapboxgl !== 'undefined' ? '✅' : '❌'}</div>
      </div>

      {/* Contenedor del Mapa */}
      <div 
        ref={mapContainer} 
        className="w-full h-96 bg-gray-200 rounded border"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default SimpleMapboxTest;