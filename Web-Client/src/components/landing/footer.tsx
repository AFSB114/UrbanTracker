
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

// Animación suave personalizada para el scroll
const smoothScrollTo = (targetY: number, duration = 600) => {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    // easeInOutQuad
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -80;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    smoothScrollTo(y, 700);
  }
};

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo-full-white.svg" alt="Logo UrbanTracker" className="h-10" />
            </div>
            <p className="text-zinc-400 mb-4 max-w-md">
              Sistema de gestión y visualización de rutas de transporte público en tiempo real. Desarrollado por
              aprendices SENA comprometidos con la innovación urbana.
            </p>
            <div className="flex items-center space-x-2 text-sm text-zinc-400">
              <MapPin className="h-4 w-4" />
              <span>SENA - Centro de Tecnología, Colombia</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold mb-4 text-zinc-100">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button
                  type="button"
                  className="hover:text-zinc-100 transition-colors text-left w-full cursor-pointer"
                  onClick={() => scrollToSection("inicio")}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-zinc-100 transition-colors text-left w-full cursor-pointer"
                  onClick={() => scrollToSection("funciones")}
                >
                  Funciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-zinc-100 transition-colors text-left w-full cursor-pointer"
                  onClick={() => scrollToSection("como-funciona")}
                >
                  Cómo funciona
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-zinc-100 transition-colors text-left w-full cursor-pointer"
                  onClick={() => scrollToSection("equipo")}
                >
                  Equipo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-zinc-100 transition-colors text-left w-full cursor-pointer"
                  onClick={() => scrollToSection("privacidad")}
                >
                  Privacidad
                </button>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-semibold mb-4 text-zinc-100">Contáctanos</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/AFSB114/UrbanTracker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:urbantracker.sena@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8">
          <div className="flex justify-center items-center">
            <div className="text-sm text-primary-foreground/80 text-center">
              © 2025 UrbanTracker - Todos los derechos reservados
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}