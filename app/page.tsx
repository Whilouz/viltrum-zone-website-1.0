"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Monitor,
  Gamepad2,
  Printer,
  Wifi,
  Clock,
  MapPin,
  Phone,
  Mail,
  Trophy,
  ExternalLink,
  MessageCircle,
} from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { ReservationForm } from "@/components/reservation-form"
import { GameIcon } from "@/components/game-icon"
import { GamingBackground } from "@/components/gaming-background"
import Image from "next/image"
import { useState, useEffect } from "react"
import { AdminPanel } from "@/components/admin-panel"
import { CustomBackground } from "@/components/custom-background"
// Agregar los imports de los nuevos componentes al inicio del archivo
import { GameRequestForm } from "@/components/game-request-form"
import { TournamentRegistrationForm } from "@/components/tournament-registration-form"

interface PageProps {
  customBackgrounds?: {
    general: { url: string; type: "image" | "video" }
    banner: { url: string; type: "image" | "video" }
    contact: { url: string; type: "image" | "video" }
  }
  getCustomBackgrounds?: () => {
    general: { url: string; type: "image" | "video" }
    banner: { url: string; type: "image" | "video" }
    contact: { url: string; type: "image" | "video" }
  }
}

export default function ViltrumZone({ customBackgrounds }: PageProps) {
  const games = [
    { id: "among-us", name: "Among Us", genre: "Social Deduction" },
    { id: "ricochet", name: "Ricochet", genre: "Arcade" },
    { id: "resident-evil-6", name: "Resident Evil 6", genre: "Horror/Action" },
    { id: "fortnite", name: "Fortnite", genre: "Battle Royale" },
    { id: "left-4-dead-2", name: "Left 4 Dead 2", genre: "Co-op Survival" },
    { id: "hollow-knight", name: "Hollow Knight", genre: "Metroidvania" },
    { id: "valorant", name: "VALORANT", genre: "Tactical FPS" },
    { id: "league-of-legends", name: "League of Legends", genre: "MOBA" },
    { id: "castle-crashers", name: "Castle Crashers", genre: "Beat 'em up" },
    { id: "half-life", name: "Half-Life", genre: "FPS Classic" },
    { id: "terraria", name: "Terraria", genre: "2D Sandbox" },
    { id: "cuphead", name: "Cuphead", genre: "Run & Gun" },
    { id: "counter-strike", name: "Counter Strike 1.6", genre: "FPS Classic" },
    { id: "roblox", name: "Roblox Player", genre: "Social Platform" },
    { id: "minecraft", name: "Minecraft", genre: "Sandbox" },
    { id: "call-of-duty-mobile", name: "Call of Duty Mobile", genre: "Mobile FPS" },
    { id: "call-of-duty-warzone", name: "Call of Duty Warzone", genre: "Battle Royale" },
    { id: "deathmatch-classic", name: "Deathmatch Classic", genre: "FPS Retro" },
    { id: "team-fortress", name: "Team Fortress Classic", genre: "Team FPS" },
    { id: "free-fire", name: "Free Fire", genre: "Battle Royale" },
    { id: "red-dead-redemption", name: "Red Dead Redemption", genre: "Action/Adventure" },
    { id: "broforce", name: "Broforce", genre: "Action Platformer" },
  ]

  const [gameIcons, setGameIcons] = useState<{ [key: string]: string }>({})
  const [socialIcons, setSocialIcons] = useState<{ [key: string]: string }>({})
  const [backgroundsState, setBackgroundsState] = useState({
    general: { url: "", type: "image" as "image" | "video" },
    banner: { url: "", type: "image" as "image" | "video" },
    contact: { url: "", type: "image" as "image" | "video" },
  })
  // Agregar estos estados después de los otros useState
  const [showGameRequestForm, setShowGameRequestForm] = useState(false)
  const [showTournamentForm, setShowTournamentForm] = useState(false)

  const handleIconUpdate = (gameId: string, iconUrl: string) => {
    setGameIcons((prev) => ({
      ...prev,
      [gameId]: iconUrl,
    }))
  }

  const handleBackgroundUpdate = (backgroundUrl: string, type: "image" | "video", backgroundType: string) => {
    setBackgroundsState((prev) => ({
      ...prev,
      [backgroundType]: { url: backgroundUrl, type },
    }))
  }

  const handleSocialIconUpdate = (socialId: string, iconUrl: string) => {
    setSocialIcons((prev) => ({
      ...prev,
      [socialId]: iconUrl,
    }))
  }

  useEffect(() => {
    // Función para cargar fondos desde localStorage
    const loadBackgrounds = () => {
      const backgrounds = {
        general: {
          url: localStorage.getItem("customBackground_general") || "",
          type: (localStorage.getItem("backgroundType_general") as "image" | "video") || "image",
        },
        banner: {
          url: localStorage.getItem("customBackground_banner") || "",
          type: (localStorage.getItem("backgroundType_banner") as "image" | "video") || "image",
        },
        contact: {
          url: localStorage.getItem("customBackground_contact") || "",
          type: (localStorage.getItem("backgroundType_contact") as "image" | "video") || "image",
        },
      }
      setBackgroundsState(backgrounds)
    }

    loadBackgrounds()

    // Escuchar eventos de actualización
    const handleBackgroundUpdate = (event: CustomEvent) => {
      loadBackgrounds()
    }

    const handleSocialIconUpdate = () => {
      const savedSocialIcons = JSON.parse(localStorage.getItem("socialIcons") || "{}")
      setSocialIcons(savedSocialIcons)
    }

    const handleGameIconUpdate = () => {
      const savedGameIcons = JSON.parse(localStorage.getItem("gameIcons") || "{}")
      setGameIcons(savedGameIcons)
    }

    window.addEventListener("backgroundUpdate", handleBackgroundUpdate as EventListener)
    window.addEventListener("socialIconUpdate", handleSocialIconUpdate)
    window.addEventListener("gameIconUpdate", handleGameIconUpdate)

    return () => {
      window.removeEventListener("backgroundUpdate", handleBackgroundUpdate as EventListener)
      window.removeEventListener("socialIconUpdate", handleSocialIconUpdate)
      window.removeEventListener("gameIconUpdate", handleGameIconUpdate)
    }
  }, [])

  useEffect(() => {
    // Escuchar actualizaciones de juegos personalizados
    const handleGamesUpdate = (event: CustomEvent) => {
      const customGames = event.detail
      // Aquí podrías actualizar el estado de juegos si fuera necesario
      console.log("Juegos actualizados:", customGames)
    }

    // Escuchar actualizaciones de redes sociales personalizadas
    const handleSocialNetworksUpdate = (event: CustomEvent) => {
      const customSocials = event.detail
      console.log("Redes sociales actualizadas:", customSocials)
    }

    window.addEventListener("gamesUpdate", handleGamesUpdate as EventListener)
    window.addEventListener("socialNetworksUpdate", handleSocialNetworksUpdate as EventListener)

    return () => {
      window.removeEventListener("gamesUpdate", handleGamesUpdate as EventListener)
      window.removeEventListener("socialNetworksUpdate", handleSocialNetworksUpdate as EventListener)
    }
  }, [])

  const getBackgroundImage = (type: "banner" | "contact" | "general") => {
    // Primero intentar obtener de customBackgrounds prop
    if (customBackgrounds?.[type]?.url) {
      return customBackgrounds[type].url
    }
    // Luego intentar obtener de backgroundsState
    if (backgroundsState[type]?.url) {
      return backgroundsState[type].url
    }
    // Fallback al fondo por defecto solo para banner
    if (type === "banner") {
      return "/images/viltrum-banner.jpg"
    }
    return ""
  }

  const getBackgroundType = (type: "banner" | "contact" | "general") => {
    if (backgroundsState[type]?.type) {
      return backgroundsState[type].type
    }
    if (customBackgrounds?.[type]?.type) {
      return customBackgrounds[type].type
    }
    return "image"
  }

  return (
    <CustomBackground>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        {/* Gaming Background */}
        <GamingBackground />

        {/* Header */}
        <header className="bg-black/30 backdrop-blur-sm border-b border-cyan-400/30 relative z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50">
                  <Image
                    src="/images/viltrum-logo.png"
                    alt="Viltrum Zone Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover filter brightness-110 contrast-110"
                    style={{ imageRendering: "crisp-edges" }}
                    quality={100}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                    Viltrum Zone
                  </h1>
                  <p className="text-xs text-yellow-400 font-semibold">La élite del gaming</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-cyan-300 hover:text-cyan-400 transition-colors font-medium cursor-pointer"
                >
                  Servicios
                </button>
                <button
                  onClick={() => document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-cyan-300 hover:text-cyan-400 transition-colors font-medium cursor-pointer"
                >
                  Precios
                </button>
                <button
                  onClick={() => document.getElementById("torneos")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-cyan-300 hover:text-cyan-400 transition-colors font-medium cursor-pointer"
                >
                  Torneos
                </button>
                <button
                  onClick={() => document.getElementById("juegos")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-cyan-300 hover:text-cyan-400 transition-colors font-medium cursor-pointer"
                >
                  Juegos
                </button>
                <button
                  onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-cyan-300 hover:text-cyan-400 transition-colors font-medium cursor-pointer"
                >
                  Contacto
                </button>
              </nav>
              {/* Menú móvil */}
              <div className="md:hidden">
                <details className="relative">
                  <summary className="text-cyan-300 cursor-pointer list-none">
                    <div className="flex items-center">
                      <span>Menú</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="absolute top-full right-0 mt-2 bg-black/90 border border-cyan-400/50 rounded-lg p-4 space-y-2 min-w-[150px] z-50">
                    <button
                      onClick={() => {
                        document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
                        // Cerrar el menú
                        const details = document.querySelector("details")
                        if (details) details.removeAttribute("open")
                      }}
                      className="block w-full text-left text-cyan-300 hover:text-cyan-400 transition-colors font-medium"
                    >
                      Servicios
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })
                        const details = document.querySelector("details")
                        if (details) details.removeAttribute("open")
                      }}
                      className="block w-full text-left text-cyan-300 hover:text-cyan-400 transition-colors font-medium"
                    >
                      Precios
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("torneos")?.scrollIntoView({ behavior: "smooth" })
                        const details = document.querySelector("details")
                        if (details) details.removeAttribute("open")
                      }}
                      className="block w-full text-left text-cyan-300 hover:text-cyan-400 transition-colors font-medium"
                    >
                      Torneos
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("juegos")?.scrollIntoView({ behavior: "smooth" })
                        const details = document.querySelector("details")
                        if (details) details.removeAttribute("open")
                      }}
                      className="block w-full text-left text-cyan-300 hover:text-cyan-400 transition-colors font-medium"
                    >
                      Juegos
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                        const details = document.querySelector("details")
                        if (details) details.removeAttribute("open")
                      }}
                      className="block w-full text-left text-cyan-300 hover:text-cyan-400 transition-colors font-medium"
                    >
                      Contacto
                    </button>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Solo fondo banner */}
        <section className="py-20 px-4 relative overflow-hidden z-10">
          <div className="absolute inset-0 opacity-40">
            {(() => {
              const bannerBg = getBackgroundImage("banner")
              const bannerType = getBackgroundType("banner")
              return bannerType === "video" ? (
                <video src={bannerBg} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              ) : (
                <Image src={bannerBg || "/placeholder.svg"} alt="Viltrum Zone Banner" fill className="object-cover" />
              )
            })()}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/60"></div>
          </div>
          <div className="container mx-auto text-center relative z-10">
            <Badge className="mb-4 bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-lg shadow-pink-500/25">
              ¡Abierto 24/7!
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 drop-shadow-2xl">
                Viltrum Zone
              </span>
            </h2>
            <p className="text-xl text-cyan-100 mb-4 max-w-3xl mx-auto leading-relaxed">
              <span className="text-yellow-400 font-bold">La élite del gaming ⚡</span>
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Un espacio diseñado para jugadores que buscan máximo rendimiento y una atmósfera alucinante. PCs de alta
              gama, un ambiente cargado de energía competitiva y comodidad para que cada partida se disfrute al máximo.{" "}
              <span className="text-pink-400 font-semibold">Aquí no solo juegas, te sumerges en la experiencia.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-cyan-500/25 border border-cyan-400/50"
                onClick={() => document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Reservar Estación
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 bg-transparent font-bold shadow-lg shadow-yellow-400/25"
                onClick={() => document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver Precios
              </Button>
            </div>
          </div>
        </section>

        {/* Secciones con fondo general - Desde Features hasta Reservation */}
        <div className="relative">
          {/* Fondo general personalizado */}
          {backgroundsState.general.url && (
            <div className="absolute inset-0 z-0">
              {backgroundsState.general.type === "video" ? (
                <video
                  src={backgroundsState.general.url}
                  className="w-full h-full object-cover opacity-30"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
                  style={{ backgroundImage: `url(${backgroundsState.general.url})` }}
                />
              )}
              {/* Overlay para mantener legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80" />
            </div>
          )}

          {/* Features */}
          <section className="py-16 px-4 relative z-10">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-4 gap-6 mb-16">
                <Card className="bg-black/60 border-cyan-400/50 text-center shadow-lg shadow-cyan-400/25 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <Monitor className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">PCs Gaming</h3>
                    <p className="text-gray-300 text-sm">Alta gama y rendimiento</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/60 border-pink-400/50 text-center shadow-lg shadow-pink-400/25 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <Wifi className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Internet Ultra</h3>
                    <p className="text-gray-300 text-sm">Conexión de élite</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/60 border-yellow-400/50 text-center shadow-lg shadow-yellow-400/25 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">24/7</h3>
                    <p className="text-gray-300 text-sm">Siempre abierto</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/60 border-orange-400/50 text-center shadow-lg shadow-orange-400/25 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Torneos</h3>
                    <p className="text-gray-300 text-sm">Competencia épica</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="servicios" className="py-16 px-4 bg-black/30 relative z-10">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  Nuestros Servicios
                </span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-cyan-900/50 to-black/80 border-cyan-400/50 shadow-lg shadow-cyan-400/25 backdrop-blur-sm">
                  <CardHeader>
                    <Gamepad2 className="w-12 h-12 text-cyan-400 mb-4" />
                    <CardTitle className="text-white">Gaming Zone</CardTitle>
                    <CardDescription className="text-cyan-100">
                      PCs gaming de última generación con máximo rendimiento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Steam, Epic Games, Battle.net</li>
                      <li>• Fortnite, Valorant, LOL, CS2</li>
                      <li>• Periféricos gaming premium</li>
                      <li>• Ambiente competitivo</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-pink-900/50 to-black/80 border-pink-400/50 shadow-lg shadow-pink-400/25 backdrop-blur-sm">
                  <CardHeader>
                    <Monitor className="w-12 h-12 text-pink-400 mb-4" />
                    <CardTitle className="text-white">Internet & Trabajo</CardTitle>
                    <CardDescription className="text-pink-100">
                      Navegación, trabajo y estudios con comodidad total
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Office 365 completo</li>
                      <li>• Zoom, Teams, Google Meet</li>
                      <li>• Cámaras web HD</li>
                      <li>• Ambiente tranquilo</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-900/50 to-black/80 border-yellow-400/50 shadow-lg shadow-yellow-400/25 backdrop-blur-sm">
                  <CardHeader>
                    <Printer className="w-12 h-12 text-yellow-400 mb-4" />
                    <CardTitle className="text-white">Servicios Digitales</CardTitle>
                    <CardDescription className="text-yellow-100">
                      Impresión, escaneo y servicios completos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Impresión B/N y color</li>
                      <li>• Escaneo de documentos</li>
                      <li>• Copias y enmicado</li>
                      <li>• Servicios rápidos</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Game Catalog */}
          <section id="juegos" className="py-16 px-4 relative z-10">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  Catálogo de Juegos
                </span>
              </h2>
              <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                Más de {games.length + JSON.parse(localStorage.getItem("customGames") || "[]").length} juegos instalados
                y listos para jugar. Desde battle royales hasta clásicos retro.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {/* Juegos predeterminados */}
                {games.map((game, index) => (
                  <div
                    key={index}
                    className="bg-black/60 border border-cyan-400/50 rounded-lg p-4 text-center hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/50 hover:scale-105 backdrop-blur-sm"
                  >
                    <div className="mb-2 flex justify-center">
                      <GameIcon game={game.id} name={game.name} />
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-1">{game.name}</h4>
                    <p className="text-gray-400 text-xs">{game.genre}</p>
                  </div>
                ))}

                {/* Juegos personalizados */}
                {(() => {
                  const customGames = JSON.parse(localStorage.getItem("customGames") || "[]")
                  return customGames.map((game: any, index: number) => (
                    <div
                      key={`custom-${index}`}
                      className="bg-black/60 border border-purple-400/50 rounded-lg p-4 text-center hover:border-purple-400 transition-all duration-300 shadow-lg shadow-purple-400/25 hover:shadow-purple-400/50 hover:scale-105 backdrop-blur-sm"
                    >
                      <div className="mb-2 flex justify-center">
                        <GameIcon game={game.id} name={game.name} />
                      </div>
                      <h4 className="text-white text-sm font-semibold mb-1">{game.name}</h4>
                      <p className="text-gray-400 text-xs">{game.genre}</p>
                      <div className="mt-1">
                        <span className="text-purple-400 text-xs font-medium">Personalizado</span>
                      </div>
                    </div>
                  ))
                })()}
              </div>
              <div className="text-center mt-8">
                <p className="text-gray-400 mb-4">¿No encuentras tu juego favorito?</p>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 font-bold"
                  onClick={() => setShowGameRequestForm(true)}
                >
                  Solicitar Instalación
                </Button>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="precios" className="py-16 px-4 relative z-10">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Precios Competitivos
                </span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="bg-black/60 border-cyan-400/50 shadow-lg shadow-cyan-400/25 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-white">Por Hora</CardTitle>
                    <div className="text-4xl font-bold text-cyan-400">
                      $1.50<span className="text-lg text-gray-300">/hora</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Acceso completo a PCs</li>
                      <li>• Internet ultra rápido</li>
                      <li>• Todos los juegos</li>
                      <li>• Periféricos incluidos</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-pink-400/50 relative shadow-lg shadow-pink-400/25 backdrop-blur-sm">
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-pink-500 shadow-lg shadow-pink-500/50">
                    ¡Combo Popular!
                  </Badge>
                  <CardHeader className="text-center">
                    <CardTitle className="text-white">Combo 2 Horas</CardTitle>
                    <div className="text-4xl font-bold text-pink-400">
                      $2.50<span className="text-lg text-gray-300">/2hrs</span>
                    </div>
                    <p className="text-sm text-yellow-400">¡Ahorra $0.50!</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• 2 horas continuas</li>
                      <li>• Descuento especial</li>
                      <li>• Acceso premium</li>
                      <li>• Bebida incluida</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-black/60 border-yellow-400/50 shadow-lg shadow-yellow-400/25 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-white">Servicios Extra</CardTitle>
                    <div className="text-2xl font-bold text-yellow-400">Desde $0.50</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Impresión B/N: $0.50</li>
                      <li>• Impresión color: $1.00</li>
                      <li>• Escaneo: $0.25</li>
                      <li>• Copias: $0.10</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Tournaments */}
          <section id="torneos" className="py-16 px-4 bg-black/30 relative z-10">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Torneos Épicos
                </span>
              </h2>
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-400/50 shadow-lg shadow-orange-400/25 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-2xl">Competencias Semanales</CardTitle>
                    <CardDescription className="text-orange-100 text-lg">
                      Demuestra tu habilidad y gana premios increíbles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-black/40 p-4 rounded-lg border border-yellow-400/30">
                        <h4 className="text-yellow-400 font-bold text-xl mb-2">Premio al Ganador</h4>
                        <p className="text-3xl font-bold text-white">$10.00</p>
                        <p className="text-gray-300 text-sm">En efectivo</p>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-cyan-400/30">
                        <h4 className="text-cyan-400 font-bold text-xl mb-2">Juegos</h4>
                        <p className="text-white">Fortnite, Valorant</p>
                        <p className="text-white">LOL, CS2</p>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-pink-400/30">
                        <h4 className="text-pink-400 font-bold text-xl mb-2">Horarios</h4>
                        <p className="text-white">Sábados 7:00 PM</p>
                        <p className="text-gray-300 text-sm">Inscripción gratuita</p>
                      </div>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg shadow-orange-500/25"
                      onClick={() => setShowTournamentForm(true)}
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      Inscribirse al Torneo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Reservation Section */}
          <section id="reserva" className="py-16 px-4 relative z-10">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  Reserva tu Estación
                </span>
              </h2>
              <ReservationForm />
            </div>
          </section>
        </div>

        {/* Contact - Sin fondo general, solo fondo específico de contacto */}
        <section id="contacto" className="py-16 px-4 bg-black/30 relative z-10">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
                Contacto y Redes
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="bg-black/60 border-cyan-400/50 shadow-lg shadow-cyan-400/25 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                  {(() => {
                    const contactBg = getBackgroundImage("contact")
                    const contactType = getBackgroundType("contact")
                    return contactType === "video" ? (
                      <video src={contactBg} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${contactBg})` }}
                      />
                    )
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-cyan-900/40 to-black/60"></div>
                </div>
                <div className="relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="w-6 h-6 mr-2 text-cyan-400" />
                      Información de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-5 h-5 mr-3 text-green-400" />
                      <a href="tel:+584121156707" className="text-green-400 hover:text-green-300 transition-colors">
                        +58 412-115-6707
                      </a>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-5 h-5 mr-3 text-pink-400" />
                      <a
                        href="mailto:viltrum.zonex@gmail.com"
                        className="text-pink-400 hover:text-pink-300 transition-colors"
                      >
                        viltrum.zonex@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <ExternalLink className="w-5 h-5 mr-3 text-yellow-400" />
                      <a
                        href="https://beacons.ai/viltrum.zone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        🛜 beacons.ai/viltrum.zone
                      </a>
                    </div>
                    <div className="flex items-start text-gray-300">
                      <MapPin className="w-5 h-5 mr-3 text-cyan-400 mt-1" />
                      <span>
                        Ubicación próximamente
                        <br />
                        <span className="text-yellow-400">¡Estamos preparando algo épico!</span>
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-5 h-5 mr-3 text-orange-400" />
                      <span>Abierto 24 horas, 7 días a la semana</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
              <div className="space-y-6">
                <ContactForm />
                {/* Social Media Links */}
                <Card className="bg-black/60 border-purple-400/50 shadow-lg shadow-purple-400/25 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Síguenos en Redes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {/* Redes sociales predeterminadas */}
                      <a
                        href="https://www.tiktok.com/@viltrum.zone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-black/40 rounded-lg border border-pink-400/30 hover:border-pink-400 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                          {socialIcons.tiktok ? (
                            <img
                              src={socialIcons.tiktok || "/placeholder.svg"}
                              alt="TikTok"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">TT</span>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">TikTok</p>
                          <p className="text-gray-400 text-sm">@viltrum.zone</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-pink-400 ml-auto group-hover:text-pink-300" />
                      </a>

                      <a
                        href="https://www.instagram.com/viltrum.zone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-black/40 rounded-lg border border-purple-400/30 hover:border-purple-400 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                          {socialIcons.instagram ? (
                            <img
                              src={socialIcons.instagram || "/placeholder.svg"}
                              alt="Instagram"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">IG</span>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">Instagram</p>
                          <p className="text-gray-400 text-sm">@viltrum.zone</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-purple-400 ml-auto group-hover:text-purple-300" />
                      </a>

                      <a
                        href="https://chat.whatsapp.com/JklcE8QAg7E68PJcciAiGa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-black/40 rounded-lg border border-green-400/30 hover:border-green-400 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                          {socialIcons.whatsapp ? (
                            <img
                              src={socialIcons.whatsapp || "/placeholder.svg"}
                              alt="WhatsApp"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <MessageCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">Grupo WhatsApp</p>
                          <p className="text-gray-400 text-sm">Únete a la comunidad</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-green-400 ml-auto group-hover:text-green-300" />
                      </a>

                      {/* Redes sociales personalizadas */}
                      {(() => {
                        const customSocials = JSON.parse(localStorage.getItem("customSocialNetworks") || "[]")
                        return customSocials.map((social: any, index: number) => (
                          <a
                            key={`custom-social-${index}`}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center p-3 bg-black/40 rounded-lg border border-${social.color}-400/30 hover:border-${social.color}-400 transition-colors group`}
                          >
                            <div
                              className={`w-10 h-10 bg-gradient-to-r from-${social.color}-500 to-${social.color}-600 rounded-lg flex items-center justify-center mr-3 overflow-hidden`}
                            >
                              <span className="text-white font-bold text-sm">{social.icon}</span>
                            </div>
                            <div>
                              <p className="text-white font-semibold">{social.name}</p>
                              <p className="text-gray-400 text-sm">Personalizado</p>
                            </div>
                            <ExternalLink
                              className={`w-4 h-4 text-${social.color}-400 ml-auto group-hover:text-${social.color}-300`}
                            />
                          </a>
                        ))
                      })()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/60 border-t border-cyan-400/30 py-8 px-4 relative z-10">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50">
                <Image
                  src="/images/viltrum-logo.png"
                  alt="Viltrum Zone Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover filter brightness-110 contrast-110"
                  style={{ imageRendering: "crisp-edges" }}
                  quality={100}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  Viltrum Zone
                </h3>
                <p className="text-xs text-yellow-400">La élite del gaming</p>
              </div>
            </div>
            <p className="text-gray-400 mb-2">🎮 Donde los gamers se convierten en leyendas ⚡</p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="tel:+584121156707" className="text-green-400 hover:text-green-300 transition-colors">
                📞 +58 412-115-6707
              </a>
              <a href="mailto:viltrum.zonex@gmail.com" className="text-pink-400 hover:text-pink-300 transition-colors">
                📧 Email
              </a>
              <a
                href="https://www.tiktok.com/@viltrum.zone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                📱 TikTok
              </a>
              <a
                href="https://www.instagram.com/viltrum.zone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                📷 Instagram
              </a>
            </div>
            <p className="text-cyan-400 mb-4">
              <a
                href="https://beacons.ai/viltrum.zone"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                🛜 beacons.ai/viltrum.zone
              </a>
            </p>
            <p className="text-gray-500 text-sm">© 2024 Viltrum Zone. Todos los derechos reservados.</p>
          </div>
        </footer>

        {/* Agregar los componentes de formularios antes del cierre del div principal (antes de </CustomBackground>): */}
        <GameRequestForm isOpen={showGameRequestForm} onClose={() => setShowGameRequestForm(false)} />

        <TournamentRegistrationForm isOpen={showTournamentForm} onClose={() => setShowTournamentForm(false)} />

        <AdminPanel
          games={games}
          onIconUpdate={handleIconUpdate}
          onBackgroundUpdate={handleBackgroundUpdate}
          onSocialIconUpdate={handleSocialIconUpdate}
        />
      </div>
    </CustomBackground>
  )
}
