"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { v4 as uuidv4 } from 'uuid';

// Generar un ID de sesión aleatorio (hash) globalmente
const sessionId = uuidv4();

const translations = {
  en: {
    back: "Back",
    next: "Next",
    submit: "Submit",
    send: "Send",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    companyName: "Company Name",
    companyNamePlaceholder: "Acme Inc.",
    email: "Email Address",
    emailPlaceholder: "john@company.com",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    phase1: "Business Context",
    phase2: "Problem Details",
    progress: "Progress",
    phase1Questions: [
      {
        question: "What range is your company in today?",
        options: ["< USD 500K annual", "USD 500K - 2M", "USD 2M - 10M", "USD 10M+"]
      },
      {
        question: "How many active clients do you handle approximately?",
        options: ["< 100", "100 - 1,000", "1,000 - 10,000", "10,000+"]
      },
      {
        question: "People involved in daily operations",
        options: ["1-5", "6-20", "21-100", "100+"]
      },
      {
        question: "How much of the work is manual today?",
        options: ["Low (<20%)", "Medium (20-50%)", "High (50-80%)", "Critical (80%+)"]
      },
      {
        question: "Key data mainly lives in...",
        options: ["Excel / Sheets", "Systems (ERP / CRM)", "PDFs / emails", "Mix of everything"]
      },
      {
        question: "This project is...",
        options: ["Exploratory", "Needed soon", "Critical now"]
      },
      {
        question: "Today you are mainly looking for:",
        options: ["Automation", "AI / intelligent analysis", "Process organization", "All of the above"]
      }
    ],
    phase2Questions: [
      {
        question: "What is the main problem or topic you would like to review with us?",
        placeholder: "Describe the main challenge your business is facing..."
      },
      {
        question: "Why is this topic relevant or urgent for you right now?",
        placeholder: "Explain why this is important at this moment..."
      },
      {
        question: "When this problem occurs, what consequences does it generate in your business or team?",
        placeholder: "Describe the impact on operations, team, revenue, etc..."
      },
      {
        question: "Today, do you have any way to measure this problem or its impact?",
        placeholder: "If there are indicators, metrics or numbers, describe them. If not, explain how you realize it's happening..."
      },
      {
        question: "Regarding this topic, what situations do you consider unacceptable to continue occurring today?",
        placeholder: "What must stop happening immediately..."
      },
      {
        question: "If this project worked well, how would you notice? What would have to change or improve to consider it a success?",
        placeholder: "Describe your ideal outcome and success criteria..."
      }
    ],
    thankYou: {
      title: "Thank you for completing the diagnosis!",
      subtitle: "Our team will contact you shortly via WhatsApp.",
      backHome: "Back to Home"
    },
    phase3: {
      title: "AI Consultation",
      subtitle: "Let's discuss your needs in detail.",
      initialMessage: "Welcome to the AI consultation phase!",
      followUp1: "Can you tell me more about your goals?",
      followUp2: "What challenges are you currently facing?",
      finalMessage: "Thank you for sharing! We'll get back to you soon.",
      placeholder: "Type your message here..."
    }
  },
  es: {
    back: "Atras",
    next: "Siguiente",
    submit: "Enviar",
    send: "Enviar",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Juan Perez",
    companyName: "Nombre de Empresa",
    companyNamePlaceholder: "Empresa S.A.",
    email: "Correo Electronico",
    emailPlaceholder: "juan@empresa.com",
    phone: "Numero de Telefono",
    phonePlaceholder: "+52 (55) 1234-5678",
    phase1: "Contexto del Negocio",
    phase2: "Detalles del Problema",
    progress: "Progreso",
    phase1Questions: [
      {
        question: "En que rango esta tu empresa hoy?",
        options: ["< USD 500K anual", "USD 500K - 2M", "USD 2M - 10M", "USD 10M+"]
      },
      {
        question: "Cuantos clientes activos manejan aproximadamente?",
        options: ["< 100", "100 - 1,000", "1,000 - 10,000", "10,000+"]
      },
      {
        question: "Personas involucradas en la operacion diaria",
        options: ["1-5", "6-20", "21-100", "100+"]
      },
      {
        question: "Cuanto del trabajo es manual hoy?",
        options: ["Bajo (<20%)", "Medio (20-50%)", "Alto (50-80%)", "Critico (80%+)"]
      },
      {
        question: "Los datos clave viven principalmente en...",
        options: ["Excel / Sheets", "Sistemas (ERP / CRM)", "PDFs / correos", "Mezcla de todo"]
      },
      {
        question: "Este proyecto es...",
        options: ["Exploratorio", "Necesario pronto", "Critico ahora"]
      },
      {
        question: "Hoy buscas principalmente:",
        options: ["Automatizacion", "IA / analisis inteligente", "Ordenar procesos", "Todo lo anterior"]
      }
    ],
    phase2Questions: [
      {
        question: "Cual es el principal problema o tema que te gustaria revisar con nosotros?",
        placeholder: "Describe el principal desafio que enfrenta tu negocio..."
      },
      {
        question: "Por que este tema es relevante o urgente para ti en este momento?",
        placeholder: "Explica por que esto es importante en este momento..."
      },
      {
        question: "Cuando este problema ocurre, que consecuencias genera en tu negocio o en el equipo?",
        placeholder: "Describe el impacto en operaciones, equipo, ingresos, etc..."
      },
      {
        question: "Hoy, tienen alguna forma de medir este problema o su impacto?",
        placeholder: "Si existen indicadores, metricas o numeros, describelos. Si no, explica como se dan cuenta de que esta ocurriendo..."
      },
      {
        question: "Respecto a este tema, que situaciones consideras inaceptables que sigan ocurriendo hoy?",
        placeholder: "Que debe dejar de pasar inmediatamente..."
      },
      {
        question: "Si este proyecto funcionara bien, como lo notarias? Que tendria que cambiar o mejorar para considerarlo un exito?",
        placeholder: "Describe tu resultado ideal y criterios de exito..."
      }
    ],
    thankYou: {
      title: "Gracias por completar el diagnostico!",
      subtitle: "Nuestro equipo te contactara pronto via WhatsApp.",
      backHome: "Volver al Inicio"
    },
    phase3: {
      title: "AI Consultation",
      subtitle: "Let's discuss your needs in detail.",
      initialMessage: "Welcome to the AI consultation phase!",
      followUp1: "Can you tell me more about your goals?",
      followUp2: "What challenges are you currently facing?",
      finalMessage: "Thank you for sharing! We'll get back to you soon.",
      placeholder: "Type your message here..."
    }
  }
}

export default function OnboardingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('es')
  const t = translations[lang]
  
  const [currentPhase, setCurrentPhase] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: ""
  })
  const [phase1Answers, setPhase1Answers] = useState<string[]>([])
  const [phase2Answers, setPhase2Answers] = useState<string[]>([])
  const [chatMessages, setChatMessages] = useState<{role: 'ai' | 'user', content: string}[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatStep, setChatStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [manzanita, setManzanita] = useState<any>(null)

  const totalPhase1Questions = t.phase1Questions.length

  const isContactValid = () => {
    return (
      contactInfo.fullName.trim() !== "" &&
      contactInfo.companyName.trim() !== "" &&
      contactInfo.email.trim() !== "" &&
      contactInfo.phone.trim() !== ""
    )
  }

  const sendToWebhook = async () => {
    const payload = {
      contactInfo,
      phase1Answers: t.phase1Questions.map((q, i) => ({
        question: q.question,
        answer: phase1Answers[i] || ""
      })),
      phase2Answers: t.phase2Questions.map((q, i) => ({
        question: q.question,
        answer: phase2Answers[i] || ""
      })),
      chatMessages,
      language: lang,
      timestamp: new Date().toISOString(),
      sessionId // Incluir el ID de sesión en el payload
    };

    console.log("[v0] Payload a enviar:", JSON.stringify(payload, null, 2)); // Imprimir el payload completo con formato

    try {
      const response = await fetch("https://n8n.cuanticode.com/webhook-test/onboarding/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" // Ensure CORS headers are set
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Determinar los mensajes iniciales según el idioma seleccionado
      const initialMessages = lang === 'es' 
        ? ['¡Hola! 👋', '¿En qué puedo ayudarte hoy?'] 
        : ['Hello! 👋', 'How can I help you today?'];

      // Usar el Webhook y el ID generado anteriormente para inicializar el asistente
      createChat({
        webhookUrl: `https://n8n.cuanticode.com/webhook/354665b2-594c-4de5-a9fe-b359c888f272/chat`,
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        metadata: { sessionId }, // Pasar el ID de sesión como metadata
        target: '#chat-container',
        mode: 'window',
        showWelcomeScreen: true,
        initialMessages, // Usar los mensajes iniciales dinámicos
        enableStreaming: true
      });

      console.log("[v0] Chat inicializado con Webhook fijo y ID:", sessionId);
      console.log("[v0] Respuesta del Webhook del formulario:", data); // Imprimir la respuesta del webhook
      setManzanita(data);
      return data;
    } catch (error) {
      console.error("Error sending to webhook:", error);
      return null;
    }
  }
  const totalPhase2Questions = t.phase2Questions.length

  const handlePhase1Answer = (answer: string) => {
    setSelectedOption(answer)
  }

  const handlePhase1Next = () => {
    // Only validate contact info on first question
    if (!selectedOption) return
    if (currentQuestion === 0 && !isContactValid()) return
    
    const newAnswers = [...phase1Answers]
    newAnswers[currentQuestion] = selectedOption
    setPhase1Answers(newAnswers)
    setSelectedOption(null)
    
    if (currentQuestion < totalPhase1Questions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentPhase(2)
      setCurrentQuestion(0)
      setPhase2Answers([])
    }
  }

  const handlePhase2Answer = async (answer: string) => {
    if (!answer.trim()) return
    
    const newAnswers = [...phase2Answers]
    newAnswers[currentQuestion] = answer
    setPhase2Answers(newAnswers)
    
    if (currentQuestion < totalPhase2Questions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Build full form JSON before moving to AI Consultation
      const fullFormData = {
        contactInfo,
        phase1Answers: t.phase1Questions.map((q, i) => ({
          question: q.question,
          answer: phase1Answers[i] || ""
        })),
        phase2Answers: t.phase2Questions.map((q, i) => ({
          question: q.question,
          answer: newAnswers[i] || ""
        })),
        language: lang,
        timestamp: new Date().toISOString(),
        sessionId // Incluir el ID de sesión en el JSON
      }
      
      // Print JSON to console
      console.log("[v0] Full Form JSON:", JSON.stringify(fullFormData, null, 2))
      
      // Send to webhook
      try {
        const response = await fetch("https://n8n.cuanticode.com/webhook-test/onboarding/intake", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(fullFormData)
        })
        const data = await response.json()
        setManzanita(data)
        console.log("[v0] manzanita response:", data)
      } catch (error) {
        console.error("[v0] Error sending to webhook:", error)
      }
      
      setCurrentPhase(3)
      setChatMessages([{ role: 'ai', content: t.phase3.initialMessage }])
    }
  }

  const handleChatSend = async () => {
    if (!chatInput.trim()) return
    
    const newMessages = [...chatMessages, { role: 'user' as const, content: chatInput }]
    setChatMessages(newMessages)
    setChatInput("")
    
    setTimeout(async () => {
      let aiResponse = ""
      if (chatStep === 0) {
        aiResponse = t.phase3.followUp1
        setChatStep(1)
      } else if (chatStep === 1) {
        aiResponse = t.phase3.followUp2
        setChatStep(2)
      } else {
        aiResponse = t.phase3.finalMessage
        setChatStep(3)
        setIsSending(true)
        await sendToWebhook()
        setIsSending(false)
        setTimeout(() => setIsComplete(true), 2000)
      }
      setChatMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    }, 1000)
  }

  const getProgress = () => {
    if (currentPhase === 1) {
      return ((currentQuestion + 1) / totalPhase1Questions) * 33
    } else if (currentPhase === 2) {
      return 33 + ((currentQuestion + 1) / totalPhase2Questions) * 33
    } else {
      return 66 + (chatStep / 3) * 34
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="p-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">{t.thankYou.title}</h1>
            <p className="text-gray-600">{t.thankYou.subtitle}</p>
            <Link href="/">
              <Button className="bg-gray-900 hover:bg-gray-800">{t.thankYou.backHome}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b">
        <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            {">/CUANTICODE_"}
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'es' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{t.progress}</span>
          <span className="text-sm text-gray-500">{Math.round(getProgress())}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gray-900 transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        
        {/* Phase Indicators */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1, 2, 3].map((phase) => (
            <div key={phase} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                currentPhase >= phase 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {phase}
              </div>
              <span className={`text-sm hidden sm:block ${currentPhase >= phase ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                {phase === 1 ? t.phase1 : phase === 2 ? t.phase2 : t.phase3.title}
              </span>
              {phase < 3 && <div className="w-8 h-0.5 bg-gray-200 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`mx-auto px-6 pb-12 ${currentPhase === 3 ? 'max-w-4xl' : 'max-w-2xl'}`}>
        {/* Phase 1: Multiple Choice */}
        {currentPhase === 1 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Contact Information Fields - Only show on first question */}
              {currentQuestion === 0 && (
                <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.fullName} <span className="text-red-500">*</span></Label>
                      <Input
                        id="fullName"
                        placeholder={t.fullNamePlaceholder}
                        value={contactInfo.fullName}
                        onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t.companyName} <span className="text-red-500">*</span></Label>
                      <Input
                        id="companyName"
                        placeholder={t.companyNamePlaceholder}
                        value={contactInfo.companyName}
                        onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email} <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.phone} <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-500 mb-2">
                {t.phase1} - {currentQuestion + 1}/{totalPhase1Questions}
              </div>
              <h2 className="text-xl font-semibold mb-6">
                {t.phase1Questions[currentQuestion].question}
              </h2>
              <div className="space-y-3 mb-6">
                {t.phase1Questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handlePhase1Answer(option)}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      selectedOption === option 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(currentQuestion - 1)
                      setSelectedOption(phase1Answers[currentQuestion - 1] || null)
                    }
                  }}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.back}
                </Button>
                <Button
                  onClick={handlePhase1Next}
                  disabled={!selectedOption || (currentQuestion === 0 && !isContactValid())}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  {t.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Phase 2: Open Questions */}
        {currentPhase === 2 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-sm text-gray-500 mb-2">
                {t.phase2} - {currentQuestion + 1}/{totalPhase2Questions}
              </div>
              <h2 className="text-xl font-semibold mb-4">
                {t.phase2Questions[currentQuestion].question}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Please provide as much detail as possible.
              </p>
              <Textarea
                placeholder={t.phase2Questions[currentQuestion].placeholder}
                className="min-h-[150px] mb-4"
                value={phase2Answers[currentQuestion] || ""}
                onChange={(e) => {
                  const newAnswers = [...phase2Answers]
                  newAnswers[currentQuestion] = e.target.value
                  setPhase2Answers(newAnswers)
                }}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(currentQuestion - 1)
                    } else {
                      setCurrentPhase(1)
                      setCurrentQuestion(totalPhase1Questions - 1)
                    }
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.back}
                </Button>
                <Button
                  onClick={() => handlePhase2Answer(phase2Answers[currentQuestion] || "")}
                  disabled={!phase2Answers[currentQuestion]?.trim()}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  {t.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Phase 3: Chat */}
        {currentPhase === 3 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">{t.phase3.title}</h2>
                <p className="text-sm text-gray-500">{t.phase3.subtitle}</p>
              </div>
              
              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-6 h-[450px] overflow-y-auto mb-6 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              {chatStep < 3 && (
                <div className="flex gap-2">
                  <Textarea
                    placeholder={t.phase3.placeholder}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleChatSend()
                      }
                    }}
                  />
                  <Button
                    onClick={handleChatSend}
                    disabled={!chatInput.trim()}
                    className="bg-gray-900 hover:bg-gray-800 px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
