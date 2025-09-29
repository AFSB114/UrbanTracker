import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Play, Eye } from "lucide-react"

const steps = [
  {
    icon: Plus,
    number: "01",
    title: "Crear Ruta",
    description:
      "Los administradores crean y configuran nuevas rutas de transporte.",
  },
  {
    icon: Play,
    number: "02",
    title: "Conductor Inicia Trayecto",
    description:
      "El conductor utiliza la app móvil para iniciar el recorrido y activar el seguimiento GPS en tiempo real.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Usuarios Ven Posición",
    description: "Los pasajeros pueden ver la ubicación exacta del vehículo en el mapa.",
  },
]

export default function HowItWorks() {
  return (
  <section id="como-funciona" className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 text-balance mb-4">¿Cómo Funciona?</h2>
          <p className="text-xl text-zinc-400 text-balance max-w-2xl mx-auto">
            Proceso simple y eficiente en tres pasos para optimizar el transporte urbano
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
                <Card className="text-center h-full bg-zinc-800 border border-zinc-700 text-zinc-100 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div className="text-sm font-semibold text-accent mb-2">PASO {step.number}</div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400">{step.description}</CardDescription>
                </CardContent>
              </Card>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
