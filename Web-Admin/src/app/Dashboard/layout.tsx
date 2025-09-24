"use client"

import type React from "react"
import { Users, Route, Car, BarChart3, Menu, Building, ChevronDown, Clock, MapPin, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import "../globals.css"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface SubMenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Administrar Rutas",
    icon: Route,
    subItems: [
      {
        title: "Rutas",
        href: "/Dashboard/routes",
        icon: Route,
      },
      {
        title: "Horarios de Rutas",
        href: "/Dashboard/routeSchedule",
        icon: Clock,
      },
      {
        title: "Trayectorias de Rutas",
        href: "/Dashboard/routeTrajectory",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Administrar Vehículos",
    icon: Car,
    subItems: [
      {
        title: "Vehículos",
        href: "/Dashboard/vehicles",
        icon: Car,
      },
      {
        title: "Tipos de Vehículos",
        href: "/Dashboard/vehicleType",
        icon: Car,
      },
      {
        title: "Asignación de Vehículos",
        href: "/Dashboard/vehicleAssignments",
        icon: Car,
      },
    ],
  },
  {
    title: "Administrar Conductores",
    href: "/Dashboard/drivers",
    icon: Users,
  },
  {
    title: "Administrar Empresas",
    href: "/Dashboard/company",
    icon: Building2,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isExpanded = (title: string) => expandedItems.includes(title)

  const isActiveRoute = (href: string) => pathname === href

  const isParentActive = (subItems?: SubMenuItem[]) => {
    if (!subItems) return false
    return subItems.some(item => pathname === item.href)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 shadow-2xl">
        <div className="flex h-20 items-center px-8 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Image
              src="/white-logo.svg"
              alt="Logo UrbanTracker"
              width={280}
              height={280}
              className="mx-auto h-11 w-11"
            />
            <div>
              <h1 className="text-xl font-bold text-white">UrbanTracker</h1>
              <p className="text-sm text-zinc-400">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-6">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Principal
            </h3>
            <Link
              href="/Dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
            >
              <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Gestión
            </h3>

            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  {item.subItems ? (
                    // Menu item with submenus
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-all duration-200 hover:bg-zinc-800 hover:text-white hover:shadow-md hover:scale-105 group",
                          isParentActive(item.subItems)
                            ? "bg-zinc-800 text-white shadow-sm scale-100"
                            : "text-zinc-400"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon
                            className={cn(
                              "h-5 w-5 transition-colors group-hover:text-emerald-400",
                              isParentActive(item.subItems)
                                ? "text-emerald-400"
                                : "text-zinc-400"
                            )}
                          />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            isExpanded(item.title) ? "rotate-180" : "rotate-0",
                            isParentActive(item.subItems)
                              ? "text-white"
                              : "text-zinc-400"
                          )}
                        />
                      </button>

                      {/* Submenu */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          isExpanded(item.title)
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <ul className="mt-2 ml-4 space-y-1 relative">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-zinc-800 hover:shadow-md hover:scale-105 group",
                                  isActiveRoute(subItem.href)
                                    ? "bg-zinc-800 text-white shadow-sm scale-100"
                                    : "text-zinc-400"
                                )}
                              >
                                <subItem.icon
                                  className={cn(
                                    "h-5 w-5 transition-colors group-hover:text-emerald-400",
                                    isActiveRoute(subItem.href)
                                      ? "text-emerald-400"
                                      : "text-zinc-400"
                                  )}
                                />
                                <span className="text-sm font-medium">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    // Simple menu item
                    <Link
                      href={item.href!}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-zinc-800 hover:shadow-md hover:scale-105 group",
                        isActiveRoute(item.href!)
                          ? "bg-zinc-800 text-white shadow-sm scale-100"
                          : "text-zinc-400"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-colors group-hover:text-emerald-400",
                          isActiveRoute(item.href!)
                            ? "text-emerald-400"
                            : "text-zinc-400"
                        )}
                      />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-72">
        {/* Header */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm overflow-hidden">
          <div className="flex h-20 items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-zinc-800"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Panel de Control
                </h2>
                <p className="text-sm text-zinc-400">
                  Gestiona tu flota de transporte
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8 bg-zinc-900 min-h-[calc(100vh-5rem)] relative overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
