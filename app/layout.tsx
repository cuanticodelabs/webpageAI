import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Cuanticode Labs | Desarrollo de Software e IA en Chile",
    template: "%s | Cuanticode Labs",
  },
  description:
    "Cuanticode Labs es una empresa de desarrollo de software e inteligencia artificial en Chile. Automatización de procesos, agentes de IA, CRM y soluciones digitales a medida para empresas.",
  keywords: [
    "desarrollo de software Chile",
    "empresa de software Chile",
    "inteligencia artificial Chile",
    "automatización de procesos",
    "agentes de IA",
    "software a medida Chile",
    "transformación digital Chile",
    "desarrollo web Chile",
    "CRM personalizado",
    "Cuanticode",
    "startup tecnológica Chile",
    "IA para empresas",
  ],
  authors: [{ name: "Cuanticode Labs", url: "https://cuanticode.cl" }],
  creator: "Cuanticode Labs",
  publisher: "Cuanticode Labs",
  metadataBase: new URL("https://cuanticode.cl"),
  alternates: {
    canonical: "/",
    languages: {
      "es-CL": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    alternateLocale: "en_US",
    url: "https://cuanticode.cl",
    siteName: "Cuanticode Labs",
    title: "Cuanticode Labs | Desarrollo de Software e IA en Chile",
    description:
      "Automatización, agentes de IA y desarrollo de software a medida para empresas en Chile. Potencia tu negocio con tecnología de vanguardia.",
    images: [
      {
        url: "/images/atom.png",
        width: 512,
        height: 512,
        alt: "Cuanticode Labs - Desarrollo de Software e IA en Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuanticode Labs | Desarrollo de Software e IA en Chile",
    description:
      "Automatización, agentes de IA y desarrollo de software a medida para empresas en Chile.",
    images: ["/images/atom.png"],
    creator: "@cuanticode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/atom.png",
    shortcut: "/images/atom.png",
    apple: "/images/atom.png",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
