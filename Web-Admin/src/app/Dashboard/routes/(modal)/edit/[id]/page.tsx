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

  const { createRouteWithImages } = useRouteService();


  const handleSave = async (data: CompleteRouteData) => {
    try {
      await createRouteWithImages(data);
      alert('Ruta creada correctamente');
      router.push("/Dashboard/routes");
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
        id={id}
      />
    </div>
  );
}
