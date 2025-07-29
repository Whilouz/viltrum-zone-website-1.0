"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { NotificationService } from "./notification-service"
import { sendContactMessage } from "@/app/actions"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar mensaje al servidor
      const result = await sendContactMessage(formData)

      if (result.success) {
        // Enviar notificación
        await NotificationService.sendNotification("contactForms", formData)

        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error)
      alert("Error al enviar el mensaje. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (submitted) {
    return (
      <Card className="bg-black/60 border-green-400/50 shadow-lg shadow-green-400/25 backdrop-blur-sm">
        <CardContent className="pt-6 text-center">
          <div className="text-green-400 text-lg font-semibold mb-2">¡Mensaje enviado exitosamente!</div>
          <p className="text-gray-300">Te contactaremos pronto.</p>
          <Button onClick={() => setSubmitted(false)} className="mt-4 bg-green-600 hover:bg-green-700">
            Enviar otro mensaje
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/60 border-pink-400/50 shadow-lg shadow-pink-400/25 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Contáctanos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black/20 border-gray-600 text-white"
              placeholder="Tu nombre completo"
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
              onChange={handleChange}
              required
              className="bg-black/20 border-gray-600 text-white"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-300">
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-black/20 border-gray-600 text-white"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-gray-300">
              Mensaje
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-black/20 border-gray-600 text-white min-h-[100px]"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 font-bold shadow-lg shadow-pink-500/25"
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
