"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User } from "lucide-react"
import { NotificationService } from "./notification-service"
import { sendReservation } from "@/app/actions"

export function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    duration: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar reserva al servidor
      const result = await sendReservation(formData)

      if (result.success) {
        // Enviar notificación
        await NotificationService.sendNotification("reservations", formData)

        setSubmitted(true)
        setIsSubmitting(false)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error enviando reserva:", error)
      alert("Error al enviar la reserva. Inténtalo de nuevo.")
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (submitted) {
    return (
      <Card className="bg-black/40 border-green-500/30 max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="text-green-400 text-xl font-bold mb-4">¡Reserva Confirmada! 🎮</div>
          <div className="text-gray-300 space-y-2">
            <p>
              <strong>Nombre:</strong> {formData.name}
            </p>
            <p>
              <strong>Fecha:</strong> {formData.date}
            </p>
            <p>
              <strong>Hora:</strong> {formData.time}
            </p>
            <p>
              <strong>Servicio:</strong> {formData.service}
            </p>
            <p>
              <strong>Duración:</strong> {formData.duration}
            </p>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">Te llamaremos al {formData.phone} para confirmar</p>
          <Button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                name: "",
                phone: "",
                date: "",
                time: "",
                duration: "",
                service: "",
              })
            }}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Nueva Reserva
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/60 border-cyan-400/50 shadow-lg shadow-cyan-400/25 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Reservar Estación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300 flex items-center">
              <User className="w-4 h-4 mr-1" />
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-black/20 border-gray-600 text-white"
              placeholder="Tu nombre"
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
              onChange={handleInputChange}
              required
              className="bg-black/20 border-gray-600 text-white"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-gray-300">
              Fecha
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="bg-black/20 border-gray-600 text-white"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Hora
            </Label>
            <Select onValueChange={(value) => handleSelectChange("time", value)}>
              <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                <SelectValue placeholder="Selecciona hora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="13:00">01:00 PM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
                <SelectItem value="16:00">04:00 PM</SelectItem>
                <SelectItem value="17:00">05:00 PM</SelectItem>
                <SelectItem value="18:00">06:00 PM</SelectItem>
                <SelectItem value="19:00">07:00 PM</SelectItem>
                <SelectItem value="20:00">08:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Servicio</Label>
            <Select onValueChange={(value) => handleSelectChange("service", value)}>
              <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                <SelectValue placeholder="Tipo de servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gaming">Gaming ($1.50/hr)</SelectItem>
                <SelectItem value="combo">Combo 2 Horas ($2.50)</SelectItem>
                <SelectItem value="servicios">Servicios Digitales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Duración</Label>
            <Select onValueChange={(value) => handleSelectChange("duration", value)}>
              <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                <SelectValue placeholder="¿Cuánto tiempo?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 hora</SelectItem>
                <SelectItem value="2h">2 horas</SelectItem>
                <SelectItem value="3h">3 horas</SelectItem>
                <SelectItem value="4h">4 horas</SelectItem>
                <SelectItem value="5h">5+ horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 font-bold shadow-lg shadow-cyan-500/25"
          >
            {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
