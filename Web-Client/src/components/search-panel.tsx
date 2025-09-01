"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bus, Circle } from "lucide-react"

export function SearchPanel() {
  return (
    <div className="w-80 bg-gray-800 p-4 flex flex-col">
      {/* Search Bar */}
      <div className="mb-6">
        <Input placeholder="Buscar..." className="bg-black border-gray-600 text-white placeholder:text-gray-400" />
      </div>

      {/* Routes Section */}
      <div>
        <h2 className="text-white text-lg font-medium mb-4">Rutas recomendadas</h2>

        <Card className="bg-gray-700 border-gray-600 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Ruta 999</h3>
            <Bus className="w-8 h-8 text-gray-300" />
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Circle className="w-4 h-4 text-green-500 mt-1 fill-current" />
              <div>
                <div className="text-white font-medium">Ida</div>
                <div className="text-gray-300 text-sm">
                  Inicia el recorrido en la carrera 7 con 30
                  <br />
                  Vía Avenida Galindo
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Circle className="w-4 h-4 text-green-500 mt-1 fill-current" />
              <div>
                <div className="text-white font-medium">Vuelta</div>
                <div className="text-gray-300 text-sm">
                  Termina en el Portal
                  <br />
                  999 Conj. María Paula
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
