"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowRight, Linkedin, Phone, Instagram, Mail,
  CheckCircle2, Building2, Scaling, UserCog, BarChart3, Trophy, Menu, X
} from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

const translations = {
  en: {
    nav: { services: "Services", team: "Team", contact: "Contact" },
    hero: {
      tagline: "HÉCTOR GONZÁLEZ BAEZA",
      credentials: "Computer Science Engineer, MBA and Master in Digital Transformation",
      title: "We build",
      highlight: "AI agents",
      titleEnd: "in",
      business: "businesses",
      description: "We are a firm of computer science engineers, experts in building reliable solutions with artificial intelligence. We design and implement systems built to operate continuously, with stability, monitoring and real responsibility for what we do. Your business cannot depend on tests. It needs solutions that work every day.",
      company: "CuantiCode Labs",
      cta: "Let's talk",
      services: "See services",
      quote: "\"When your operation matters, you need more than technology: you need trust.\""
    },
    solutions: {
      title: "Technological solutions",
      titleHighlight: "AI and automation for real operations",
      subtitle: "We apply artificial intelligence and automation in our companies and client projects. What we learn translates directly into results — not demos.",
      items: [
        { title: "AI Agents", desc: "Intelligent assistants that operate within the business: analysis, support, report generation and decision-making support." },
        { title: "Process Automation", desc: "We connect business tools to eliminate repetitive manual work and allow teams to grow without burnout." },
        { title: "Custom Software", desc: "Sites, dashboards and integrations built with focus. The speed of an engineering team without its costs." },
        { title: "Integrations", desc: "We unify the different business platforms into a single layer, where information flows and operations become traceable." }
      ]
    },
    services: {
      title: "Integrate AI in 5 Steps",
      items: [
        { title: "Diagnosis", desc: "We ground your problems and challenges, prioritizing them by urgency and impact." },
        { title: "Feasibility", desc: "We propose solutions and verify technical feasibility before starting, especially for integrations." },
        { title: "Development", desc: "We build using agile methodologies, with iterative deliveries and constant validation." },
        { title: "Production", desc: "We validate and deploy to production with certified processes." },
        { title: "Continuity", desc: "We stay to maintain and optimize the Workflow." }
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
        name: "Hector Gonzalez Baeza", role: "CEO", badge: "Innovation & Development",
        desc: ["Big Data Engineer at BCI", "Computer Science Engineer UdeC", "MBA UDD, Innovation", "Master in Digital Transformation, La Salle Barcelona"],
        expert: "Expert in automation, Big Data, and Artificial Intelligence."
      },
      juancarlos: {
        name: "Juan Carlos Hernandez", role: "CTO", badge: "Architecture & Technology",
        desc: ["Computer Science Engineer UdeC", "Full-stack developer and technical advisor"],
        expert: "Specialist in product strategy, agile development and project leadership."
      },
      julio: {
        name: "Julio Zapata", role: "CFO", badge: "Finance & Compliance",
        desc: ["Computer Science Engineer UdeC", "Full-stack developer and technical advisor on public and private projects"],
        expert: "Focus on scalability, compliance and regulatory solutions development."
      }
    },
    awards: {
      title: "Recognitions",
      sub: "Recognition for innovation and technological potential",
      items: [
        { title: "Innovative Project Incuba UDD 2025", desc: "Highlighted for our disruptive value proposition." },
        { title: "2nd Place Incuba Tec UDD", desc: "Award for the viability and technological potential of our solution." },
        { title: "Demo Day UDD 2024 Finalist", desc: "Recognition for innovation and project presentation." }
      ]
    },
    cta: { title: "Ready to stop guessing and start scaling with technology?", btn: "Request your executive diagnosis" },
    footer: { rights: "All rights reserved.", tagline: "Growth powered by technology and automation." }
  },
  es: {
    nav: { services: "Servicios", team: "Equipo", contact: "Contacto" },
    hero: {
      tagline: "HÉCTOR GONZÁLEZ BAEZA",
      credentials: "Ingeniero Civil Informático, MBA y Magíster en Transformación Digital",
      title: "Construimos",
      highlight: "agentes IA",
      titleEnd: "en",
      business: "negocios",
      description: "Somos una firma de ingenieros civiles informáticos, expertos en construir soluciones confiables con inteligencia artificial. Diseñamos e implementamos sistemas pensados para operar de forma continua, con estabilidad, monitoreo y responsabilidad real sobre lo que hacemos. Tu negocio no puede depender de pruebas. Necesita soluciones que funcionen todos los días.",
      company: "CuantiCode Labs",
      cta: "Conversemos",
      services: "Ver servicios",
      quote: "\"Cuando tu operación es importante, necesitas más que tecnología: necesitas confianza.\""
    },
    solutions: {
      title: "Soluciones tecnológicas",
      titleHighlight: "IA y automatización para operaciones reales",
      subtitle: "Aplicamos inteligencia artificial y automatización en nuestras empresas y en proyectos de clientes. Lo que aprendemos se traduce directamente en resultados — no en demos.",
      items: [
        { title: "Agentes con IA", desc: "Asistentes inteligentes que operan dentro del negocio: análisis, soporte, generación de reportes y apoyo a la toma de decisiones." },
        { title: "Automatización de procesos", desc: "Conectamos las herramientas del negocio para eliminar trabajo manual repetitivo y permitir que los equipos crezcan sin saturarse." },
        { title: "Software a medida", desc: "Sitios, dashboards e integraciones construidos con foco. La velocidad de un equipo de ingeniería sin sus costos." },
        { title: "Integraciones", desc: "Unificamos las distintas plataformas del negocio en una sola capa, donde la información fluye y la operación se vuelve trazable." }
      ]
    },
    services: {
      title: "Integra IA en 5 Pasos",
      items: [
        { title: "Diagnóstico", desc: "Aterrizamos tus problemas y desafíos, priorizándolos por urgencia e impacto." },
        { title: "Factibilidad", desc: "Proponemos soluciones y comprobamos su factibilidad técnica antes de comenzar, sobre todo en integraciones." },
        { title: "Desarrollo", desc: "Construimos bajo metodologías ágiles, con entregas iterativas y validación constante." },
        { title: "Producción", desc: "Validamos y desplegamos en producción con procesos certificados." },
        { title: "Continuidad", desc: "Nos quedamos manteniendo y optimizando el Workflow." }
      ]
    },
    audience: {
      title: "¿Para Quién Es Esto?",
      items: ["Empresas medianas y grandes", "CEOs, Gerentes Generales y Directores de Operaciones", "Negocios sin CTO o con equipo técnico desbordado", "Empresas con problemas urgentes de tecnología y sin camino claro"],
      why: "¿Por Qué Funciona?",
      whyItems: ["Metodología Ágil", "Fuerte visión de negocio", "Nos integramos a tu equipo sin complicar su trabajo", "Entregamos resultados reales y medibles"]
    },
    team: {
      title: "Nuestro Equipo",
      hector: {
        name: "Héctor González Baeza", role: "CEO", badge: "Innovación y Desarrollo",
        desc: ["Big Data Engineer en BCI", "Ingeniero Civil Informático UdeC", "MBA UDD especializado en Innovación", "Máster en Transformación Digital, La Salle Barcelona"],
        expert: "Experto en automatización, Big Data e Inteligencia Artificial."
      },
      juancarlos: {
        name: "Juan Carlos Hernández", role: "CTO", badge: "Arquitectura y Tecnología",
        desc: ["Ingeniero Civil Informático UdeC", "Desarrollador FullStack", "Líder técnico en proyectos de software"],
        expert: "Especialista en estrategia de producto, desarrollo ágil y jefe de proyecto"
      },
      julio: {
        name: "Julio Zapata", role: "CFO", badge: "Finanzas y Cumplimiento",
        desc: ["Ingeniero Civil Informático UdeC", "Desarrollador full-stack y asesor técnico en proyectos públicos y privados"],
        expert: "Foco en escalabilidad, cumplimiento y desarrollo de soluciones normativas."
      }
    },
    awards: {
      title: "Reconocimientos",
      sub: "Reconocimiento a la innovación y potencial tecnológico",
      items: [
        { title: "Proyecto Innovador Incuba UDD 2025", desc: "Destacados por nuestra propuesta de valor disruptiva." },
        { title: "2do Lugar Incuba Tec UDD", desc: "Premio a la viabilidad y potencial tecnológico de nuestra solución." },
        { title: "Finalista Demo Day UDD 2024", desc: "Reconocimiento a la innovación y presentación de proyectos." }
      ]
    },
    cta: { title: "¿Listo para dejar de improvisar y escalar con tecnología?", btn: "Solicita tu diagnóstico ejecutivo" },
    footer: { rights: "Todos los derechos reservados.", tagline: "Crecimiento potenciado por tecnología y automatización." }
  }
}

function ContactLinks({ lang }: { lang: 'en' | 'es' }) {
  return (
    <div className="space-y-2 pt-2">
      <a
        href="mailto:hectogonzalezb@gmail.com"
        className="flex items-center gap-3 p-3.5 rounded-[8px] border border-[#EAEAEA] hover:bg-[#F7F6F3] transition-colors"
      >
        <Mail className="h-4 w-4 text-[#787774] flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#111111]">Email</p>
          <p className="text-xs text-[#787774]">hectogonzalezb@gmail.com</p>
        </div>
      </a>
      <a
        href="tel:+56998644074"
        className="flex items-center gap-3 p-3.5 rounded-[8px] border border-[#EAEAEA] hover:bg-[#F7F6F3] transition-colors"
      >
        <Phone className="h-4 w-4 text-[#787774] flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#111111]">{lang === 'es' ? 'Teléfono' : 'Phone'}</p>
          <p className="text-xs text-[#787774]">+56 9 9864 4074</p>
        </div>
      </a>
    </div>
  )
}

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('es')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  const [teamRef, teamInView] = useInView()
  const [recognitionsRef, recognitionsInView] = useInView()
  const [servicesRef, servicesInView] = useInView()
  const [audienceRef, audienceInView] = useInView()
  const [solutionsRef, solutionsInView] = useInView()

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const navLinks = [
    { label: t.nav.services, id: 'servicios' },
    { label: t.nav.team, id: 'equipo' },
    { label: t.nav.contact, id: 'contact' },
  ]

  const LangSwitcher = () => (
    <div className="flex gap-0.5 bg-[#F7F6F3] rounded-[6px] p-0.5 border border-[#EAEAEA]">
      {(['en', 'es'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-[4px] text-xs font-medium transition-all ${
            lang === l
              ? 'bg-white text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
              : 'text-[#787774] hover:text-[#111111]'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111]" suppressHydrationWarning>

      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-[#FBFBFA]/90 backdrop-blur-sm border-b border-[#EAEAEA]">
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-sm font-semibold text-[#111111] tracking-tight">CuantiCode Labs</span>
          </Link>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#787774] hover:text-[#111111] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-[#FBFBFA] border-b border-[#EAEAEA] py-4 px-5 space-y-0.5">
            {navLinks.map(item => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={e => { handleSmoothScroll(e, item.id); setMobileMenuOpen(false) }}
                className="block text-sm text-[#787774] hover:text-[#111111] transition-colors py-2.5 border-b border-[#EAEAEA] last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full mt-3 bg-[#111111] hover:bg-[#333333] text-white font-medium rounded-[6px] py-2.5 text-sm transition-colors">
                  {t.hero.cta}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white border-[#EAEAEA] max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-[#111111] text-base font-semibold">{t.hero.cta}</DialogTitle>
                </DialogHeader>
                <ContactLinks lang={lang} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </header>

      {/* ── DESKTOP HEADER ── */}
      <header className="hidden md:block sticky top-0 z-50 w-full bg-[#FBFBFA]/90 backdrop-blur-sm border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-sm font-semibold text-[#111111] tracking-tight cursor-pointer">CuantiCode Labs</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-7">
              {navLinks.map(item => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleSmoothScroll(e, item.id)}
                  className="text-sm text-[#787774] hover:text-[#111111] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="w-px h-4 bg-[#EAEAEA]" />
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-[#111111] hover:bg-[#333333] active:scale-[0.98] text-white font-medium rounded-[6px] px-4 py-2 text-sm transition-all">
                  {t.hero.cta}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white border-[#EAEAEA] max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-[#111111] text-base font-semibold">{t.hero.cta}</DialogTitle>
                </DialogHeader>
                <ContactLinks lang={lang} />
              </DialogContent>
            </Dialog>
            <LangSwitcher />
          </div>
        </div>
      </header>

      {/* ── FLOATING CONTACT (MOBILE) ── */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-[10px] bg-[#111111] hover:bg-[#333333] active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <Phone className="h-4 w-4 text-white" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white border-[#EAEAEA] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#111111] text-base font-semibold">{t.hero.cta}</DialogTitle>
          </DialogHeader>
          <ContactLinks lang={lang} />
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-24 border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left — editorial text */}
            <div className="space-y-6 lg:space-y-7 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[#787774]">
                <span className="w-5 h-px bg-[#EAEAEA]" />
                CuantiCode Labs — Concepción, Chile
              </div>

              <h1 className="font-serif text-[2.6rem] leading-[1.05] md:text-5xl lg:text-[4.5rem] tracking-[-0.02em] text-[#111111]">
                {t.hero.title}{' '}
                <em className="not-italic text-[#c9a55c]">{t.hero.highlight}</em>
                <br />
                {t.hero.titleEnd}{' '}
                <em className="not-italic text-[#c9a55c]">{t.hero.business}</em>
              </h1>

              <p className="text-[#787774] text-sm md:text-base leading-[1.8] text-justify">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#333333] active:scale-[0.98] text-white font-medium rounded-[6px] px-5 py-3 sm:py-2.5 text-sm transition-all">
                      {t.hero.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-[#EAEAEA] max-w-sm">
                    <DialogHeader>
                      <DialogTitle className="text-[#111111] text-base font-semibold">{t.hero.cta}</DialogTitle>
                    </DialogHeader>
                    <ContactLinks lang={lang} />
                  </DialogContent>
                </Dialog>
                <Link
                  href="#servicios"
                  onClick={e => handleSmoothScroll(e, 'servicios')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#111111] font-medium rounded-[6px] px-5 py-3 sm:py-2.5 text-sm border border-[#EAEAEA] hover:bg-[#F7F6F3] transition-colors"
                >
                  {t.hero.services}
                </Link>
              </div>

              <div className="flex items-center gap-5">
                <Link
                  href="https://www.linkedin.com/in/héctor-nicolás-gonzález-baeza-833059177/"
                  target="_blank"
                  className="flex items-center gap-1.5 text-[#787774] hover:text-[#111111] text-xs transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </Link>
                <span className="w-px h-3 bg-[#EAEAEA]" />
                <Link
                  href="https://instagram.com/ia_entunegocio"
                  target="_blank"
                  className="flex items-center gap-1.5 text-[#787774] hover:text-[#111111] text-xs transition-colors"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  @ia_entunegocio
                </Link>
              </div>
            </div>

            {/* Right — circular photo */}
            <div className="flex flex-col items-center gap-5 order-1 lg:order-2">
              {/* Ring decorativo */}
              <div className="relative">
                <div className="absolute -inset-3 rounded-full border border-[#EAEAEA]" />
                <div className="absolute -inset-6 rounded-full border border-[#EAEAEA]/50" />
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border border-[#EAEAEA]">
                  <Image
                    src="/images/hector-hero.png"
                    alt="Hector Gonzalez Baeza"
                    fill
                    className="object-cover grayscale"
                    priority
                  />
                </div>
              </div>
              <div className="text-center space-y-1.5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#787774]">
                  {t.hero.tagline}
                </p>
                <p className="text-xs text-[#787774]">{t.hero.credentials}</p>
                <p className="text-xs text-[#787774] italic mt-2 leading-relaxed max-w-xs">
                  {t.hero.quote}
                </p>
              </div>
              {/* Mini stats */}
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <p className="font-serif text-xl text-[#111111] leading-none">3+</p>
                  <p className="text-[10px] text-[#787774] mt-0.5">{lang === 'es' ? 'ingenieros' : 'engineers'}</p>
                </div>
                <div className="w-px h-6 bg-[#EAEAEA]" />
                <div className="text-center">
                  <p className="font-serif text-xl text-[#111111] leading-none">10+</p>
                  <p className="text-[10px] text-[#787774] mt-0.5">{lang === 'es' ? 'proyectos' : 'projects'}</p>
                </div>
                <div className="w-px h-6 bg-[#EAEAEA]" />
                <div className="text-center">
                  <p className="font-serif text-xl text-[#111111] leading-none">2</p>
                  <p className="text-[10px] text-[#787774] mt-0.5">{lang === 'es' ? 'premios' : 'awards'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTIONS — Bento Grid
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-32 border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div
            ref={solutionsRef}
            className={`transition-all duration-700 ease-out ${solutionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            {/* Header */}
            <div className="mb-10 md:mb-12 max-w-2xl">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#787774] mb-3">
                {t.solutions.title}
              </p>
              <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-[#111111] leading-[1.1] tracking-[-0.02em]">
                {t.solutions.titleHighlight}
              </h2>
              <p className="text-[#787774] text-sm md:text-base leading-[1.8] mt-4 text-justify">
                {t.solutions.subtitle}
              </p>
            </div>

            {/* Bento Grid — asymmetric 2-col */}
            <div className="grid md:grid-cols-2 gap-3">
              {/* Featured card */}
              <div className="relative bg-[#F9F9F8] border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c9a55c]" />
                <span className="inline-block bg-[#FBF3DB] text-[#956400] text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-5">
                  {lang === 'es' ? 'Principal' : 'Featured'}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-[#111111] mb-3 leading-tight tracking-[-0.01em]">
                  {t.solutions.items[0].title}
                </h3>
                <p className="text-[#787774] text-sm leading-[1.8] text-justify">{t.solutions.items[0].desc}</p>
              </div>

              {/* Item 2 */}
              <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow">
                <p className="font-serif text-[48px] text-[#F0EDE8] leading-none mb-3 select-none">02</p>
                <h3 className="font-medium text-[#111111] mb-2">{t.solutions.items[1].title}</h3>
                <p className="text-[#787774] text-sm leading-[1.8] text-justify">{t.solutions.items[1].desc}</p>
              </div>

              {/* Item 3 */}
              <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow">
                <p className="font-serif text-[48px] text-[#F0EDE8] leading-none mb-3 select-none">03</p>
                <h3 className="font-medium text-[#111111] mb-2">{t.solutions.items[2].title}</h3>
                <p className="text-[#787774] text-sm leading-[1.8] text-justify">{t.solutions.items[2].desc}</p>
              </div>

              {/* Item 4 */}
              <div className="bg-[#F9F9F8] border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow">
                <p className="font-serif text-[48px] text-[#F0EDE8] leading-none mb-3 select-none">04</p>
                <h3 className="font-medium text-[#111111] mb-2">{t.solutions.items[3].title}</h3>
                <p className="text-[#787774] text-sm leading-[1.8] text-justify">{t.solutions.items[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — 5 Steps
      ══════════════════════════════════════════ */}
      <section id="servicios" className="py-16 md:py-32 border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div
            ref={servicesRef}
            className={`transition-all duration-700 ease-out ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <div className="mb-10 md:mb-12">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#787774] mb-3">
                {lang === 'es' ? 'Proceso' : 'Process'}
              </p>
              <h2 className="font-serif text-2xl md:text-4xl text-[#111111] leading-[1.1] tracking-[-0.02em]">
                {t.services.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {t.services.items.map((item, i) => (
                <div
                  key={i}
                  className={`relative bg-white border border-[#EAEAEA] rounded-[12px] p-5 md:p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow${i === 4 ? ' col-span-2 md:col-span-1' : ''}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="w-8 h-8 rounded-[6px] bg-[#F7F6F3] border border-[#EAEAEA] flex items-center justify-center mb-4">
                    <span className="text-xs font-semibold text-[#787774]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#111111] mb-1.5">{item.title}</h3>
                  <p className="text-[#787774] text-xs leading-[1.7]">{item.desc}</p>
                  {i < 4 && (
                    <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-3 w-3 text-[#EAEAEA]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AUDIENCE & WHY
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-32 border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div
            ref={audienceRef}
            className={`transition-all duration-700 ease-out ${audienceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">

              {/* For whom */}
              <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 md:p-10">
                <div className="w-6 h-px bg-[#c9a55c] mb-5" />
                <h3 className="font-serif text-xl md:text-3xl text-[#111111] mb-5 md:mb-6 leading-tight tracking-[-0.01em]">
                  {t.audience.title}
                </h3>
                <ul className="space-y-0">
                  {[Building2, Scaling, UserCog, BarChart3].map((Icon, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 py-3 border-b border-[#EAEAEA] last:border-0"
                    >
                      <Icon className="h-4 w-4 text-[#787774] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm text-[#787774] leading-snug">{t.audience.items[i]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why */}
              <div className="bg-[#F9F9F8] border border-[#EAEAEA] rounded-[12px] p-6 md:p-10">
                <div className="w-6 h-px bg-[#c9a55c] mb-5" />
                <h3 className="font-serif text-xl md:text-3xl text-[#111111] mb-5 md:mb-6 leading-tight tracking-[-0.01em]">
                  {t.audience.why}
                </h3>
                <ul className="space-y-0">
                  {t.audience.whyItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 py-3 border-b border-[#EAEAEA] last:border-0"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#787774] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-sm text-[#787774] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════ */}
      <section id="equipo" className="py-16 md:py-32 border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div
            ref={teamRef}
            className={`transition-all duration-700 ease-out ${teamInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <div className="mb-10 md:mb-12">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#787774] mb-3">
                {lang === 'es' ? 'Equipo' : 'Team'}
              </p>
              <h2 className="font-serif text-2xl md:text-4xl text-[#111111] leading-[1.1] tracking-[-0.02em]">
                {t.team.title}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Héctor */}
              <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-[#EAEAEA] mb-5 ring-4 ring-[#FBFBFA]">
                  <Image src="/images/hector-hero.png" alt={t.team.hector.name} width={96} height={96} className="w-full h-full object-cover grayscale" />
                </div>
                <h3 className="text-base font-semibold text-[#111111]">{t.team.hector.name}</h3>
                <p className="text-sm text-[#c9a55c] font-medium mt-0.5 mb-3">{t.team.hector.role}</p>
                <span className="inline-block bg-[#FBF3DB] text-[#956400] text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-3">
                  {t.team.hector.badge}
                </span>
                <Link
                  href="https://www.linkedin.com/in/héctor-nicolás-gonzález-baeza-833059177/"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[#787774] hover:text-[#111111] text-xs mb-5 transition-colors"
                >
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </Link>
                <div className="border-t border-[#EAEAEA] pt-4 w-full space-y-1">
                  {t.team.hector.desc.map((line, i) => (
                    <p key={i} className="text-xs text-[#787774] text-center">{line}</p>
                  ))}
                  <p className="text-xs text-[#787774] pt-1 font-medium text-center">{t.team.hector.expert}</p>
                </div>
              </div>

              {/* Juan Carlos */}
              <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-[#EAEAEA] mb-5 bg-[#F7F6F3] ring-4 ring-[#FBFBFA]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202026-02-05%20a%20la%28s%29%202.27.41%E2%80%AFp.m.-vc3oCMHd145xIlcSlYLUkyOISefPLe.png"
                    alt={t.team.juancarlos.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover grayscale scale-150"
                  />
                </div>
                <h3 className="text-base font-semibold text-[#111111]">{t.team.juancarlos.name}</h3>
                <p className="text-sm text-[#c9a55c] font-medium mt-0.5 mb-3">{t.team.juancarlos.role}</p>
                <span className="inline-block bg-[#E1F3FE] text-[#1F6C9F] text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-3">
                  {t.team.juancarlos.badge}
                </span>
                <Link
                  href="https://www.linkedin.com/in/juan-carlos-hernández-contreras-03764323b/"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[#787774] hover:text-[#111111] text-xs mb-5 transition-colors"
                >
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </Link>
                <div className="border-t border-[#EAEAEA] pt-4 w-full space-y-1">
                  {t.team.juancarlos.desc.map((line, i) => (
                    <p key={i} className="text-xs text-[#787774] text-center">{line}</p>
                  ))}
                  <p className="text-xs text-[#787774] pt-1 font-medium text-center">{t.team.juancarlos.expert}</p>
                </div>
              </div>

              {/* Julio */}
              <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-[#EAEAEA] mb-5 bg-[#F7F6F3] ring-4 ring-[#FBFBFA]">
                  <Image src="/images/julio.png" alt={t.team.julio.name} width={96} height={96} className="w-full h-full object-cover grayscale scale-150" />
                </div>
                <h3 className="text-base font-semibold text-[#111111]">{t.team.julio.name}</h3>
                <p className="text-sm text-[#c9a55c] font-medium mt-0.5 mb-3">{t.team.julio.role}</p>
                <span className="inline-block bg-[#EDF3EC] text-[#346538] text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-3">
                  {t.team.julio.badge}
                </span>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-[#787774] hover:text-[#111111] text-xs mb-5 transition-colors"
                >
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </Link>
                <div className="border-t border-[#EAEAEA] pt-4 w-full space-y-1">
                  {t.team.julio.desc.map((line, i) => (
                    <p key={i} className="text-xs text-[#787774] text-center">{line}</p>
                  ))}
                  <p className="text-xs text-[#787774] pt-1 font-medium text-center">{t.team.julio.expert}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECOGNITIONS
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-32 border-b border-[#EAEAEA] bg-[#F9F9F8]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div
            ref={recognitionsRef}
            className={`transition-all duration-700 ease-out ${recognitionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <div className="mb-10 md:mb-12">
              <div className="w-6 h-px bg-[#c9a55c] mb-5" />
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#787774] mb-3">
                {lang === 'es' ? 'Logros' : 'Awards'}
              </p>
              <h2 className="font-serif text-2xl md:text-4xl text-[#111111] leading-[1.1] tracking-[-0.02em] mb-2">
                {t.awards.title}
              </h2>
              <p className="text-[#787774] text-sm">{t.awards.sub}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {t.awards.items.map((award, i) => (
                <div
                  key={i}
                  className="relative bg-white border border-[#EAEAEA] rounded-[12px] p-5 md:p-7 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow flex flex-col items-center text-center overflow-hidden"
                >
                  {i === 0 && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c9a55c]" />}
                  <div className="w-9 h-9 rounded-[8px] bg-[#FBF3DB] flex items-center justify-center mb-5">
                    <Trophy className="h-4 w-4 text-[#956400]" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-[40px] text-[#F0EDE8] leading-none mb-3 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold text-[#111111] mb-1.5 leading-snug">{award.title}</h3>
                  <p className="text-[#787774] text-xs leading-[1.7]">{award.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-16 md:py-36 border-b border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl">
            <div className="w-6 h-px bg-[#c9a55c] mb-6" />
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#787774] mb-6">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#111111] leading-[1.05] tracking-[-0.02em] mb-8 md:mb-10 text-balance">
              {t.cta.title}
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
              <a
                href="https://wa.me/56998644974?text=Hola%20Hector,%20me%20gustaria%20solicitar%20un%20diagnostico%20ejecutivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-[#333333] active:scale-[0.98] text-white font-medium rounded-[6px] px-7 py-3.5 text-sm transition-all"
              >
                {t.cta.btn}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:hectogonzalezb@gmail.com"
                className="inline-flex items-center gap-1.5 text-[#787774] hover:text-[#111111] text-sm transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                hectogonzalezb@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="py-8">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
              <span className="text-sm font-semibold text-[#111111]">CuantiCode Labs</span>
              <span className="hidden md:inline w-px h-3 bg-[#EAEAEA]" />
              <span className="text-xs text-[#787774]">{t.footer.tagline}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/héctor-nicolás-gonzález-baeza-833059177/"
                target="_blank"
                className="text-[#787774] hover:text-[#111111] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com/ia_entunegocio"
                target="_blank"
                className="text-[#787774] hover:text-[#111111] transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#EAEAEA]">
            <p className="text-[#787774] text-xs">
              &copy; {new Date().getFullYear()} CuantiCode Labs. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
