"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu, ArrowRight, ArrowUp, Linkedin, Mail, Trophy, Phone, MessageCircle,
  Users, Award, AlertTriangle, TrendingDown, Scaling, ServerCrash,
  Eye, Calculator, Zap, CheckCircle2, Target, BarChart3, Shield,
  Clock, Building2, UserCog, Database, Cpu
} from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import TextType from "@/components/TextType"
import LetterGlitch from "@/components/LetterGlitch"
import DecryptedText from "@/components/decrypted-text"

const translations = {
  en: {
    nav: { services: "Services", process: "Process", team: "Team", contact: "Contact" },
    hero: {
      title: "We don't just do AI",
      subtitle: "We build business impact",
      description: "We deliver software, AI, and automation that scale businesses",
      badges: ["Executive Diagnosis", "Feasibility Testing", "Functional Quick Wins"],
      cta: "Start scaling my business now"
    },
    warning: "When technology isn't aligned with business, growth stalls and costs skyrocket.",
    signals: {
      title: "These signs indicate it's time to act:",
      items: [
        { title: "Dependent on a single IT person", desc: "And everything slows down when they're absent." },
        { title: "High investment, low results", desc: "Technology doesn't scale with the business." },
        { title: "Processes that don't scale", desc: "Operational chaos with every new client or campaign." },
        { title: "Systems that don't talk", desc: "Multiple platforms that don't communicate with each other." },
        { title: "No visibility of what's happening", desc: "Decisions based on intuition, not data." },
        { title: "Fear of digital", desc: "Knowing something must change, but not where to start." }
      ]
    },
    services: {
      title: "What We Do",
      items: [
        { title: "Executive Diagnosis", desc: "We identify where your company leaks time, money and resources." },
        { title: "Feasibility Testing", desc: "We validate if that technology idea makes business sense." },
        { title: "Custom Development", desc: "We build internal tools that work with how you operate." },
        { title: "AI Integration", desc: "Chatbots, agents and assistants that automate repetitive tasks." },
        { title: "Process Automation", desc: "We digitize operations and eliminate manual errors." },
        { title: "Technical Enablement", desc: "We train your team to grow independently." }
      ],
      impact: "We execute what generates impact",
      impactDesc: "We don't sell generic solutions. We analyze, prioritize and build what your business actually needs."
    },
    process: {
      title: "How We Operate",
      steps: [
        { num: "01", title: "Diagnosis", desc: "Deep interview + operational mapping" },
        { num: "02", title: "Feasibility", desc: "Business case with cost, impact and time" },
        { num: "03", title: "Quick Wins", desc: "Working deliverables in less than 30 days" },
        { num: "04", title: "Continuity", desc: "Optional technical support and scaling" }
      ]
    },
    audience: {
      title: "Who Is This For?",
      items: ["Companies from $2M to $50M annual", "CEOs, GMs and Operations Directors", "Businesses without CTO or with overwhelmed technical team", "Companies with urgent tech problems and no clear path"],
      why: "Why It Works",
      whyItems: ["We don't over-promise, we execute", "We combine technology with business vision", "We integrate with your team without complicating their work", "We deliver real, measurable results"]
    },
    team: { 
      title: "Our Team",
      hector: {
        name: "Hector Gonzalez Baeza",
        role: "CEO",
        badge: "Innovation and Development",
        desc: ["Big Data Engineer at BCI", "Computer Science Engineer UdeC", "MBA UDD specialized in Innovation", "Master in Digital Transformation, La Salle Barcelona"],
        expert: "Expert in automation, Big Data, and Artificial Intelligence."
      },
      juancarlos: {
        name: "Juan Carlos Hernandez",
        role: "CMO",
        badge: "Growth and Positioning",
        desc: ["Computer Science Engineer UdeC", "Senior consultant in innovation and digital transformation"],
        expert: "Specialist in product strategy, agile development and market validation."
      },
      julio: {
        name: "Julio Zapata",
        role: "CTO",
        badge: "Finance and Regulatory Compliance",
        desc: ["Computer Science Engineer UdeC", "Full-stack developer and technical advisor on public and private projects"],
        expert: "Focus on scalability, compliance and regulatory solutions development."
      }
    },
    awards: { 
      title: "Recognitions", 
      sub: "Recognition for innovation and technological potential",
      items: [
        { title: "Demo Day UDD 2024 Finalist", desc: "Recognition for innovation and project presentation." },
        { title: "Innovative Project Incuba UDD 2025", desc: "Highlighted for our disruptive value proposition." },
        { title: "2nd Place Incuba Tec UDD", desc: "Award for the viability and technological potential of our solution." }
      ]
    },
    cta: { title: "Ready to stop guessing and start scaling with technology?", btn: "Request your executive diagnosis" },
    footer: { 
      services: "Services", 
      contact: "Contact", 
      rights: "All rights reserved.",
      company: "Company",
      team: "Team",
      recognitions: "Recognitions",
      plans: "Plans",
      tagline: "Growth powered by technology, automation and applied AI."
    },
    btn: { diagnosis: "Diagnosis", execDiag: "Executive Diagnosis" }
  },
  es: {
    nav: { services: "Servicios", process: "Proceso", team: "Equipo", contact: "Contacto" },
    hero: {
      title: "No solo hacemos IA.",
      subtitle: "Construimos impacto de negocio",
      description: "Entregamos software, IA y automatizacion que escalan negocios",
      badges: ["Diagnostico ejecutivo", "Pruebas de factibilidad", "Quick Wins funcionales"],
      cta: "Comienza a potenciar mi negocio ahora"
    },
    warning: "Cuando la tecnología no está alineada al negocio, el crecimiento se frena y los costos se disparan.",
    signals: {
      title: "Estas señales indican que es momento de actuar:",
      items: [
        { title: "Dependencia de una sola persona de TI", desc: "Y todo se frena cuando no está." },
        { title: "Inversión alta, resultados bajos", desc: "La tecnología no escala con el negocio." },
        { title: "Procesos que no escalan", desc: "Caos operativo con cada nuevo cliente o campaña." },
        { title: "Sistemas que no hablan entre sí", desc: "Múltiples plataformas sin comunicación." },
        { title: "Sin visibilidad de lo que pasa", desc: "Decisiones basadas en intuición, no en datos." },
        { title: "Miedo a lo digital", desc: "Saben que algo debe cambiar, pero no saben por dónde empezar." }
      ]
    },
    services: {
      title: "Qué Hacemos",
      items: [
        { title: "Diagnóstico Ejecutivo", desc: "Identificamos dónde tu empresa pierde tiempo, dinero y recursos." },
        { title: "Pruebas de Factibilidad", desc: "Validamos si esa idea de tecnología tiene sentido de negocio." },
        { title: "Desarrollo a Medida", desc: "Construimos herramientas internas que funcionan con tu operación." },
        { title: "Integración de IA", desc: "Chatbots, agentes y asistentes que automatizan tareas repetitivas." },
        { title: "Automatización de Procesos", desc: "Digitalizamos operaciones y eliminamos errores manuales." },
        { title: "Habilitación Técnica", desc: "Capacitamos a tu equipo para que crezca de forma autónoma." }
      ],
      impact: "Ejecutamos lo que genera impacto",
      impactDesc: "No vendemos soluciones genéricas. Analizamos, priorizamos y construimos lo que tu negocio realmente necesita."
    },
    process: {
      title: "Cómo Operamos",
      steps: [
        { num: "01", title: "Diagnóstico", desc: "Entrevista profunda + mapeo operacional" },
        { num: "02", title: "Factibilidad", desc: "Caso de negocio con costo, impacto y tiempo" },
        { num: "03", title: "Quick Wins", desc: "Entregables funcionales en menos de 30 días" },
        { num: "04", title: "Continuidad", desc: "Soporte técnico y escalamiento opcional" }
      ]
    },
    audience: {
      title: "¿Para Quién Es Esto?",
      items: ["Empresas de $2M a $50M anuales", "CEOs, Gerentes Generales y Directores de Operaciones", "Negocios sin CTO o con equipo técnico desbordado", "Empresas con problemas urgentes de tecnología y sin camino claro"],
      why: "Por Qué Funciona",
      whyItems: ["No sobre-prometemos, ejecutamos", "Combinamos tecnología con visión de negocio", "Nos integramos a tu equipo sin complicar su trabajo", "Entregamos resultados reales y medibles"]
    },
    team: { 
      title: "Nuestro Equipo",
      hector: {
        name: "Hector Gonzalez Baeza",
        role: "CEO",
        badge: "Innovacion y Desarrollo",
        desc: ["Big Data Engineer en BCI", "Ingeniero Civil Informatico UdeC", "MBA UDD especializado en Innovacion", "Master en Transformacion Digital, La Salle Barcelona"],
        expert: "Experto en automatizacion, Big Data e Inteligencia Artificial."
      },
      juancarlos: {
        name: "Juan Carlos Hernandez",
        role: "CMO",
        badge: "Crecimiento y Posicionamiento",
        desc: ["Ingeniero Civil Informatico UdeC", "Consultor senior en innovacion y transformacion digital"],
        expert: "Especialista en estrategia de producto, desarrollo agil y validacion de mercado."
      },
      julio: {
        name: "Julio Zapata",
        role: "CTO",
        badge: "Finanzas y Cumplimiento Normativo",
        desc: ["Ingeniero Civil Informatico UdeC", "Desarrollador full-stack y asesor tecnico en proyectos publicos y privados"],
        expert: "Foco en escalabilidad, cumplimiento y desarrollo de soluciones normativas."
      }
    },
    awards: { 
      title: "Reconocimientos", 
      sub: "Reconocimiento a la innovacion y potencial tecnologico",
      items: [
        { title: "Finalista Demo Day UDD 2024", desc: "Reconocimiento a la innovacion y presentacion de proyectos." },
        { title: "Proyecto Innovador Incuba UDD 2025", desc: "Destacados por nuestra propuesta de valor disruptiva." },
        { title: "2do Lugar Incuba Tec UDD", desc: "Premio a la viabilidad y potencial tecnologico de nuestra solucion." }
      ]
    },
    cta: { title: "¿Listo para dejar de adivinar y empezar a escalar con tecnología?", btn: "Solicita tu diagnóstico ejecutivo" },
    footer: { 
      services: "Servicios", 
      contact: "Contacto", 
      rights: "Todos los derechos reservados.",
      company: "Empresa",
      team: "Equipo",
      recognitions: "Reconocimientos",
      plans: "Planes",
      tagline: "Crecimiento potenciado por tecnologia, automatizacion e IA aplicada."
    },
    btn: { diagnosis: "Diagnóstico", execDiag: "Diagnóstico Ejecutivo" }
  }
}

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('es')
  const t = translations[lang]

  useEffect(() => {
    setLang('es'); // Set Spanish as the default language
  }, []);

  const [teamRef, teamInView] = useInView()
  const [recognitionsRef, recognitionsInView] = useInView()
  const [ctaRef, ctaInView] = useInView()
  const [signalsRef, signalsInView] = useInView()
  const [servicesRef, servicesInView] = useInView()
  const [processRef, processInView] = useInView()
  const [audienceRef, audienceInView] = useInView()

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800" suppressHydrationWarning>
      {/* Language Selector - Fixed under header right corner */}
      <div className="fixed top-20 right-6 z-40">
        <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-lg border border-gray-200">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('es')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'es' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            ES
          </button>
        </div>
      </div>

      {/* Header - Mobile */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-white/50 backdrop-blur-sm border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold cursor-pointer">{">/CUANTICODE_"}</span>
          </Link>
          <Link href="/onboarding">
            <Button size="sm" className="bg-gray-800 hover:bg-gray-900">{t.btn.diagnosis}</Button>
          </Link>
        </div>
      </header>

      {/* Header - Desktop only */}
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
                href="#servicios"
                onClick={(e) => handleSmoothScroll(e, "servicios")}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                {t.nav.services}
              </Link>
              <Link
                href="#proceso"
                onClick={(e) => handleSmoothScroll(e, "proceso")}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                {t.nav.process}
              </Link>
              <Link
                href="#team"
                onClick={(e) => handleSmoothScroll(e, "team")}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                {t.nav.team}
              </Link>
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                {t.nav.contact}
              </Link>
            </nav>

            <Link href="/onboarding">
              <Button className="bg-gray-800 hover:bg-gray-900">{t.btn.execDiag}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 bg-gray-800/60 backdrop-blur-md px-8 py-4 rounded-full shadow-lg">
          <button
            onClick={() => {
              const element = document.getElementById("servicios")
              if (element) element.scrollIntoView({ behavior: "smooth" })
            }}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <Zap className="h-6 w-6" />
          </button>

          <a
            href="https://wa.me/56998644974?text=Hi%20Hector%20Gonzalez%20(Project%20Manager),%20I%20want%20to%20request%20an%20executive%20diagnosis%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <Phone className="h-6 w-6" />
          </a>

          <button
            onClick={() => {
              const element = document.getElementById("team")
              if (element) element.scrollIntoView({ behavior: "smooth" })
            }}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <Users className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen">
        <div className="absolute inset-0 z-0 h-full">
          <LetterGlitch
            glitchColors={['#1f2937', '#4b5563', '#6b7280']}
            glitchSpeed={80}
            smooth={true}
            outerVignette={true}
            centerVignette={false}
          />
        </div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center w-full -mt-32">
            <div className="border-2 border-white rounded-2xl bg-slate-800/40 backdrop-blur-sm p-6 md:p-8 space-y-4 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-balance">
                {t.hero.title}
              </h2>
              <div className="flex justify-center">
                <DecryptedText
                  text={t.hero.subtitle}
                  animateOn="view"
                  revealDirection="start"
                  sequential={true}
                  speed={50}
                  maxIterations={15}
                  className="text-cyan-400"
                  encryptedClassName="text-cyan-400/50"
                  parentClassName="text-xl md:text-2xl lg:text-3xl font-semibold text-cyan-400"
                />
              </div>
              <p className="text-lg md:text-xl text-gray-200">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  {t.hero.badges[0]}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5 text-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
                  {t.hero.badges[1]}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5 text-sm">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
                  {t.hero.badges[2]}
                </Badge>
              </div>
            </div>
            <Link
              href="/onboarding"
              className="block max-w-2xl mx-auto"
            >
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex-1 text-left text-gray-400 text-base md:text-lg pl-2">
                  <TextType
                    text={t.hero.cta}
                    as="span"
                    typingSpeed={60}
                    initialDelay={1000}
                    pauseDuration={4000}
                    deletingSpeed={40}
                    loop={true}
                    showCursor={true}
                    cursorCharacter="_"
                    cursorBlinkDuration={0.5}
                    className="text-gray-400"
                  />
                </div>
                <div className="ml-3 bg-gray-900 rounded-full p-2 hover:bg-gray-800 transition-colors">
                  <ArrowUp className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
            
            {/* Country flags */}
            <div className="flex items-center justify-center gap-4 mt-16">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xtUy46aHVkhlYS0M0yBbLfATGUYf0c.png" 
                alt="Chile" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B7jqePdeDJmQdIAGI8Mr78efwYCbA0.png" 
                alt="Spain" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mj5p96Wqp1azlbmxbvKsDkXCuekzFb.png" 
                alt="Mexico" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            
            {/* Tech Logos Marquee */}
            <div className="mt-12 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden bg-white py-6">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(4)].map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-12 px-6 shrink-0">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zkZZTuNUp77XYT5wbHq6ujO3pgVtBB.png" alt="Supabase" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-djfudgY8ycbrhvMmdqhQCQO8Daomni.png" alt="AWS" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1Mn8jR7BscMPnkA6gh3Vd0EpGAnoK5.png" alt="Databricks" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XwVBnQQA2c6rqCnWtkLshfTOcBuMGM.png" alt="React" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vQZ2M8jn5Wdzy6d3WTbVeYLbf9DPLZ.png" alt="OpenAI" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MnxgNQYhfUyrsGqA4kTO8lyBJsHA5i.png" alt="Google Cloud" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ordzyq8ZfiaGWtySdFKAme3BVjyKoq.png" alt="SQL" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KrfXsW1l3ChnBL1MXEvWhQvNnjvbZl.png" alt="MongoDB" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z0zPopsPIhybh0arosmg1QLDDljTvQ.png" alt="Next.js" className="h-6 object-contain opacity-50" />
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cyiuMqi0VNWSXQEF0nH5ODJZQeuOlY.png" alt="Docker" className="h-6 object-contain opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-hero Warning Section */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance">
              {t.warning}
            </h2>
          </div>
        </div>
      </section>

      {/* Signals Section */}
      <section id="senales" className="py-16 md:py-24 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={signalsRef}
            className={`transition-all duration-700 ease-out ${signalsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t.signals.title}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                { icon: ServerCrash, color: "red" },
                { icon: TrendingDown, color: "orange" },
                { icon: Scaling, color: "amber" },
                { icon: UserCog, color: "purple" },
                { icon: Eye, color: "blue" },
                { icon: Calculator, color: "green" }
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardContent className="p-6">
                    <div className={`flex items-center justify-center h-14 w-14 rounded-full bg-${item.color}-100 mb-4`}>
                      <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{t.signals.items[index].title}</h3>
                    <p className="text-gray-600 text-sm">{t.signals.items[index].desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={servicesRef}
            className={`transition-all duration-700 ease-out ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t.services.title}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
              {[Target, CheckCircle2, Zap, Database, Cpu, BarChart3].map((Icon, index) => (
                <Card key={index} className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t.services.items[index].title}</h3>
                      <p className="text-gray-600 text-sm">{t.services.items[index].desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Impact Statement */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
                <p className="text-2xl md:text-3xl font-bold">{t.services.impact}</p>
                <p className="text-lg md:text-xl text-gray-300 mt-4">{t.services.impactDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-16 md:py-24 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={processRef}
            className={`transition-all duration-700 ease-out ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t.process.title}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {["gray-900", "gray-700", "gray-500", "gray-400"].map((color, index) => (
                <div key={index} className="relative">
                  <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border-t-4 border-${color}`}>
                    <div className={`absolute -top-4 left-6 bg-${color} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm`}>{index + 1}</div>
                    <h3 className="font-bold text-xl mb-3 mt-2">{t.process.steps[index].title}</h3>
                    <p className="text-gray-600">{t.process.steps[index].desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audience & Why Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={audienceRef}
            className={`transition-all duration-700 ease-out ${audienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* For Whom */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">{t.audience.title}</h3>
                <ul className="space-y-4">
                  {[Building2, Scaling, UserCog, BarChart3].map((Icon, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon className="h-6 w-6 text-gray-700 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{t.audience.items[index]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why It Works */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">{t.audience.why}</h3>
                <ul className="space-y-4">
                  {t.audience.whyItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={teamRef}
            className={`transition-all duration-700 ease-out ${teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t.team.title}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Card for Héctor González */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5086-FvBOHVZaQZMkdPb5OKYwvzXbdj0fct.jpg"
                      alt="Héctor González Baeza"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.team.hector.name}</h3>
                  <p className="text-blue-900 font-semibold text-lg mb-2">{t.team.hector.role}</p>
                  <Link
                    href="https://www.linkedin.com/in/héctor-nicolás-gonzález-baeza-833059177/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors mb-3"
                  >
                    LinkedIn
                  </Link>
                  <div className="bg-blue-900 text-white text-sm font-medium py-2 px-4 rounded-md mx-auto w-fit mb-3 h-10 flex items-center justify-center">
                    {t.team.hector.badge}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mt-4">
                    {t.team.hector.desc.map((line, i) => <p key={i}>{line}</p>)}
                    <p className="mt-2 font-medium">
                      {t.team.hector.expert}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HLNX0p71t1iqLlbsUP7dVxyPMkpKTr.png"
                      alt="Escudo UdeC"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rso0whi5ZyDjpB7mRIcLAahXK8EZ80.png"
                      alt="La Salle Barcelona"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OwXoWiAWAlHr96e4ZEmqv4ySdMzW4E.png"
                      alt="UDD"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QmDvvud2LefYtSp8K4WqXoHMzwNOUL.png"
                      alt="BCI"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Card for Juan Carlos Hernández */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5153-kZtt3pUZ4YFoPMDepVCetH9uy2hAUs.jpg"
                      alt="Juan Carlos Hernández"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.team.juancarlos.name}</h3>
                  <p className="text-red-600 font-semibold text-lg mb-2">{t.team.juancarlos.role}</p>
                  <Link
                    href="https://www.linkedin.com/in/juan-carlos-hernández-contreras-03764323b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors mb-3"
                  >
                    LinkedIn
                  </Link>
                  <div className="bg-[#E57373] text-white text-sm font-medium py-2 px-4 rounded-md mx-auto w-fit mb-3 h-10 flex items-center justify-center">
                    {t.team.juancarlos.badge}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mt-4">
                    {t.team.juancarlos.desc.map((line, i) => <p key={i}>{line}</p>)}
                    <p className="mt-2 font-medium">
                      {t.team.juancarlos.expert}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HLNX0p71t1iqLlbsUP7dVxyPMkpKTr.png"
                      alt="Escudo institucional"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Card for Julio Zapata */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202026-02-05%20a%20la%28s%29%202.27.41%E2%80%AFp.m.-vc3oCMHd145xIlcSlYLUkyOISefPLe.png"
                      alt="Julio Zapata"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.team.julio.name}</h3>
                  <p className="text-green-600 font-semibold text-lg mb-2">{t.team.julio.role}</p>
                  <Link
                    href="https://www.linkedin.com/in/julio-zapata-diaz-9921901b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors mb-3"
                  >
                    LinkedIn
                  </Link>
                  <div className="bg-[#2E7D32] text-white text-sm font-medium py-2 px-4 rounded-md mx-auto w-fit mb-3 h-10 flex items-center justify-center">
                    {t.team.julio.badge}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mt-4">
                    {t.team.julio.desc.map((line, i) => <p key={i}>{line}</p>)}
                    <p className="mt-2 font-medium">
                      {t.team.julio.expert}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HLNX0p71t1iqLlbsUP7dVxyPMkpKTr.png"
                      alt="Escudo institucional"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recognitions Section */}
      <section id="recognitions" className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={recognitionsRef}
            className={`transition-all duration-700 ease-out ${recognitionsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t.awards.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.awards.sub}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {t.awards.items.map((award, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mx-auto mb-4">
                      <Trophy className="h-12 w-12 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                    <p className="text-gray-600 text-sm">{award.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with LetterGlitch */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchColors={['#1f2937', '#374151', '#4b5563']}
            glitchSpeed={100}
            smooth={true}
            outerVignette={true}
            centerVignette={false}
          />
        </div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <div
            ref={ctaRef}
            className={`max-w-3xl mx-auto space-y-8 transition-all duration-700 ease-out ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white text-balance">
              {t.cta.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100 text-lg px-8 py-6">
                  {t.cta.btn}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{">/CUANTICODE_"}</span>
              </div>
              <p className="text-gray-400">
                {t.footer.tagline}
              </p>
              <div className="flex space-x-4">
                <Link href="https://cl.linkedin.com/company/cuanticode" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="mailto:cuanticodelabs@gmail.com">
                  <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                    <Mail className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.footer.services}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t.hero.badges[0]}</li>
                <li>{t.hero.badges[1]}</li>
                <li>{t.hero.badges[2]}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.footer.company}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#team"
                    onClick={(e) => handleSmoothScroll(e, "team")}
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.team}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#recognitions"
                    onClick={(e) => handleSmoothScroll(e, "recognitions")}
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.recognitions}
                  </Link>
                </li>
                <li>
                  <Link href="/planes" className="hover:text-white transition-colors">
                    {t.footer.plans}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.footer.contact}</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:cuanticodelabs@gmail.com" className="hover:text-white transition-colors">
                    cuanticodelabs@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+56998644974" className="hover:text-white transition-colors">
                    +56998644974
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <Link
                    href="https://cl.linkedin.com/company/cuanticode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Cuanticode Labs. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
