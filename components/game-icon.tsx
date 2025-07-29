"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface GameIconProps {
  game: string
  name: string
  className?: string
}

export function GameIcon({ game, name, className = "w-12 h-12" }: GameIconProps) {
  const [iconUrl, setIconUrl] = useState<string>("")

  useEffect(() => {
    // Función para cargar iconos
    const loadIcons = () => {
      const savedIcons = JSON.parse(localStorage.getItem("gameIcons") || "{}")
      if (savedIcons[game]) {
        setIconUrl(savedIcons[game])
      }
    }

    loadIcons()

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      loadIcons()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("gameIconUpdate", loadIcons)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("gameIconUpdate", loadIcons)
    }
  }, [game])

  // Si hay un icono personalizado, usarlo
  if (iconUrl) {
    return (
      <div className={`${className} rounded-lg overflow-hidden relative`}>
        <img src={iconUrl || "/placeholder.svg"} alt={`${name} icon`} className="w-full h-full object-cover" />
      </div>
    )
  }

  // Fallback: intentar cargar desde la carpeta de iconos
  const iconPath = `/images/game-icons/${game}.png`

  return (
    <div className={`${className} rounded-lg overflow-hidden relative`}>
      <Image
        src={iconPath || "/placeholder.svg"}
        alt={`${name} icon`}
        width={48}
        height={48}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Si la imagen no existe, mostrar placeholder
          const target = e.target as HTMLImageElement
          target.src = `/placeholder.svg?height=48&width=48&text=${name.charAt(0)}`
        }}
      />
    </div>
  )
}
