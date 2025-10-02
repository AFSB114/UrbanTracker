"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useRoutes } from "../../../hooks/useRoutes";
import RouteFormManager from "../../../components/RouteFormManager";
import { useRouteService } from "../../../services/RouteServices";
import type { CompleteRouteData, RouteWithWaypointsRequest } from "../../../types/routeTypes";

export default function EditRoutePage() {
  const router = useRouter();
  const { id } = useParams();

  const handleClose = () => {
    router.push("/Dashboard/routes");
  };

  const { updateRoute } = useRouteService();


  const handleSave = async (data: CompleteRouteData) => {
    try {
      await updateRoute(parseInt(id as string), data);
    } catch (err) {
      console.error('Error creando ruta', err);
      alert('Error al actualizar la ruta');
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <RouteFormManager
        onSave={handleSave}
        onSuccess={() => router.push("/Dashboard/routes")}
        onClose={handleClose}
        mode="edit"
        id={id as string}
      />
    </div>
  );
}
