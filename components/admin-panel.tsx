"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Upload,
  X,
  Check,
  Settings,
  Trash2,
  EyeOff,
  Lock,
  ImageIcon,
  Palette,
  Plus,
  ExternalLink,
  Unlock,
  Edit,
  Save,
  Info,
  Move,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { GameIcon } from "./game-icon"
import { SiteCustomizer } from "./site-customizer"

interface Game {
  id: string
  name: string
  genre: string
}

interface SocialIcon {
  id: string
  name: string
  url: string
  icon: string
}

interface AdminPanelProps {
  games: Game[]
  onIconUpdate: (gameId: string, iconUrl: string) => void
  onBackgroundUpdate: (backgroundUrl: string, type: "image" | "video", backgroundType: string) => void
  onSocialIconUpdate: (socialId: string, iconUrl: string) => void
}

interface NewGame {
  id: string
  name: string
  genre: string
}

interface NewSocialNetwork {
  id: string
  name: string
  url: string
  icon: string
  color: string
}

interface BackgroundSettings {
  opacity: number
  overlayColor: string
  overlayOpacity: number
  blur: number
  brightness: number
  contrast: number
  position: string
  size: string
  positionX: number // Nuevo: posición horizontal personalizada
  positionY: number // Nuevo: posición vertical personalizada
  useCustomPosition: boolean // Nuevo: usar posición personalizada vs predefinida
}

export function AdminPanel({ games, onIconUpdate, onBackgroundUpdate, onSocialIconUpdate }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "viltrum2024",
  })
  const [loginUsername, setLoginUsername] = useState("")
  const [selectedGame, setSelectedGame] = useState<string>("")
  const [selectedSocial, setSelectedSocial] = useState<string>("")
  const [selectedBackgroundType, setSelectedBackgroundType] = useState<string>("general")
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [backgroundPreview, setBackgroundPreview] = useState<string>("")
  const [backgroundType, setBackgroundType] = useState<"image" | "video">("image")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("games")
  const [showSiteCustomizer, setShowSiteCustomizer] = useState(false)

  const [newGame, setNewGame] = useState<NewGame>({
    id: "",
    name: "",
    genre: "",
  })
  const [newSocial, setNewSocial] = useState<NewSocialNetwork>({
    id: "",
    name: "",
    url: "",
    icon: "",
    color: "cyan",
  })
  const [customGames, setCustomGames] = useState<Game[]>([])
  const [customSocialNetworks, setCustomSocialNetworks] = useState<NewSocialNetwork[]>([])
  const [editingGame, setEditingGame] = useState<string | null>(null)
  const [editingGameData, setEditingGameData] = useState<NewGame>({ id: "", name: "", genre: "" })
  const [editingSocial, setEditingSocial] = useState<string | null>(null)
  const [editingSocialData, setEditingSocialData] = useState<NewSocialNetwork>({
    id: "",
    name: "",
    url: "",
    icon: "",
    color: "cyan",
  })

  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    opacity: 60,
    overlayColor: "#000000",
    overlayOpacity: 40,
    blur: 0,
    brightness: 100,
    contrast: 100,
    position: "center",
    size: "cover",
    positionX: 50, // Nuevo: 50% = centro horizontal
    positionY: 50, // Nuevo: 50% = centro vertical
    useCustomPosition: false, // Nuevo: por defecto usar posiciones predefinidas
  })

  const socialNetworks: SocialIcon[] = [
    { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@viltrum.zone", icon: "TT" },
    { id: "instagram", name: "Instagram", url: "https://www.instagram.com/viltrum.zone", icon: "IG" },
    { id: "whatsapp", name: "WhatsApp", url: "https://chat.whatsapp.com/JklcE8QAg7E68PJcciAiGa", icon: "WA" },
  ]

  const backgroundTypes = [
    {
      id: "general",
      name: "Fondo General",
      description: "Fondo principal de toda la página",
      recommendedSize: "1920x1080px",
      maxSize: "10MB",
      aspectRatio: "16:9",
      usage: "Se aplica a todas las secciones excepto hero y contacto",
    },
    {
      id: "banner",
      name: "Fondo del Banner",
      description: "Fondo de la sección hero/principal",
      recommendedSize: "1920x800px",
      maxSize: "15MB",
      aspectRatio: "21:9 o 16:9",
      usage: "Sección principal (hero) con texto superpuesto",
    },
    {
      id: "contact",
      name: "Fondo de Contacto",
      description: "Fondo de información de contacto",
      recommendedSize: "800x600px",
      maxSize: "5MB",
      aspectRatio: "4:3 o 16:9",
      usage: "Solo en la tarjeta de información de contacto",
    },
  ]

  useEffect(() => {
    // Verificar si el modo admin está activado
    const adminMode = localStorage.getItem("viltrumAdminMode")
    const adminEnabled = localStorage.getItem("viltrumAdminEnabled")
    if (adminMode === "true" && adminEnabled === "true") {
      setIsAdminMode(true)
    }

    // Cargar credenciales guardadas
    const savedCredentials = localStorage.getItem("adminCredentials")
    if (savedCredentials) {
      setAdminCredentials(JSON.parse(savedCredentials))
    }
  }, [])

  useEffect(() => {
    // Cargar juegos y redes sociales personalizadas
    const savedGames = localStorage.getItem("customGames")
    const savedSocials = localStorage.getItem("customSocialNetworks")
    const savedBackgroundSettings = localStorage.getItem("backgroundSettings")

    if (savedGames) setCustomGames(JSON.parse(savedGames))
    if (savedSocials) setCustomSocialNetworks(JSON.parse(savedSocials))
    if (savedBackgroundSettings) {
      const settings = JSON.parse(savedBackgroundSettings)
      // Asegurar que las nuevas propiedades existan
      setBackgroundSettings({
        ...settings,
        positionX: settings.positionX ?? 50,
        positionY: settings.positionY ?? 50,
        useCustomPosition: settings.useCustomPosition ?? false,
      })
    }
  }, [])

  const handleAdminLogin = () => {
    // Verificar usuario y contraseña
    if (loginUsername === adminCredentials.username && adminPassword === adminCredentials.password) {
      setIsAdminMode(true)
      localStorage.setItem("viltrumAdminMode", "true")
      localStorage.setItem("viltrumAdminEnabled", "true")
      setAdminPassword("")
      setLoginUsername("")
    } else {
      alert("Usuario o contraseña incorrectos")
    }
  }

  const handleDisableAdmin = () => {
    setIsAdminMode(false)
    localStorage.setItem("viltrumAdminMode", "false")
    localStorage.removeItem("viltrumAdminEnabled")
    setIsOpen(false)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: "game" | "background" | "social") => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validaciones según el tipo
    if (type === "background") {
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        alert("Por favor selecciona un archivo de imagen o video válido")
        return
      }
      if (file.size > 15 * 1024 * 1024) {
        // 15MB para videos/imágenes de fondo
        alert("El archivo es muy grande. Máximo 15MB.")
        return
      }
    } else {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB para iconos
        alert("El archivo es muy grande. Máximo 2MB.")
        return
      }
    }

    // Crear preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "background") {
        setBackgroundPreview(result)
        setBackgroundType(file.type.startsWith("video/") ? "video" : "image")
      } else {
        setPreviewUrl(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (activeTab === "games" && (!selectedGame || !previewUrl)) {
      alert("Selecciona un juego y una imagen")
      return
    }
    if (activeTab === "social" && (!selectedSocial || !previewUrl)) {
      alert("Selecciona una red social y una imagen")
      return
    }
    if (activeTab === "background" && (!backgroundPreview || !selectedBackgroundType)) {
      alert("Selecciona un tipo de fondo y una imagen")
      return
    }

    setIsUploading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (activeTab === "games") {
        onIconUpdate(selectedGame, previewUrl)
        const savedIcons = JSON.parse(localStorage.getItem("gameIcons") || "{}")
        savedIcons[selectedGame] = previewUrl
        localStorage.setItem("gameIcons", JSON.stringify(savedIcons))
        // Disparar evento para actualizar iconos de juegos
        window.dispatchEvent(new CustomEvent("gameIconUpdate"))
      } else if (activeTab === "social") {
        onSocialIconUpdate(selectedSocial, previewUrl)
        const savedSocialIcons = JSON.parse(localStorage.getItem("socialIcons") || "{}")
        savedSocialIcons[selectedSocial] = previewUrl
        localStorage.setItem("socialIcons", JSON.stringify(savedSocialIcons))
        // Disparar evento para actualizar iconos sociales
        window.dispatchEvent(new CustomEvent("socialIconUpdate"))
      } else if (activeTab === "background") {
        onBackgroundUpdate(backgroundPreview, backgroundType, selectedBackgroundType)
        // Guardar según el tipo de fondo
        const storageKey = `customBackground_${selectedBackgroundType}`
        const typeKey = `backgroundType_${selectedBackgroundType}`
        localStorage.setItem(storageKey, backgroundPreview)
        localStorage.setItem(typeKey, backgroundType)
        localStorage.setItem("backgroundSettings", JSON.stringify(backgroundSettings))
        // Disparar evento para actualizar el fondo inmediatamente
        window.dispatchEvent(
          new CustomEvent("backgroundUpdate", {
            detail: { backgroundType: selectedBackgroundType, settings: backgroundSettings },
          }),
        )
      }

      setUploadSuccess(true)
      setTimeout(() => {
        setUploadSuccess(false)
        setSelectedGame("")
        setSelectedSocial("")
        setSelectedBackgroundType("general")
        setPreviewUrl("")
        setBackgroundPreview("")
      }, 2000)
    } catch (error) {
      alert("Error al subir el archivo")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveBackground = () => {
    if (!selectedBackgroundType) {
      alert("Selecciona un tipo de fondo para quitar")
      return
    }

    const storageKey = `customBackground_${selectedBackgroundType}`
    const typeKey = `backgroundType_${selectedBackgroundType}`
    localStorage.removeItem(storageKey)
    localStorage.removeItem(typeKey)
    onBackgroundUpdate("", "image", selectedBackgroundType)
    setBackgroundPreview("")

    // Disparar evento para actualizar el fondo inmediatamente
    window.dispatchEvent(
      new CustomEvent("backgroundUpdate", {
        detail: { backgroundType: selectedBackgroundType },
      }),
    )
  }

  const handleSiteCustomizationUpdate = (data: any) => {
    // Actualizar credenciales si se proporcionan
    if (data.credentials) {
      setAdminCredentials(data.credentials)
    }
    console.log("Site customization updated:", data)
  }

  const handleAddGame = () => {
    if (!newGame.name.trim() || !newGame.genre.trim()) {
      alert("Por favor completa todos los campos del juego")
      return
    }

    const gameId = newGame.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const gameToAdd: Game = {
      id: gameId,
      name: newGame.name,
      genre: newGame.genre,
    }

    const updatedGames = [...customGames, gameToAdd]
    setCustomGames(updatedGames)
    localStorage.setItem("customGames", JSON.stringify(updatedGames))

    // Limpiar formulario
    setNewGame({ id: "", name: "", genre: "" })

    // Disparar evento para actualizar la página principal
    window.dispatchEvent(new CustomEvent("gamesUpdate", { detail: updatedGames }))

    alert("✅ Juego agregado correctamente")
  }

  const handleEditGame = (gameId: string) => {
    const game = customGames.find((g) => g.id === gameId)
    if (game) {
      setEditingGame(gameId)
      setEditingGameData(game)
    }
  }

  const handleSaveGameEdit = () => {
    if (!editingGameData.name.trim() || !editingGameData.genre.trim()) {
      alert("Por favor completa todos los campos")
      return
    }

    const updatedGames = customGames.map((game) =>
      game.id === editingGame ? { ...game, name: editingGameData.name, genre: editingGameData.genre } : game,
    )

    setCustomGames(updatedGames)
    localStorage.setItem("customGames", JSON.stringify(updatedGames))
    setEditingGame(null)
    setEditingGameData({ id: "", name: "", genre: "" })

    // Disparar evento para actualizar la página principal
    window.dispatchEvent(new CustomEvent("gamesUpdate", { detail: updatedGames }))

    alert("✅ Juego actualizado correctamente")
  }

  const handleRemoveGame = (gameId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este juego?")) {
      const updatedGames = customGames.filter((game) => game.id !== gameId)
      setCustomGames(updatedGames)
      localStorage.setItem("customGames", JSON.stringify(updatedGames))

      // Disparar evento para actualizar la página principal
      window.dispatchEvent(new CustomEvent("gamesUpdate", { detail: updatedGames }))
    }
  }

  const handleAddSocialNetwork = () => {
    if (!newSocial.name.trim() || !newSocial.url.trim()) {
      alert("Por favor completa el nombre y URL de la red social")
      return
    }

    const socialId = newSocial.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const socialToAdd: NewSocialNetwork = {
      ...newSocial,
      id: socialId,
      icon: newSocial.icon || newSocial.name.substring(0, 2).toUpperCase(),
    }

    const updatedSocials = [...customSocialNetworks, socialToAdd]
    setCustomSocialNetworks(updatedSocials)
    localStorage.setItem("customSocialNetworks", JSON.stringify(updatedSocials))

    // Limpiar formulario
    setNewSocial({ id: "", name: "", url: "", icon: "", color: "cyan" })

    // Disparar evento para actualizar la página principal
    window.dispatchEvent(new CustomEvent("socialNetworksUpdate", { detail: updatedSocials }))

    alert("✅ Red social agregada correctamente")
  }

  const handleEditSocial = (socialId: string) => {
    const social = customSocialNetworks.find((s) => s.id === socialId)
    if (social) {
      setEditingSocial(socialId)
      setEditingSocialData(social)
    }
  }

  const handleSaveSocialEdit = () => {
    if (!editingSocialData.name.trim() || !editingSocialData.url.trim()) {
      alert("Por favor completa todos los campos")
      return
    }

    const updatedSocials = customSocialNetworks.map((social) =>
      social.id === editingSocial ? { ...editingSocialData } : social,
    )

    setCustomSocialNetworks(updatedSocials)
    localStorage.setItem("customSocialNetworks", JSON.stringify(updatedSocials))
    setEditingSocial(null)
    setEditingSocialData({ id: "", name: "", url: "", icon: "", color: "cyan" })

    // Disparar evento para actualizar la página principal
    window.dispatchEvent(new CustomEvent("socialNetworksUpdate", { detail: updatedSocials }))

    alert("✅ Red social actualizada correctamente")
  }

  const handleRemoveSocialNetwork = (socialId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta red social?")) {
      const updatedSocials = customSocialNetworks.filter((social) => social.id !== socialId)
      setCustomSocialNetworks(updatedSocials)
      localStorage.setItem("customSocialNetworks", JSON.stringify(updatedSocials))

      // Disparar evento para actualizar la página principal
      window.dispatchEvent(new CustomEvent("socialNetworksUpdate", { detail: updatedSocials }))
    }
  }

  const handleBackgroundSettingChange = (setting: keyof BackgroundSettings, value: any) => {
    const newSettings = { ...backgroundSettings, [setting]: value }
    setBackgroundSettings(newSettings)
    localStorage.setItem("backgroundSettings", JSON.stringify(newSettings))

    // Aplicar cambios inmediatamente si hay un fondo seleccionado
    if (selectedBackgroundType) {
      window.dispatchEvent(
        new CustomEvent("backgroundUpdate", {
          detail: { backgroundType: selectedBackgroundType, settings: newSettings },
        }),
      )
    }
  }

  // Función para centrar la posición personalizada
  const handleCenterPosition = () => {
    handleBackgroundSettingChange("positionX", 50)
    handleBackgroundSettingChange("positionY", 50)
  }

  // Función para resetear posición a esquinas
  const handleCornerPosition = (corner: "top-left" | "top-right" | "bottom-left" | "bottom-right") => {
    const positions = {
      "top-left": { x: 0, y: 0 },
      "top-right": { x: 100, y: 0 },
      "bottom-left": { x: 0, y: 100 },
      "bottom-right": { x: 100, y: 100 },
    }
    const pos = positions[corner]
    handleBackgroundSettingChange("positionX", pos.x)
    handleBackgroundSettingChange("positionY", pos.y)
  }

  const selectedGameData = games.find((game) => game.id === selectedGame)
  const selectedSocialData = socialNetworks.find((social) => social.id === selectedSocial)
  const selectedBackgroundData = backgroundTypes.find((bg) => bg.id === selectedBackgroundType)

  // Si no está en modo admin, mostrar solo el botón
  if (!isAdminMode) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 rounded-full w-14 h-14"
          size="lg"
        >
          <Settings className="w-6 h-6" />
        </Button>

        {/* Modal de login admin */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-black/90 border-purple-400/50 shadow-lg shadow-purple-400/25 w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-purple-400" />
                    Acceso Administrador
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
                <div>
                  <Label className="text-gray-300 mb-2 block">Usuario</Label>
                  <Input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Contraseña</Label>
                  <Input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="Ingresa tu contraseña"
                    onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                  />
                </div>
                <Button
                  onClick={handleAdminLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Acceder
                </Button>
                <div className="text-center">
                  <p className="text-xs text-gray-400">¿Olvidaste tus credenciales? Contacta al desarrollador.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Panel completo de administrador
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <Button
          onClick={() => setShowSiteCustomizer(true)}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg rounded-full w-14 h-14"
          size="lg"
          title="Personalizar sitio"
        >
          <Palette className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 rounded-full w-14 h-14"
          size="lg"
          title="Panel de administración"
        >
          <Settings className="w-6 h-6" />
        </Button>
        <Button
          onClick={handleDisableAdmin}
          className="bg-red-600 hover:bg-red-700 shadow-lg rounded-full w-12 h-12"
          size="sm"
          title="Desactivar modo admin"
        >
          <EyeOff className="w-4 h-4" />
        </Button>

        <SiteCustomizer
          isOpen={showSiteCustomizer}
          onClose={() => setShowSiteCustomizer(false)}
          onUpdate={handleSiteCustomizationUpdate}
        />
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="bg-black/90 border-purple-400/50 shadow-lg shadow-purple-400/25 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" />
                Panel de Administración
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowSiteCustomizer(true)}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                  title="Personalizar sitio"
                >
                  <Palette className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDisableAdmin}
                  className="text-red-400 hover:text-red-300"
                  title="Desactivar modo admin"
                >
                  <EyeOff className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {uploadSuccess ? (
              <div className="text-center py-8">
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-green-400 text-xl font-bold mb-2">¡Actualizado Correctamente!</h3>
                <p className="text-gray-300">Los cambios se guardaron exitosamente</p>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 bg-black/40">
                  <TabsTrigger value="games" className="text-white">
                    Iconos de Juegos
                  </TabsTrigger>
                  <TabsTrigger value="social" className="text-white">
                    Redes Sociales
                  </TabsTrigger>
                  <TabsTrigger value="background" className="text-white">
                    Fondos
                  </TabsTrigger>
                  <TabsTrigger value="manage-games" className="text-white">
                    Gestionar Juegos
                  </TabsTrigger>
                  <TabsTrigger value="manage-social" className="text-white">
                    Gestionar Redes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="games" className="space-y-4 mt-6">
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
                    <Label className="text-gray-300 mb-2 block">Subir Nuevo Icono</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, "game")}
                      className="bg-black/20 border-gray-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                    />
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF. Máximo 2MB. Recomendado: 48x48px</p>
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
                </TabsContent>

                <TabsContent value="social" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Seleccionar Red Social</Label>
                    <Select onValueChange={setSelectedSocial} value={selectedSocial}>
                      <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                        <SelectValue placeholder="Elige una red social..." />
                      </SelectTrigger>
                      <SelectContent>
                        {socialNetworks.map((social) => (
                          <SelectItem key={social.id} value={social.id}>
                            {social.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSocial && (
                    <div className="text-center">
                      <Label className="text-gray-300 mb-2 block">Icono Actual</Label>
                      <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{selectedSocialData?.icon}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{selectedSocialData?.name}</p>
                    </div>
                  )}

                  <div>
                    <Label className="text-gray-300 mb-2 block">Subir Nuevo Icono</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, "social")}
                      className="bg-black/20 border-gray-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                    />
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF. Máximo 2MB. Recomendado: 40x40px</p>
                  </div>

                  {previewUrl && (
                    <div className="text-center">
                      <Label className="text-gray-300 mb-2 block">Vista Previa</Label>
                      <div className="flex justify-center mb-2">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-10 h-10 rounded-lg object-cover border-2 border-purple-400"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="background" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Tipo de Fondo</Label>
                    <Select onValueChange={setSelectedBackgroundType} value={selectedBackgroundType}>
                      <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                        <SelectValue placeholder="Selecciona el tipo de fondo..." />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundTypes.map((bgType) => (
                          <SelectItem key={bgType.id} value={bgType.id}>
                            <div className="flex items-center">
                              <ImageIcon className="w-4 h-4 mr-2" />
                              <div>
                                <div className="font-medium">{bgType.name}</div>
                                <div className="text-xs text-gray-400">{bgType.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedBackgroundType && (
                    <Card className="bg-black/40 border-cyan-400/30">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-2">{selectedBackgroundData?.name}</h4>
                            <div className="text-gray-300 text-sm space-y-1">
                              <p>
                                <strong>Descripción:</strong> {selectedBackgroundData?.description}
                              </p>
                              <p>
                                <strong>Tamaño recomendado:</strong> {selectedBackgroundData?.recommendedSize}
                              </p>
                              <p>
                                <strong>Relación de aspecto:</strong> {selectedBackgroundData?.aspectRatio}
                              </p>
                              <p>
                                <strong>Tamaño máximo:</strong> {selectedBackgroundData?.maxSize}
                              </p>
                              <p>
                                <strong>Uso:</strong> {selectedBackgroundData?.usage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div>
                    <Label className="text-gray-300 mb-2 block">Subir Fondo Personalizado</Label>
                    <Input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => handleFileSelect(e, "background")}
                      className="bg-black/20 border-gray-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Imagen (PNG, JPG, GIF) o Video (MP4, MOV). Máximo 15MB.
                    </p>
                  </div>

                  {backgroundPreview && (
                    <div className="text-center">
                      <Label className="text-gray-300 mb-2 block">Vista Previa del Fondo</Label>
                      <div className="flex justify-center mb-2">
                        {backgroundType === "video" ? (
                          <video
                            src={backgroundPreview || "/placeholder.svg"}
                            className="w-32 h-20 rounded-lg object-cover border-2 border-purple-400"
                            muted
                            loop
                            autoPlay
                          />
                        ) : (
                          <img
                            src={backgroundPreview || "/placeholder.svg"}
                            alt="Background Preview"
                            className="w-32 h-20 rounded-lg object-cover border-2 border-purple-400"
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        Tipo: {backgroundType === "video" ? "Video" : "Imagen"} | Destino:{" "}
                        {selectedBackgroundData?.name}
                      </p>
                    </div>
                  )}

                  {/* Controles avanzados de fondo */}
                  <Card className="bg-black/40 border-purple-400/30">
                    <CardContent className="pt-4">
                      <h4 className="text-purple-400 font-semibold mb-4">🎨 Configuración Avanzada</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Opacidad del Fondo: {backgroundSettings.opacity}%
                          </Label>
                          <Slider
                            value={[backgroundSettings.opacity]}
                            onValueChange={(value) => handleBackgroundSettingChange("opacity", value[0])}
                            max={100}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Color de Overlay</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={backgroundSettings.overlayColor}
                              onChange={(e) => handleBackgroundSettingChange("overlayColor", e.target.value)}
                              className="w-16 h-10 p-1 bg-black/20 border-gray-600"
                            />
                            <Input
                              value={backgroundSettings.overlayColor}
                              onChange={(e) => handleBackgroundSettingChange("overlayColor", e.target.value)}
                              className="bg-black/20 border-gray-600 text-white"
                              placeholder="#000000"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Opacidad del Overlay: {backgroundSettings.overlayOpacity}%
                          </Label>
                          <Slider
                            value={[backgroundSettings.overlayOpacity]}
                            onValueChange={(value) => handleBackgroundSettingChange("overlayOpacity", value[0])}
                            max={100}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Desenfoque: {backgroundSettings.blur}px</Label>
                          <Slider
                            value={[backgroundSettings.blur]}
                            onValueChange={(value) => handleBackgroundSettingChange("blur", value[0])}
                            max={20}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Brillo: {backgroundSettings.brightness}%</Label>
                          <Slider
                            value={[backgroundSettings.brightness]}
                            onValueChange={(value) => handleBackgroundSettingChange("brightness", value[0])}
                            max={200}
                            min={50}
                            step={5}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Contraste: {backgroundSettings.contrast}%</Label>
                          <Slider
                            value={[backgroundSettings.contrast]}
                            onValueChange={(value) => handleBackgroundSettingChange("contrast", value[0])}
                            max={200}
                            min={50}
                            step={5}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Tamaño</Label>
                          <Select
                            onValueChange={(value) => handleBackgroundSettingChange("size", value)}
                            value={backgroundSettings.size}
                          >
                            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cover">Cubrir (Cover)</SelectItem>
                              <SelectItem value="contain">Contener (Contain)</SelectItem>
                              <SelectItem value="auto">Automático</SelectItem>
                              <SelectItem value="100% 100%">Estirar (100%)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-gray-300 mb-2 block">Tipo de Posición</Label>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleBackgroundSettingChange("useCustomPosition", false)}
                              variant={!backgroundSettings.useCustomPosition ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
                            >
                              Predefinida
                            </Button>
                            <Button
                              onClick={() => handleBackgroundSettingChange("useCustomPosition", true)}
                              variant={backgroundSettings.useCustomPosition ? "default" : "outline"}
                              size="sm"
                              className="flex-1"
                            >
                              <Move className="w-4 h-4 mr-1" />
                              Personalizada
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Posición Predefinida */}
                      {!backgroundSettings.useCustomPosition && (
                        <div className="mt-4">
                          <Label className="text-gray-300 mb-2 block">Posición Predefinida</Label>
                          <Select
                            onValueChange={(value) => handleBackgroundSettingChange("position", value)}
                            value={backgroundSettings.position}
                          >
                            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="center">Centro</SelectItem>
                              <SelectItem value="top">Arriba</SelectItem>
                              <SelectItem value="bottom">Abajo</SelectItem>
                              <SelectItem value="left">Izquierda</SelectItem>
                              <SelectItem value="right">Derecha</SelectItem>
                              <SelectItem value="top left">Arriba Izquierda</SelectItem>
                              <SelectItem value="top right">Arriba Derecha</SelectItem>
                              <SelectItem value="bottom left">Abajo Izquierda</SelectItem>
                              <SelectItem value="bottom right">Abajo Derecha</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Posición Personalizada */}
                      {backgroundSettings.useCustomPosition && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-black/20 p-4 rounded-lg border border-cyan-400/30">
                            <h5 className="text-cyan-400 font-medium mb-3 flex items-center">
                              <Move className="w-4 h-4 mr-2" />
                              Posición Personalizada
                            </h5>

                            {/* Controles de posición horizontal */}
                            <div className="mb-4">
                              <Label className="text-gray-300 mb-2 block flex items-center">
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Posición Horizontal: {backgroundSettings.positionX}%
                              </Label>
                              <Slider
                                value={[backgroundSettings.positionX]}
                                onValueChange={(value) => handleBackgroundSettingChange("positionX", value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Izquierda (0%)</span>
                                <span>Centro (50%)</span>
                                <span>Derecha (100%)</span>
                              </div>
                            </div>

                            {/* Controles de posición vertical */}
                            <div className="mb-4">
                              <Label className="text-gray-300 mb-2 block flex items-center">
                                <ArrowUp className="w-4 h-4 mr-1" />
                                <ArrowDown className="w-4 h-4 mr-2" />
                                Posición Vertical: {backgroundSettings.positionY}%
                              </Label>
                              <Slider
                                value={[backgroundSettings.positionY]}
                                onValueChange={(value) => handleBackgroundSettingChange("positionY", value[0])}
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Arriba (0%)</span>
                                <span>Centro (50%)</span>
                                <span>Abajo (100%)</span>
                              </div>
                            </div>

                            {/* Botones de acceso rápido */}
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                onClick={handleCenterPosition}
                                variant="outline"
                                size="sm"
                                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                              >
                                <Move className="w-4 h-4 mr-1" />
                                Centrar
                              </Button>
                              <div className="grid grid-cols-2 gap-1">
                                <Button
                                  onClick={() => handleCornerPosition("top-left")}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs p-1"
                                  title="Esquina superior izquierda"
                                >
                                  ↖
                                </Button>
                                <Button
                                  onClick={() => handleCornerPosition("top-right")}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs p-1"
                                  title="Esquina superior derecha"
                                >
                                  ↗
                                </Button>
                                <Button
                                  onClick={() => handleCornerPosition("bottom-left")}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs p-1"
                                  title="Esquina inferior izquierda"
                                >
                                  ↙
                                </Button>
                                <Button
                                  onClick={() => handleCornerPosition("bottom-right")}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs p-1"
                                  title="Esquina inferior derecha"
                                >
                                  ↘
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 p-3 bg-black/20 rounded-lg border border-cyan-400/30">
                        <h5 className="text-cyan-400 font-medium mb-2">Vista Previa de Configuración</h5>
                        <div className="text-xs text-gray-300 grid grid-cols-2 gap-2">
                          <span>Opacidad Fondo: {backgroundSettings.opacity}%</span>
                          <span>Opacidad Overlay: {backgroundSettings.overlayOpacity}%</span>
                          <span>Desenfoque: {backgroundSettings.blur}px</span>
                          <span>Brillo: {backgroundSettings.brightness}%</span>
                          <span>Contraste: {backgroundSettings.contrast}%</span>
                          <span>Tamaño: {backgroundSettings.size}</span>
                          {backgroundSettings.useCustomPosition ? (
                            <>
                              <span>Pos. X: {backgroundSettings.positionX}%</span>
                              <span>Pos. Y: {backgroundSettings.positionY}%</span>
                            </>
                          ) : (
                            <span className="col-span-2">Posición: {backgroundSettings.position}</span>
                          )}
                        </div>
                        <div className="mt-2 p-2 bg-cyan-900/20 rounded text-xs text-cyan-300">
                          💡 <strong>Tip:</strong> Usa posición personalizada para control preciso del fondo. Los
                          cambios se aplican en tiempo real.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleRemoveBackground}
                      variant="outline"
                      className="flex-1 border-red-400 text-red-400 hover:bg-red-400/10 bg-transparent"
                      disabled={!selectedBackgroundType}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Quitar Fondo
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="manage-games" className="space-y-4 mt-6">
                  <div className="bg-cyan-900/20 border border-cyan-400/50 rounded-lg p-4 mb-6">
                    <h4 className="text-cyan-400 font-semibold mb-3">🎮 Gestionar Catálogo de Juegos</h4>
                    <p className="text-gray-300 text-sm">
                      Agrega nuevos juegos al catálogo, edita o elimina los existentes. Los juegos aparecerán en la
                      sección principal.
                    </p>
                  </div>

                  {/* Formulario para agregar nuevo juego */}
                  <Card className="bg-black/40 border-cyan-400/30">
                    <CardContent className="pt-4">
                      <h5 className="text-white font-semibold mb-4">➕ Agregar Nuevo Juego</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Nombre del Juego *</Label>
                          <Input
                            value={newGame.name}
                            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                            className="bg-black/20 border-gray-600 text-white"
                            placeholder="Ej: Apex Legends, FIFA 24..."
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Género *</Label>
                          <Input
                            value={newGame.genre}
                            onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
                            className="bg-black/20 border-gray-600 text-white"
                            placeholder="Ej: Battle Royale, Sports..."
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleAddGame}
                        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        disabled={!newGame.name.trim() || !newGame.genre.trim()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Juego
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Lista de juegos personalizados */}
                  {customGames.length > 0 && (
                    <Card className="bg-black/40 border-gray-600">
                      <CardContent className="pt-4">
                        <h5 className="text-white font-semibold mb-4">
                          🎯 Juegos Personalizados ({customGames.length})
                        </h5>
                        <div className="space-y-2">
                          {customGames.map((game) => (
                            <div
                              key={game.id}
                              className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gray-600"
                            >
                              {editingGame === game.id ? (
                                <div className="flex-1 grid grid-cols-2 gap-2 mr-3">
                                  <Input
                                    value={editingGameData.name}
                                    onChange={(e) => setEditingGameData({ ...editingGameData, name: e.target.value })}
                                    className="bg-black/20 border-gray-600 text-white"
                                    placeholder="Nombre del juego"
                                  />
                                  <Input
                                    value={editingGameData.genre}
                                    onChange={(e) => setEditingGameData({ ...editingGameData, genre: e.target.value })}
                                    className="bg-black/20 border-gray-600 text-white"
                                    placeholder="Género"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 flex-1">
                                  <GameIcon game={game.id} name={game.name} className="w-8 h-8" />
                                  <div>
                                    <p className="text-white font-medium">{game.name}</p>
                                    <p className="text-gray-400 text-sm">{game.genre}</p>
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-2">
                                {editingGame === game.id ? (
                                  <>
                                    <Button onClick={handleSaveGameEdit} size="sm" className="bg-green-600">
                                      <Save className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      onClick={() => setEditingGame(null)}
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-600"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      onClick={() => handleEditGame(game.id)}
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-600 text-gray-300"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={() => handleRemoveGame(game.id)} variant="destructive" size="sm">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Información sobre juegos predeterminados */}
                  <div className="bg-yellow-900/20 border border-yellow-400/50 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-semibold mb-2">💡 Información</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Los juegos predeterminados no se pueden eliminar desde aquí</li>
                      <li>• Los juegos personalizados aparecerán al final del catálogo</li>
                      <li>• Puedes subir iconos personalizados en la pestaña "Iconos de Juegos"</li>
                      <li>• El ID del juego se genera automáticamente basado en el nombre</li>
                      <li>• Usa el botón de editar para modificar nombre y género</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="manage-social" className="space-y-4 mt-6">
                  <div className="bg-purple-900/20 border border-purple-400/50 rounded-lg p-4 mb-6">
                    <h4 className="text-purple-400 font-semibold mb-3">📱 Gestionar Redes Sociales</h4>
                    <p className="text-gray-300 text-sm">
                      Agrega nuevas redes sociales, edita o elimina las existentes. Aparecerán en la sección de
                      contacto.
                    </p>
                  </div>

                  {/* Formulario para agregar nueva red social */}
                  <Card className="bg-black/40 border-purple-400/30">
                    <CardContent className="pt-4">
                      <h5 className="text-white font-semibold mb-4">➕ Agregar Nueva Red Social</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300">Nombre de la Red *</Label>
                          <Input
                            value={newSocial.name}
                            onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
                            className="bg-black/20 border-gray-600 text-white"
                            placeholder="Ej: Discord, YouTube, Twitch..."
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">URL Completa *</Label>
                          <Input
                            value={newSocial.url}
                            onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                            className="bg-black/20 border-gray-600 text-white"
                            placeholder="https://discord.gg/tu-servidor"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Icono/Texto (opcional)</Label>
                          <Input
                            value={newSocial.icon}
                            onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value })}
                            className="bg-black/20 border-gray-600 text-white"
                            placeholder="DC, YT, TW... (máx 3 caracteres)"
                            maxLength={3}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Color del Tema</Label>
                          <Select onValueChange={(value) => setNewSocial({ ...newSocial, color: value })}>
                            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                              <SelectValue placeholder={newSocial.color} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cyan">Cyan</SelectItem>
                              <SelectItem value="purple">Purple</SelectItem>
                              <SelectItem value="pink">Pink</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                              <SelectItem value="yellow">Yellow</SelectItem>
                              <SelectItem value="orange">Orange</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        onClick={handleAddSocialNetwork}
                        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        disabled={!newSocial.name.trim() || !newSocial.url.trim()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Red Social
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Lista de redes sociales personalizadas */}
                  {customSocialNetworks.length > 0 && (
                    <Card className="bg-black/40 border-gray-600">
                      <CardContent className="pt-4">
                        <h5 className="text-white font-semibold mb-4">
                          🌐 Redes Sociales Personalizadas ({customSocialNetworks.length})
                        </h5>
                        <div className="space-y-2">
                          {customSocialNetworks.map((social) => (
                            <div
                              key={social.id}
                              className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gray-600"
                            >
                              {editingSocial === social.id ? (
                                <div className="flex-1 grid grid-cols-2 gap-2 mr-3">
                                  <Input
                                    value={editingSocialData.name}
                                    onChange={(e) =>
                                      setEditingSocialData({ ...editingSocialData, name: e.target.value })
                                    }
                                    className="bg-black/20 border-gray-600 text-white"
                                    placeholder="Nombre"
                                  />
                                  <Input
                                    value={editingSocialData.url}
                                    onChange={(e) =>
                                      setEditingSocialData({ ...editingSocialData, url: e.target.value })
                                    }
                                    className="bg-black/20 border-gray-600 text-white"
                                    placeholder="URL"
                                  />
                                  <Input
                                    value={editingSocialData.icon}
                                    onChange={(e) =>
                                      setEditingSocialData({ ...editingSocialData, icon: e.target.value })
                                    }
                                    className="bg-black/20 border-gray-600 text-white"
                                    placeholder="Icono"
                                    maxLength={3}
                                  />
                                  <Select
                                    onValueChange={(value) =>
                                      setEditingSocialData({ ...editingSocialData, color: value })
                                    }
                                    value={editingSocialData.color}
                                  >
                                    <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cyan">Cyan</SelectItem>
                                      <SelectItem value="purple">Purple</SelectItem>
                                      <SelectItem value="pink">Pink</SelectItem>
                                      <SelectItem value="green">Green</SelectItem>
                                      <SelectItem value="blue">Blue</SelectItem>
                                      <SelectItem value="red">Red</SelectItem>
                                      <SelectItem value="yellow">Yellow</SelectItem>
                                      <SelectItem value="orange">Orange</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 flex-1">
                                  <div
                                    className={`w-10 h-10 bg-gradient-to-r from-${social.color}-500 to-${social.color}-600 rounded-lg flex items-center justify-center`}
                                  >
                                    <span className="text-white font-bold text-sm">{social.icon}</span>
                                  </div>
                                  <div>
                                    <p className="text-white font-medium">{social.name}</p>
                                    <p className="text-gray-400 text-sm truncate max-w-xs">{social.url}</p>
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-2">
                                {editingSocial === social.id ? (
                                  <>
                                    <Button onClick={handleSaveSocialEdit} size="sm" className="bg-green-600">
                                      <Save className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      onClick={() => setEditingSocial(null)}
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-600"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      onClick={() => window.open(social.url, "_blank")}
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-600 text-gray-300"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      onClick={() => handleEditSocial(social.id)}
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-600 text-gray-300"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      onClick={() => handleRemoveSocialNetwork(social.id)}
                                      variant="destructive"
                                      size="sm"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Información sobre redes sociales */}
                  <div className="bg-cyan-900/20 border border-cyan-400/50 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">💡 Consejos</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Las redes personalizadas aparecerán después de las predeterminadas</li>
                      <li>• Usa URLs completas (incluyendo https://)</li>
                      <li>• El icono se genera automáticamente si no especificas uno</li>
                      <li>• Puedes subir iconos personalizados en la pestaña "Redes Sociales"</li>
                      <li>• Ejemplos de URLs: Discord, YouTube, Twitch, Facebook, etc.</li>
                      <li>• Usa el botón de editar para modificar cualquier campo</li>
                    </ul>
                  </div>
                </TabsContent>

                <div className="mt-6">
                  <Button
                    onClick={handleUpload}
                    disabled={
                      (activeTab === "games" && (!selectedGame || !previewUrl)) ||
                      (activeTab === "social" && (!selectedSocial || !previewUrl)) ||
                      (activeTab === "background" && (!backgroundPreview || !selectedBackgroundType)) ||
                      isUploading
                    }
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
                        {activeTab === "games" && "Actualizar Icono de Juego"}
                        {activeTab === "social" && "Actualizar Icono de Red Social"}
                        {activeTab === "background" && `Actualizar ${selectedBackgroundData?.name || "Fondo"}`}
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>

      <SiteCustomizer
        isOpen={showSiteCustomizer}
        onClose={() => setShowSiteCustomizer(false)}
        onUpdate={handleSiteCustomizationUpdate}
      />
    </>
  )
}
