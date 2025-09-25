"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RouteModal from "../../components/RouteModal";
import { RouteEditorProvider } from "../../context/RouteEditorContext";
import { useRouteService } from "../../services/RouteServices";
import type { RouteWithWaypointsRequest } from "../../types/routeTypes";

export default function NewRoutePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/Dashboard/routes");
  };

  const { createRoute } = useRouteService();

  const handleSave = async (data: RouteWithWaypointsRequest) => {
    console.log("Guardar nueva ruta:", data);
    try {
      if (!data) {
        alert('Datos inválidos para guardar la ruta');
        return;
      }
      await createRoute(data);
      alert('Ruta creada correctamente');
      router.push("/Dashboard/routes");
    } catch (err) {
      console.error('Error creando ruta', err);
      alert('Error al crear la ruta');
    }
  };

  return (
    <RouteEditorProvider>
      <RouteModal onClose={handleClose} onSave={handleSave} />
    </RouteEditorProvider>
  );
}
