"use client"

import { useState } from "react"
import { Button } from "ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lista de secciones para navegación
  const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "funciones", label: "Funciones" },
    { id: "como-funciona", label: "Cómo funciona" },
    { id: "equipo", label: "Equipo" },
    { id: "privacidad", label: "Privacidad" },
  ];

  // Animación suave personalizada para el scroll
  const smoothScrollTo = (targetY: number, duration = 700) => {
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

  // Función reutilizable para hacer scroll y cerrar menú móvil
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calcula la posición teniendo en cuenta el header fijo
      const yOffset = -80; // Ajusta según la altura de tu header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      smoothScrollTo(y, 700);
    }
    setIsMenuOpen(false);
  };

  return (
  <header className="fixed top-0 w-full bg-zinc-900 border-b border-zinc-800 text-zinc-100 z-50">
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              title="Ir a la parte superior"
              onClick={() => handleNavClick("inicio")}
              className="focus:outline-none cursor-pointer"
            >
              <img src="/logo-full-white.svg" alt="UrbanTracker Logo" className="w-auto h-12" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="text-zinc-100 hover:text-primary transition-colors cursor-pointer hover:scale-[1.04]"
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className="text-left text-foreground hover:text-primary transition-colors cursor-pointer hover:scale-[1.04]"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
