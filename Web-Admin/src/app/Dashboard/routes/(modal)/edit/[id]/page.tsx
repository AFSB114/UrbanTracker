"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useRouteContext } from "../../../context/RouteContext";
import RouteFormManager from "../../../components/RouteFormManager";
import { useRouteService } from "../../../services/RouteServices";
import type { CompleteRouteData, RouteWithWaypointsRequest } from "../../../types/routeTypes";

export default function EditRoutePage() {
  const router = useRouter();
  const params = useParams();
  const { routes } = useRouteContext();
  const { createRouteWithWaypoints } = useRouteService();

  const routeId = parseInt(params.id as string);
  const editingRoute = routes.find((route) => route.id === routeId);

  const handleClose = () => {
    console.log("Cerrando modal");
    router.push("/Dashboard/routes");
  };

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
    console.log("Actualizar ruta:", data);
    try {
      const routeData = convertToRouteWithWaypointsRequest(data);
      // TODO: Implement update logic instead of create
      await createRouteWithWaypoints(routeData);
      alert('Ruta actualizada correctamente');
      router.push("/Dashboard/routes");
    } catch (err) {
      console.error('Error actualizando ruta', err);
      alert('Error al actualizar la ruta');
    }
  };

  if (!editingRoute) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
        <p>Ruta no encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <RouteFormManager
        onSave={handleSave}
        editingRoute={editingRoute}
        mode="edit"
      />
    </div>
  );
}
