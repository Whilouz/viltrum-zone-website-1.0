"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Check, Settings } from "lucide-react"
import { GameIcon } from "./game-icon"

interface Game {
  id: string
  name: string
  genre: string
}

interface IconUploaderProps {
  games: Game[]
  onIconUpdate: (gameId: string, iconUrl: string) => void
}

export function IconUploader({ games, onIconUpdate }: IconUploaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string>("")
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }
      // Validar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("El archivo es muy grande. Máximo 2MB.")
        return
      }
      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedGame || !previewUrl) {
      alert("Selecciona un juego y una imagen")
      return
    }

    setIsUploading(true)
    try {
      // Simular subida de archivo (en un proyecto real, aquí harías la subida al servidor)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Actualizar el icono en el componente padre
      onIconUpdate(selectedGame, previewUrl)

      // Guardar en localStorage para persistencia
      const savedIcons = JSON.parse(localStorage.getItem("gameIcons") || "{}")
      savedIcons[selectedGame] = previewUrl
      localStorage.setItem("gameIcons", JSON.stringify(savedIcons))

      setUploadSuccess(true)
      setTimeout(() => {
        setUploadSuccess(false)
        setSelectedGame("")
        setPreviewUrl("")
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      alert("Error al subir el icono")
    } finally {
      setIsUploading(false)
    }
  }

  const selectedGameData = games.find((game) => game.id === selectedGame)

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 rounded-full w-14 h-14"
          size="lg"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-black/90 border-purple-400/50 shadow-lg shadow-purple-400/25 w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Upload className="w-5 h-5 mr-2 text-purple-400" />
              Subir Icono de Juego
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploadSuccess ? (
            <div className="text-center py-8">
              <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-400 text-xl font-bold mb-2">¡Icono Actualizado!</h3>
              <p className="text-gray-300">El icono se guardó correctamente</p>
            </div>
          ) : (
            <>
              <div>
                <Label className="text-gray-300 mb-2 block">Seleccionar Juego</Label>
                <Select onValueChange={setSelectedGame} value={selectedGame}>
                  <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                    <SelectValue placeholder="Elige un juego..." />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id}>
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedGame && (
                <div className="text-center">
                  <Label className="text-gray-300 mb-2 block">Icono Actual</Label>
                  <div className="flex justify-center mb-4">
                    <GameIcon game={selectedGame} name={selectedGameData?.name || ""} />
                  </div>
                  <p className="text-sm text-gray-400">{selectedGameData?.name}</p>
                </div>
              )}

              <div>
                <Label className="text-gray-300 mb-2 block">Subir Nueva Imagen</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="bg-black/20 border-gray-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                />
                <p className="text-xs text-gray-400 mt-1">Formatos: PNG, JPG, GIF. Máximo 2MB. Recomendado: 48x48px</p>
              </div>

              {previewUrl && (
                <div className="text-center">
                  <Label className="text-gray-300 mb-2 block">Vista Previa</Label>
                  <div className="flex justify-center mb-2">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-12 h-12 rounded-lg object-cover border-2 border-purple-400"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedGame || !previewUrl || isUploading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Actualizar Icono
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
