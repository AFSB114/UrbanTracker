import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { AuthGuard } from "@/components/AuthGuard"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dashboard UrbanTracker",
  description: "Sistema de gestión de transporte y logística",
  generator: "v0.app",
  icons: {
  icon: [
    { url: "/white-logo.svg", sizes: "any", type: "image/svg+xml" },
    { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
  ],
}

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full">
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}
