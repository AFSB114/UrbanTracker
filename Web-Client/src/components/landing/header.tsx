"use client"

import { useState } from "react"
import { Button } from "ui/button"
import { Menu, X } from "lucide-react"
import { DownloadAppMenu } from "components/landing/downloadAppMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lista de secciones para navegación
  const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "funciones", label: "Funciones" },
    { id: "como-funciona", label: "Cómo funciona" },
    { id: "equipo", label: "Equipo" },
    { id: "contacto", label: "Contacto" },
  ];

  // Función reutilizable para hacer scroll y cerrar menú móvil
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="/" title="Ir a la página principal">
              <img src="/Logo-completo-UrbanTracker.svg" alt="UrbanTracker Logo" className="w-auto h-12" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="text-foreground hover:text-primary transition-colors cursor-pointer hover:scale-[1.04]"
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
