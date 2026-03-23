"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ComingSoonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComingSoonDialog({ open, onOpenChange }: ComingSoonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6 text-center">
        <DialogHeader className="flex flex-col items-center space-y-4">
          {/* Espacio para logo pequeño */}
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-2">
            <Image src="/images/teoh.png" alt="Teoh! Logo" width={64} height={64} className="object-contain" />
          </div>
          <DialogTitle className="text-2xl font-bold">¡Próximamente!</DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Esta funcionalidad estará disponible en:
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <p className="text-3xl font-extrabold text-gray-800">Septiembre 2025</p>
        </div>

        {/* Contact Information Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Tienes alguna consulta?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-800">Héctor González Baeza</p>
            <p className="text-xs text-gray-500">CEO</p>
            <div className="flex flex-col space-y-1">
              <a href="mailto:hectogonzalezb@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                hectogonzalezb@gmail.com
              </a>
              <a href="tel:+56998644974" className="text-blue-600 hover:text-blue-700 transition-colors">
                +56998644974
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={() => onOpenChange(false)} className="bg-gray-800 hover:bg-gray-900">
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
