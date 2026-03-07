"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, Clock, Users, Target, TrendingUp, Zap, Shield, Phone, Mail, FileText, Trophy } from 'lucide-react'
import Link from "next/link"
import { ComingSoonDialog } from "@/components/coming-soon-dialog"

export default function PlanesPage() {
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header - Desktop */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center px-6 md:px-12 lg:px-16">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-xl font-bold">{">/CUANTICODE_"}</span>
            </div>
          </Link>
          <div className="ml-auto flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/#team"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Equipo
              </Link>
              <Link
                href="/#recognitions"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Reconocimientos
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Contacto
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/planes">
                <Button className="bg-gray-800 hover:bg-gray-900">Ver Planes</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Header - Mobile */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-white/50 backdrop-blur-sm border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold cursor-pointer">{">/CUANTICODE_"}</span>
          </Link>
          <Link href="/planes">
            <Button size="sm" className="bg-gray-800 hover:bg-gray-900">Ver Planes</Button>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 bg-gray-800/60 backdrop-blur-md px-8 py-4 rounded-full shadow-lg">
          <Link href="/#team">
            <button className="text-white hover:text-cyan-400 transition-colors">
              <Users className="h-6 w-6" />
            </button>
          </Link>
          
          <a
            href="https://wa.me/56998644974?text=Hola%20H%C3%A9ctor%20acabo%20de%20revisar%20la%20pagina%20de%20cuanticode%20labs%20y%20te%20quiero%20consultar%20por%20los%20Planes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <Phone className="h-6 w-6" />
          </a>
          
          <Link href="/#recognitions">
            <button className="text-white hover:text-cyan-400 transition-colors">
              <Trophy className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Diagnostic Section */}
      <section className="py-16 md:py-24 bg-white" id="diagnostic">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-2">Diagnóstico</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Diagnóstico Empresarial Integral
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evaluación completa de procesos, tecnología y oportunidades de automatización
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardContent className="space-y-6 pt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">¿Qué incluye?</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Reunión de Kickoff y análisis del contexto</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Levantamiento de requerimientos y entrevistas con clientes</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Evaluación de factibilidad técnica y análisis de riesgos</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Definición del alcance y criterios de aceptación</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Investigación del estado del arte del proyecto</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Diseño de infraestructura a alto nivel y definición del stack tecnológico</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Entregables</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Documento de levantamiento de requerimientos y entrevistas</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Mapa de procesos y arquitectura preliminar del sistema</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Informe de factibilidad técnica y análisis de riesgos (Análisis de Alternativas)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm">Criterios de aceptación y métricas de validación</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold text-lg">Metodología de Trabajo</h4>
                  <p className="text-sm text-gray-700">
                    El desarrollo se llevará a cabo bajo el marco metodológico <strong>Scrum</strong>, con sprints de dos semanas de duración.
                    Cada sprint incluirá actividades de planificación, desarrollo, revisión y retrospectiva, permitiendo un ciclo iterativo y adaptable que favorece la entrega continua de valor.
                  </p>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-base text-gray-500">Consultar precios</p>
                  <p className="text-sm text-gray-600 mt-2">Duración: 2 semanas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 py-1">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <Separator className="bg-gray-400" />
        </div>
      </div>

      {/* Transformation Plans Section */}
      <section className="py-16 md:py-24 bg-gray-50" id="transformation">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">Planes de Transformación</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Acelera tu crecimiento con soluciones personalizadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Una vez identificadas las oportunidades, implementamos soluciones que generan valor inmediato y
              sostenible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
            {/* Plan Starter */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-bold">Plan Starter</CardTitle>
                <p className="text-sm text-gray-500 mb-2">Quick Wins y Prototipos Funcionales</p>
                <p className="text-gray-600">Pensado para resultados rápidos, validaciones técnicas y experimentación controlada.</p>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-4 mt-auto">
                  <h4 className="font-semibold">Incluye:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Diagnóstico técnico y levantamiento de procesos clave</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Identificación de quick wins y oportunidades inmediatas</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Prototipos funcionales o automatizaciones acotadas</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Diseño conceptual y arquitectura preliminar</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Validación temprana con datos de prueba</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte sujeto a SLA definido</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 3 proyectos, según complejidad, capacity y plazos disponibles</span>
                    </li>
                  </ul>
                </div>
                <Separator />
                <div className="text-center space-y-3">
                  <p className="text-base text-gray-500">USD 4.000 – 12.000</p>
                  <p className="text-sm text-gray-600">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Duración estimada: 2 a 5 meses
                  </p>
                  <p className="text-xs text-gray-500">Dependiente de accesos, integraciones y disponibilidad del negocio</p>
                </div>
              </CardContent>
            </Card>

            {/* Plan Growth */}
            <Card className="border-2 border-blue-200 shadow-xl relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">Más Popular</Badge>
              </div>
              <CardHeader className="text-center pt-8">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold">Plan Growth</CardTitle>
                <p className="text-sm text-gray-500 mb-2">Automatización Productiva y Escalamiento Operativo</p>
                <p className="text-gray-600">Para organizaciones que buscan operación real, automatización estable e integración con sistemas productivos.</p>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-4 mt-auto">
                  <h4 className="font-semibold">Incluye:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Todo lo del Plan Starter</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Diseño técnico detallado y modelo de datos productivo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Automatización de procesos críticos e intermedios</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Integración con sistemas internos, servicios y datos reales</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Implementación de pipelines operativos y monitoreo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Pruebas unitarias e integrales con validación en sandbox/productivo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte sujeto a SLA</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 5 proyectos, según capacidad interna, complejidad y plazos del cliente</span>
                    </li>
                  </ul>
                </div>
                <Separator />
                <div className="text-center space-y-3">
                  <p className="text-base text-gray-500">USD 6.000 – 30.000</p>
                  <p className="text-sm text-gray-600">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Proyectos trimestrales o anuales
                  </p>
                  <p className="text-xs text-gray-500">Según profundidad y nivel de integración requerido</p>
                </div>
              </CardContent>
            </Card>

            {/* Plan Enterprise */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold">Plan Enterprise</CardTitle>
                <p className="text-sm text-gray-500 mb-2">Transformación Organizacional con IA Avanzada</p>
                <p className="text-gray-600">Dirigido a grandes empresas con procesos críticos, datos sensibles y necesidad de transformación profunda.</p>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-4 mt-auto">
                  <h4 className="font-semibold">Incluye:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Intervención transversal en múltiples áreas de la cadena de valor</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Metodologías modernas: automatización, data-driven, DevOps, MLOps y gobierno de datos</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Agentes de IA, IA generativa y modelos predictivos avanzados</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Integración con sistemas core y arquitecturas corporativas escalables</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Revisión de seguridad, compliance, continuidad y marcos normativos</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Roadmap estratégico para industrialización y adopción de IA</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Documentación, capacitación y acompañamiento ejecutivo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Soporte sujeto a SLA corporativo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">Hasta 10 proyectos, según complejidad, criticidad y profundidad de transformación requerida</span>
                    </li>
                  </ul>
                </div>
                <Separator />
                <div className="text-center space-y-3">
                  <p className="text-base text-gray-500">Precio según alcance</p>
                  <p className="text-sm text-gray-600">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Duración personalizada
                  </p>
                  <p className="text-xs text-gray-500">Según complejidad, criticidad y profundidad de transformación</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-gray-800 to-gray-900" id="contact">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              ¿Listo para comenzar tu transformación?
            </h2>
            <p className="text-xl text-gray-100">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a optimizar tus procesos y acelerar tu
              crecimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:cuanticodelabs@gmail.com?subject=Consulta%20Gratuita&body=Hola,%20me%20gustaría%20agendar%20una%20consulta%20gratuita%20para%20conocer%20más%20sobre%20sus%20servicios%20de%20transformación%20digital."
                className="inline-block"
              >
                <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100 w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  Consulta Gratuita
                </Button>
              </a>
              <a
                href="https://wa.me/56998644974?text=Hola%20H%C3%A9ctor%20acabo%20de%20revisar%20la%20pagina%20de%20cuanticode%20labs%20y%20te%20quiero%20consultar%20por%20los%20Planes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-800 bg-transparent w-full sm:w-auto"
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-gray-300">
              <Users className="inline h-4 w-4 mr-1" />
              Más de 50 empresas confían en nosotros • Resultados garantizados
            </p>
          </div>
        </div>
      </section>

      <ComingSoonDialog isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  )
}
