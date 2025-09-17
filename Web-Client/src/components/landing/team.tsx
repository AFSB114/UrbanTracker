import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "ui/avatar"

const teamMembers = [
  {
    name: "Brayan Estiven Carvajal Padilla",
    role: "Desarrollador Full Stack",
    initials: "BC",
    image: "/public/foto-profesional-desarrollador-joven.jpg",
  },
  {
    name: "Andres Felipe Suaza Bustos",
    role: "Desarrollador Frontend",
    initials: "AS",
    image: "/public/foto-profesional-desarrollador-joven.jpg",
  },
  {
    name: "Diego Fernando Cuellar Hernandez",
    role: "Desarrollador Backend",
    initials: "DC",
    image: "/public/foto-profesional-desarrollador-joven.jpg",
  },
  {
    name: "Carlos Javier Rodriguez Manchola",
    role: "Analista de Sistemas",
    initials: "CR",
    image: "/foto-profesional-desarrollador-joven.jpg",
  },
]

export default function Team() {
  return (
    <section id="equipo" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Nuestro Equipo</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Aprendices del Tecnólogo en ADSO del SENA comprometidos con la innovación en transporte público
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-medium text-accent">{member.role}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
            <img src="/logo-sena-colombia.jpg" alt="Logo SENA" className="w-8 h-8" />
            <span className="text-sm font-medium text-muted-foreground">
              Tecnólogo en Análisis y Desarrollo de Software - SENA
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
