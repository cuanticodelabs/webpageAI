"use client"

import { useEffect, useState } from "react"

interface KpiData {
  co2_kg: number
  hojas: number
  dias_arbol: number
}

const PINE = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#346538" width="11" height="11" style={{ flexShrink: 0, display: "inline" }}>
    <path d="M12 2L6.5 10H9.5L5 17H10.5V22H13.5V17H19L14.5 10H17.5L12 2Z" />
  </svg>
)

export default function ArtemisKpis() {
  const [data, setData] = useState<KpiData | null>(null)

  useEffect(() => {
    fetch("/api/artemis-kpis")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setData(d))
      .catch(() => null)
  }, [])

  if (!data) return null

  return (
    <div className="w-full mt-4">
      <div className="bg-white border border-[#EAEAEA] rounded-[10px] px-4 py-3">
        <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#787774] mb-3">
          {PINE}
          <span>Huella evitada desde el 14 Abr 2026</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-[8px] text-[#AEABA6] uppercase tracking-[0.08em] mb-0.5">Carbono CO₂e</p>
            <p className="font-semibold text-[#346538] text-sm leading-none">{data.co2_kg.toFixed(1)} kg</p>
          </div>
          <div className="w-px h-5 bg-[#EAEAEA]" />
          <div className="text-center">
            <p className="text-[8px] text-[#AEABA6] uppercase tracking-[0.08em] mb-0.5">Hojas de papel</p>
            <p className="font-semibold text-[#346538] text-sm leading-none">{data.hojas}</p>
          </div>
          <div className="w-px h-5 bg-[#EAEAEA]" />
          <div className="text-center">
            <p className="text-[8px] text-[#AEABA6] uppercase tracking-[0.08em] mb-0.5">Días árbol</p>
            <p className="font-semibold text-[#346538] text-sm leading-none">{data.dias_arbol.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
