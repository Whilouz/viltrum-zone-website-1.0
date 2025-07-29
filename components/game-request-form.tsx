"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, GamepadIcon, Send } from "lucide-react"
import { NotificationService } from "./notification-service"

interface GameRequestFormProps {
  isOpen: boolean
  onClose: () => void
}

const sendGameRequest = async (formData: any) => {
  // Simulate sending request to server
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true, message: "Solicitud enviada con éxito" }
}

export function GameRequestForm({ isOpen, onClose }: GameRequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gameName: "",
    platform: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar solicitud al servidor
      const result = await sendGameRequest(formData)

      if (result.success) {
        // Enviar notificación
        await NotificationService.sendNotification("gameRequests", formData)

        setSubmitted(true)

        // Reset después de 3 segundos
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            gameName: "",
            platform: "",
            reason: "",
          })
          onClose()
        }, 3000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error)
      alert("Error al enviar la solicitud. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-black/90 border-cyan-400/50 shadow-lg shadow-cyan-400/25 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <GamepadIcon className="w-5 h-5 mr-2 text-cyan-400" />
              Solicitar Instalación de Juego
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-400 text-xl font-bold mb-4">¡Solicitud Enviada! 🎮</div>
              <p className="text-gray-300 mb-4">
                Hemos recibido tu solicitud para instalar <strong>{formData.gameName}</strong>
              </p>
              <p className="text-yellow-400 text-sm">
                Te contactaremos pronto al {formData.phone} para confirmar la instalación
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="Tu nombre y apellido"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="tu@email.com (opcional)"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="+58 412-123-4567"
                />
              </div>

              <div>
                <Label htmlFor="gameName" className="text-gray-300">
                  Nombre del juego *
                </Label>
                <Input
                  id="gameName"
                  name="gameName"
                  value={formData.gameName}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="Ej: Apex Legends, FIFA 24, GTA V..."
                />
              </div>

              <div>
                <Label htmlFor="platform" className="text-gray-300">
                  Plataforma
                </Label>
                <Input
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="Steam, Epic Games, Origin, etc."
                />
              </div>

              <div>
                <Label htmlFor="reason" className="text-gray-300">
                  ¿Por qué quieres este juego?
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="bg-black/20 border-gray-600 text-white min-h-[80px]"
                  placeholder="Cuéntanos por qué te gustaría que instalemos este juego..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 font-bold shadow-lg shadow-cyan-500/25"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitud
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
