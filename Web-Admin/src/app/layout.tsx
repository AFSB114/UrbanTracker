import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dashboard UrbanTracker",
  description: "Sistema de gestión de transporte y logística",
  generator: "v0.app",
  icons: {
    icon: "/white-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full">
        {children}
      </body>
    </html>
  )
}
