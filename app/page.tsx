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
      title: "El upgrade que tu negocio necesita",
      subtitle: "Especialistas en tecnología, automatización e IA aplicada",
      description: "Conoce a nuestro Equipo de alto rendimiento",
      badges: ["Diagnostico", "Factibilidad", "Desarrollo Quick Wins funcionales"],
      cta: "Solicita presupuesto ahora"
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
        { title: "Diagnóstico ", desc: "Identificamos dónde tu empresa pierde tiempo, dinero y recursos." },
        { title: "Factibilidad", desc: "Validamos si esa idea de tecnología tiene sentido de negocio." },
        { title: "Desarrollo", desc: "Construimos herramientas internas que funcionan con tu operación." },
        { title: "Integración", desc: "Integramos el Software a tu stack tecnológico" },
        { title: "Paso a Producción", desc: "Desplegamos procesos certificados y validados" },
        { title: "Continuidad Analítica", desc: "No te compliques, si lo deseas nos quedamos manteniendo el Workflow" }
      ],
      impact: "Ejecutamos lo que genera impacto",
      impactDesc: "Agilidad, Mejora continua y Compromiso"
    },
    process: {
      title: "Metodología de Trabajo",
      steps: [
        { num: "01", title: "Diagnóstico", desc: "Entrevista profunda + mapeo operacional" },
        { num: "02", title: "Factibilidad", desc: "Caso de negocio con costo, impacto y tiempo" },
        { num: "03", title: "Quick Wins", desc: "Entregables funcionales en menos de 30 días" },
        { num: "04", title: "Continuidad", desc: "Soporte técnico y escalamiento opcional" }
      ]
    },
    audience: {
      title: "¿Para Quién Es Esto?",
      items: ["Empresas medianas y grandes", "CEOs, Gerentes Generales y Directores de Operaciones", "Negocios sin CTO o con equipo técnico desbordado", "Empresas con problemas urgentes de tecnología y sin camino claro"],
      why: "Por Qué Funciona",
      whyItems: ["Metodología Ágil", "Fuerte visión de negocio", "Nos integramos a tu equipo sin complicar su trabajo", "Entregamos resultados reales y medibles"]
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
    cta: { title: "¿Listo para comenzar?", btn: "Solicita tu diagnóstico ejecutivo" },
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
    <div className="min-h-screen bg-[#0a1f38] text-gray-100" suppressHydrationWarning>


      {/* Header - Mobile */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-[#0a1f38]/95 backdrop-blur-sm border-b border-teal-900">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl font-bold cursor-pointer text-teal-400">{">/CUANTICODE_"}</span>
          </Link>
          <div className="flex items-center gap-1 bg-[#042f2e] rounded-full p-1 border border-teal-800">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-teal-900'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'es' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-teal-900'}`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      {/* Header - Desktop only */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-teal-900 bg-[#0a1f38]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a1f38]/90">
        <div className="w-full max-w-[1400px] mx-auto flex h-16 items-center px-6 md:px-12 lg:px-16">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-xl font-bold text-teal-400">{">/CUANTICODE_"}</span>
            </div>
          </Link>
          <div className="ml-auto flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#servicios"
                onClick={(e) => handleSmoothScroll(e, "servicios")}
                className="text-sm font-medium text-gray-200 hover:text-teal-400 transition-colors"
              >
                {t.nav.services}
              </Link>
              <Link
                href="#team"
                onClick={(e) => handleSmoothScroll(e, "team")}
                className="text-sm font-medium text-gray-200 hover:text-teal-400 transition-colors"
              >
                {t.nav.team}
              </Link>
              <Link
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="text-sm font-medium text-gray-200 hover:text-teal-400 transition-colors"
              >
                {t.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center gap-1 bg-[#042f2e] rounded-full p-1 border border-teal-800">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-teal-900'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'es' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-teal-900'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <a
        href="https://wa.me/56998644974?text=Hi%20Hector%20Gonzalez%20(Project%20Manager),%20I%20want%20to%20request%20an%20executive%20diagnosis%20for%20my%20business"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-teal-400 shadow-lg shadow-teal-500/40 hover:bg-teal-300 active:scale-95 transition-all duration-200"
      >
        <Phone className="h-6 w-6 text-[#0a1f38]" />
      </a>

      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen pt-20 md:pt-0">
        <div className="absolute inset-0 z-0 h-full">
          <LetterGlitch
            glitchColors={['#042f2e', '#0a1f38', '#2dd4bf']}
            glitchSpeed={80}
            smooth={true}
            outerVignette={true}
            centerVignette={false}
          />
        </div>
        <div className="absolute inset-0 z-[1] h-full bg-[#0a1f38]/60" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center w-full md:-mt-32">
            <div className="border-2 border-teal-500 rounded-2xl bg-[#042f2e]/60 backdrop-blur-sm p-6 md:p-8 space-y-4 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-balance">
                {t.hero.title}
              </h2>
              <div className="flex justify-center">
                <DecryptedText
                  key={lang}
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
              <div className="flex items-center bg-[#0a1f38] border border-teal-800 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex-1 text-left text-gray-300 text-base md:text-lg pl-2">
                  <TextType
                    key={lang}
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
                <div className="ml-3 bg-teal-500 rounded-full p-2 hover:bg-teal-400 transition-colors">
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
      <section className="py-16 md:py-20 bg-[#042f2e] text-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <AlertTriangle className="h-16 w-16 text-teal-400 mx-auto" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance">
              {t.warning}
            </h2>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 md:py-24 bg-[#0a1f38]">
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

            {/* Roadmap grid */}
            <div className="max-w-6xl mx-auto mb-12">
              {/* Desktop: simple 3-col grid, no connector lines */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[Target, CheckCircle2, Zap, Database, Cpu, BarChart3].map((Icon, index) => (
                  <div key={index} className={`border ${index < 3 ? 'border-teal-900 hover:border-teal-500' : 'border-emerald-900 hover:border-emerald-500'} bg-[#0d2a4a] rounded-xl p-5 transition-all duration-300 hover:-translate-y-1`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex items-center justify-center h-7 w-7 rounded-full ${index < 3 ? 'bg-teal-500' : 'bg-emerald-500'} text-white font-bold text-xs flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <div className={`flex items-center justify-center h-9 w-9 rounded-lg ${index < 3 ? 'bg-teal-500/15' : 'bg-emerald-500/15'}`}>
                        <Icon className={`h-5 w-5 ${index < 3 ? 'text-teal-400' : 'text-emerald-400'}`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-base mb-1 text-gray-100">{t.services.items[index].title}</h3>
                    <p className="text-gray-400 text-sm">{t.services.items[index].desc}</p>
                  </div>
                ))}
              </div>

              {/* Mobile: vertical timeline, line centered on the circle height */}
              <div className="md:hidden flex flex-col">
                {[Target, CheckCircle2, Zap, Database, Cpu, BarChart3].map((Icon, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center w-8 flex-shrink-0">
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${index < 3 ? 'bg-teal-500' : 'bg-emerald-500'} text-white font-bold text-sm z-10`}>
                        {index + 1}
                      </div>
                      {index < 5 && (
                        <div className="flex-1 w-0 border-l-2 border-dashed border-teal-600/50 my-1" />
                      )}
                    </div>
                    {/* Card */}
                    <div className="flex-1 pb-5">
                      <div className={`border ${index < 3 ? 'border-teal-900' : 'border-emerald-900'} bg-[#0d2a4a] rounded-xl p-4`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`flex items-center justify-center h-8 w-8 rounded-lg ${index < 3 ? 'bg-teal-500/15' : 'bg-emerald-500/15'} flex-shrink-0`}>
                            <Icon className={`h-4 w-4 ${index < 3 ? 'text-teal-400' : 'text-emerald-400'}`} />
                          </div>
                          <h3 className="font-semibold text-base text-gray-100">{t.services.items[index].title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{t.services.items[index].desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Statement */}
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-[#042f2e] border border-teal-600 text-white rounded-2xl p-10 md:p-14 text-center shadow-lg shadow-teal-900/30">
                <span className="absolute top-5 left-8 text-7xl leading-none text-teal-500/40 font-serif select-none">&ldquo;</span>
                <p className="relative z-10 text-xl md:text-2xl lg:text-3xl text-gray-100 italic leading-relaxed">
                  {t.services.impactDesc}
                </p>
                <span className="absolute bottom-3 right-8 text-7xl leading-none text-teal-500/40 font-serif select-none">&rdquo;</span>
                <div className="mt-6 w-12 h-1 bg-teal-500 mx-auto rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience & Why Section */}
      <section className="py-16 md:py-24 bg-[#0a1f38]">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div
            ref={audienceRef}
            className={`transition-all duration-700 ease-out ${audienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">

              {/* For Whom */}
              <div className="rounded-2xl border border-teal-800 bg-[#042f2e]/60 backdrop-blur-sm p-7 md:p-10 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-1 rounded-full bg-teal-400" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{t.audience.title}</h3>
                </div>
                <ul className="space-y-3">
                  {[Building2, Scaling, UserCog, BarChart3].map((Icon, index) => (
                    <li key={index} className="flex items-start gap-4 bg-[#0a1f38]/50 rounded-xl px-4 py-3 border border-teal-900/60 hover:border-teal-600 transition-colors">
                      <div className="flex-shrink-0 mt-0.5 bg-teal-500/15 rounded-lg p-1.5">
                        <Icon className="h-5 w-5 text-teal-400" />
                      </div>
                      <span className="text-base md:text-lg text-gray-200 leading-snug">{t.audience.items[index]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why It Works */}
              <div className="rounded-2xl border border-emerald-800 bg-[#042f2e]/60 backdrop-blur-sm p-7 md:p-10 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-1 rounded-full bg-emerald-400" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{t.audience.why}</h3>
                </div>
                <ul className="space-y-3">
                  {t.audience.whyItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 bg-[#0a1f38]/50 rounded-xl px-4 py-3 border border-emerald-900/60 hover:border-emerald-500 transition-colors">
                      <div className="flex-shrink-0 mt-0.5 bg-emerald-500/15 rounded-lg p-1.5">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="text-base md:text-lg text-gray-200 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-[#042f2e]">
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
              <Card className="border border-teal-200 bg-white shadow-lg hover:shadow-teal-100 hover:shadow-xl transition-shadow text-center">
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
                  <h3 className="text-xl font-semibold mb-2 text-[#0a1f38]">{t.team.hector.name}</h3>
                  <p className="text-[#0a1f38] font-semibold text-lg mb-2">{t.team.hector.role}</p>
                  <Link
                    href="https://www.linkedin.com/in/héctor-nicolás-gonzález-baeza-833059177/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0a1f38] hover:text-teal-600 text-sm font-medium transition-colors mb-3"
                  >
                    LinkedIn
                  </Link>
                  <div className="bg-teal-700 text-white text-sm font-medium py-2 px-4 rounded-md mx-auto w-fit mb-3 h-10 flex items-center justify-center">
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
              <Card className="border border-teal-200 bg-white shadow-lg hover:shadow-teal-100 hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202026-02-05%20a%20la%28s%29%202.27.41%E2%80%AFp.m.-vc3oCMHd145xIlcSlYLUkyOISefPLe.png"
                      alt="Juan Carlos Hernández"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#0a1f38]">{t.team.juancarlos.name}</h3>
                  <p className="text-[#0a1f38] font-semibold text-lg mb-2">{t.team.juancarlos.role}</p>
                  <Link
                    href="https://www.linkedin.com/in/juan-carlos-hernández-contreras-03764323b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0a1f38] hover:text-teal-600 text-sm font-medium transition-colors mb-3"
                  >
                    LinkedIn
                  </Link>
                  <div className="bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-md mx-auto w-fit mb-3 h-10 flex items-center justify-center">
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
              <Card className="border border-teal-200 bg-white shadow-lg hover:shadow-teal-100 hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5153-kZtt3pUZ4YFoPMDepVCetH9uy2hAUs.jpg"
                      alt="Julio Zapata"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#0a1f38]">{t.team.julio.name}</h3>
                  <p className="text-[#0a1f38] font-semibold text-lg mb-2">{t.team.julio.role}</p>
                  <Link
                    href="https://www.linkedin.com/in/julio-zapata-diaz-9921901b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0a1f38] hover:text-teal-600 text-sm font-medium transition-colors mb-3"
                  >
                    LinkedIn
                  </Link>
                  <div className="bg-teal-700 text-white text-sm font-medium py-2 px-4 rounded-md mx-auto w-fit mb-3 h-10 flex items-center justify-center">
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
      <section id="recognitions" className="py-16 md:py-24 bg-[#042f2e]">
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
              <p className="text-xl text-gray-300">
                {t.awards.sub}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {t.awards.items.map((award, index) => (
                <Card key={index} className="border border-teal-900 bg-[#0a1f38] shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-900/30 mx-auto mb-4">
                      <Trophy className="h-12 w-12 text-teal-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-100">{award.title}</h3>
                    <p className="text-gray-400 text-sm">{award.desc}</p>
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
            glitchColors={['#042f2e', '#0a1f38', '#2dd4bf']}
            glitchSpeed={100}
            smooth={true}
            outerVignette={true}
            centerVignette={false}
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#0a1f38]/60" />
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
                <Button size="lg" className="bg-teal-400 text-[#0a1f38] hover:bg-teal-300 font-bold text-lg px-8 py-6">
                  {t.cta.btn}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#021a12] text-white py-16 border-t border-teal-900">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-teal-400">{">/CUANTICODE_"}</span>
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
