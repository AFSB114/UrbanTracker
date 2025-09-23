"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RouteModal from "../../components/RouteModal";
import { RouteEditorProvider } from "../../context/RouteEditorContext";
import { useRouteService } from "../../services/RouteServices";

export default function NewRoutePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/Dashboard/routes");
  };

  const { createRouteWithWaypoints } = useRouteService();

  const handleSave = async (data: unknown) => {
    console.log("Guardar nueva ruta:", data);
    try {
      // data should be the request with waypoints
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req = (data as any).request;
      if (!req) {
        alert('Datos inválidos para guardar la ruta');
        return;
      }
      // await createRouteWithWaypoints(req);
      alert('Ruta creada correctamente');
      // router.push("/Dashboard/routes");
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
