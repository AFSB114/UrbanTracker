import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <Image
          src="/white-logo.png"
          alt="Logo UrbanTracker"
          width={256}
          height={256}
          className="mx-auto h-25 w-auto"
        />
        <h1 className="text-4xl font-bold text-foreground">
          Bienvenido a UrbanTracker
        </h1>
        <p className="text-muted-foreground">
          Accede a tu dashboard para gestionar toda la información
        </p>
        <Link href="/Dashboard">
          <Button size="lg" className="gap-2 bg-purple-50 hover:bg-purple-200">
            Ir al Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
