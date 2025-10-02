"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RouteFormManager from "../../components/RouteFormManager";
import { useRouteService } from "../../services/RouteServices";
import type { CompleteRouteData } from "../../types/routeTypes";

export default function NewRoutePage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/Dashboard/routes");
  };

  const { createRouteWithImages } = useRouteService();


  const handleSave = async (data: CompleteRouteData) => {
    try {
      await createRouteWithImages(data);
    } catch (err) {
      console.error('Error creando ruta', err);
      alert('Error al crear la ruta');
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <RouteFormManager
        onSave={handleSave}
        onSuccess={() => router.push("/Dashboard/routes")}
        onClose={handleClose}
        mode="create"
      />
    </div>
  );
}
