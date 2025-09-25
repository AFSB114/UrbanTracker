"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RouteFormManager from "../../components/RouteFormManager";
import { useRouteService } from "../../services/RouteServices";
import type { CompleteRouteData, RouteWithWaypointsRequest } from "../../types/routeTypes";

export default function NewRoutePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/Dashboard/routes");
  };

  const { createRoute } = useRouteService();

  const convertToRouteWithWaypointsRequest = (data: CompleteRouteData): RouteWithWaypointsRequest => {
    const allWaypoints = [
      ...data.outboundRoute.waypoints.map(wp => ({ ...wp, destine: "OUTBOUND" as const })),
      ...data.returnRoute.waypoints.map(wp => ({ ...wp, destine: "RETURN" as const })),
    ];

    // Calculate total distance from all waypoints
    const calculateDistance = (waypoints: typeof allWaypoints): number => {
      if (waypoints.length < 2) return 0;
      let total = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        const wp1 = waypoints[i];
        const wp2 = waypoints[i + 1];
        const R = 6371; // Earth's radius in km
        const dLat = (wp2.latitude - wp1.latitude) * Math.PI / 180;
        const dLon = (wp2.longitude - wp1.longitude) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(wp1.latitude * Math.PI / 180) * Math.cos(wp2.latitude * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        total += R * c;
      }
      return Math.round(total * 100) / 100;
    };

    return {
      numberRoute: data.numberRoute,
      description: data.description,
      totalDistance: calculateDistance(allWaypoints),
      waypoints: allWaypoints,
      active: true,
    };
  };

  const handleSave = async (data: CompleteRouteData) => {
    console.log("Guardar nueva ruta:", data);
    try {
      const routeData = convertToRouteWithWaypointsRequest(data);
      console.log("Datos convertidos para la API:", routeData);
      await createRoute(routeData);
      // alert('Ruta creada correctamente');
      // router.push("/Dashboard/routes");
    } catch (err) {
      console.error('Error creando ruta', err);
      alert('Error al crear la ruta');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <RouteFormManager
        onSave={handleSave}
        mode="create"
      />
    </div>
  );
}
