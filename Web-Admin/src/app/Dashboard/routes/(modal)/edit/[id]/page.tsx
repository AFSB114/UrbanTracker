"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useRoutes } from "../../../hooks/useRoutes";
import RouteFormManager from "../../../components/RouteFormManager";
import { useRouteService } from "../../../services/RouteServices";
import type { CompleteRouteData, RouteWithWaypointsRequest } from "../../../types/routeTypes";

export default function EditRoutePage() {
  const router = useRouter();
  const params = useParams();
  const { routes } = useRoutes();
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

    return {
      numberRoute: data.numberRoute,
      description: data.description,
      totalDistance: data.totalDistance,
      waypoints: allWaypoints,
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
