"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useRouteContext } from "../../context/RouteContext";
import RouteModal from "../../components/RouteModal";
import { RouteEditorProvider } from "../../../context/RouteEditorContext";

export default function EditRoutePage() {
  const router = useRouter();
  const params = useParams();
  const { routes } = useRouteContext();

  const routeId = parseInt(params.id as string);
  const editingRoute = routes.find((route) => route.id === routeId);

  const handleClose = () => {
    console.log("Cerrando modal");
    router.push("/Dashboard/routes");
  };

  const handleSave = async (data: unknown) => {
    console.log("Actualizar ruta:", data);
    // TODO: Implementar lógica para actualizar
    router.push("/Dashboard/routes");
  };

  if (!editingRoute) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
        <p>Ruta no encontrada</p>
      </div>
    );
  }

  return (
    <RouteEditorProvider>
      <RouteModal
        onClose={handleClose}
        onSave={handleSave}
        editingRoute={editingRoute}
      />
    </RouteEditorProvider>
  );
}
