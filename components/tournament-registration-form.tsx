"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Trophy, Send } from "lucide-react"
import { NotificationService } from "./notification-service"

const sendTournamentRegistration = async (formData: any) => {
  // Simulate sending request to server
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true, message: "Inscripción enviada con éxito" }
}

interface TournamentRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
}

export function TournamentRegistrationForm({ isOpen, onClose }: TournamentRegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    game: "",
    experience: "",
    teamName: "",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar inscripción al servidor
      const result = await sendTournamentRegistration(formData)

      if (result.success) {
        // Enviar notificación
        await NotificationService.sendNotification("tournaments", formData)

        setSubmitted(true)

        // Reset después de 4 segundos
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            age: "",
            game: "",
            experience: "",
            teamName: "",
            comments: "",
          })
          onClose()
        }, 4000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error al enviar inscripción:", error)
      alert("Error al enviar la inscripción. Inténtalo de nuevo.")
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-black/90 border-orange-400/50 shadow-lg shadow-orange-400/25 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-orange-400" />
              Inscripción al Torneo
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-400 text-xl font-bold mb-4">¡Inscripción Confirmada! 🏆</div>
              <div className="text-gray-300 space-y-2 mb-4">
                <p>
                  <strong>Jugador:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <strong>Juego:</strong> {formData.game}
                </p>
                {formData.teamName && (
                  <p>
                    <strong>Equipo:</strong> {formData.teamName}
                  </p>
                )}
              </div>
              <p className="text-yellow-400 text-sm mb-2">
                Te contactaremos al {formData.phone} con los detalles del torneo
              </p>
              <p className="text-orange-400 text-sm">📅 Próximo torneo: Sábado 7:00 PM</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-300">
                    Nombre *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-300">
                    Apellido *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="Apellido"
                  />
                </div>
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
                <Label htmlFor="age" className="text-gray-300">
                  Edad *
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="13"
                  max="99"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="18"
                />
              </div>

              <div>
                <Label className="text-gray-300">Juego del torneo *</Label>
                <Select onValueChange={(value) => handleSelectChange("game", value)}>
                  <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                    <SelectValue placeholder="Selecciona el juego" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fortnite">Fortnite</SelectItem>
                    <SelectItem value="valorant">VALORANT</SelectItem>
                    <SelectItem value="lol">League of Legends</SelectItem>
                    <SelectItem value="cs2">Counter Strike 2</SelectItem>
                    <SelectItem value="fifa">FIFA 24</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Nivel de experiencia</Label>
                <Select onValueChange={(value) => handleSelectChange("experience", value)}>
                  <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                    <SelectValue placeholder="Tu nivel de juego" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                    <SelectItem value="profesional">Profesional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="teamName" className="text-gray-300">
                  Nombre del equipo (opcional)
                </Label>
                <Input
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="bg-black/20 border-gray-600 text-white"
                  placeholder="Nombre de tu equipo o clan"
                />
              </div>

              <div>
                <Label htmlFor="comments" className="text-gray-300">
                  Comentarios adicionales
                </Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  className="bg-black/20 border-gray-600 text-white min-h-[60px]"
                  placeholder="Algo más que quieras decirnos..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold shadow-lg shadow-orange-500/25"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando inscripción...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Inscribirse al Torneo
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
