import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cuanticode",
  description: "Created by Cuanticode labs.",
  generator: "Cuanticodelabs",
  icons: {
    icon: "/images/teoh.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
