import { Button } from "@/components/ui/button"
import { MapPin, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter();

  return (
  <section id="inicio" className="pt-32 pb-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 text-balance mb-6">
              Transformando la <span className="text-primary">Movilidad Urbana</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 text-balance mb-8">
              Sistema de gestión y visualización de rutas de transporte urbano en tiempo real
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-zinc-800 text-zinc-100 font-semibold rounded-xl border border-zinc-700 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-primary/60"
              onClick={() => router.push("demo")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
            <Button
              size="lg"
              className="bg-zinc-800 text-zinc-100 font-semibold rounded-xl border border-zinc-700 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-primary/60"
              onClick={() => window.open('movil/user', '_blank')}
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Descargar App Conductor
            </Button>
          </div>

          <div className="relative">
            <div className="bg-zinc-800 rounded-lg shadow-xl p-8 border border-zinc-700">
              <img
                src="/mapa-img.png"
                alt="Vista previa del mapa interactivo de UrbanTracker"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
