import { Github, Linkedin, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg"><img src="/urban-tracker-logo.jpg" alt="Logo UrbanTracker" className="w-6 h-6" /></span>
              </div>
              <span className="text-xl font-bold">UrbanTracker</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Sistema de gestión y visualización de rutas de transporte público en tiempo real. Desarrollado por
              aprendices SENA comprometidos con la innovación urbana.
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
              <MapPin className="h-4 w-4" />
              <span>SENA - Centro de Tecnología, Colombia</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#inicio" className="hover:text-primary-foreground transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#funciones" className="hover:text-primary-foreground transition-colors">
                  Funciones
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-primary-foreground transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-primary-foreground transition-colors">
                  Equipo
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2025 UrbanTracker. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-2">
              <img src="/logo-sena-colombia.jpg" alt="Logo SENA" className="w-6 h-6" />
              <span className="text-sm text-primary-foreground/80">Proyecto SENA ADSO 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
