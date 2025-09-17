import { Button } from "@/components/ui/button"
import { MapPin, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter();
 
  return (
    <section id="inicio" className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Transformando la <span className="text-primary">Movilidad Urbana</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8">
              Sistema de gestión y visualización de rutas de transporte público en tiempo real
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => router.push("demo")}>
              <MapPin className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
            <Button size="lg" variant="outline">
              <Smartphone className="mr-2 h-5 w-5" />
              Descargar App
            </Button>
          </div>

          <div className="relative">
            <div className="bg-card rounded-lg shadow-xl p-8 border">
              <img
                src="/mapa-interactivo-de-transporte-p-blico-con-rutas-y.jpg"
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
