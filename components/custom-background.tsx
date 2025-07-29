"use client"

import React from "react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

interface CustomBackgroundProps {
  children: ReactNode
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
  positionX: number
  positionY: number
  useCustomPosition: boolean
}

export function CustomBackground({ children }: CustomBackgroundProps) {
  const [customBackgrounds, setCustomBackgrounds] = useState<{
    general: { url: string; type: "image" | "video" }
    banner: { url: string; type: "image" | "video" }
    contact: { url: string; type: "image" | "video" }
  }>({
    general: { url: "", type: "image" },
    banner: { url: "", type: "image" },
    contact: { url: "", type: "image" },
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
    positionX: 50,
    positionY: 50,
    useCustomPosition: false,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
      setCustomBackgrounds(backgrounds)
    }

    const loadBackgroundSettings = () => {
      const savedSettings = localStorage.getItem("backgroundSettings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        // Asegurar que las nuevas propiedades existan
        setBackgroundSettings({
          ...settings,
          positionX: settings.positionX ?? 50,
          positionY: settings.positionY ?? 50,
          useCustomPosition: settings.useCustomPosition ?? false,
        })
      }
    }

    loadBackgrounds()
    loadBackgroundSettings()

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      loadBackgrounds()
      loadBackgroundSettings()
    }

    // También escuchar eventos personalizados para cambios en la misma pestaña
    const handleBackgroundUpdate = (event: CustomEvent) => {
      loadBackgrounds()
      if (event.detail?.settings) {
        setBackgroundSettings({
          ...event.detail.settings,
          positionX: event.detail.settings.positionX ?? 50,
          positionY: event.detail.settings.positionY ?? 50,
          useCustomPosition: event.detail.settings.useCustomPosition ?? false,
        })
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("backgroundUpdate", handleBackgroundUpdate as EventListener)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("backgroundUpdate", handleBackgroundUpdate as EventListener)
    }
  }, [])

  const handleBackgroundUpdate = (backgroundUrl: string, type: "image" | "video", backgroundType: string) => {
    setCustomBackgrounds((prev) => ({
      ...prev,
      [backgroundType]: { url: backgroundUrl, type },
    }))
    // Disparar evento personalizado para notificar el cambio
    window.dispatchEvent(
      new CustomEvent("backgroundUpdate", {
        detail: { backgroundType, url: backgroundUrl, type },
      }),
    )
  }

  // Agregar después de la función handleBackgroundUpdate
  const getCurrentBackgrounds = () => customBackgrounds

  if (!mounted) return <div>{children}</div>

  // Crear estilos dinámicos para el fondo general
  const getBackgroundPosition = () => {
    if (backgroundSettings.useCustomPosition) {
      return `${backgroundSettings.positionX}% ${backgroundSettings.positionY}%`
    }
    return backgroundSettings.position
  }

  const generalBackgroundStyle = customBackgrounds.general.url
    ? {
        backgroundImage:
          customBackgrounds.general.type === "image" ? `url(${customBackgrounds.general.url})` : undefined,
        backgroundSize: backgroundSettings.size,
        backgroundPosition: getBackgroundPosition(),
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: backgroundSettings.opacity / 100,
        filter: `blur(${backgroundSettings.blur}px) brightness(${backgroundSettings.brightness}%) contrast(${backgroundSettings.contrast}%)`,
      }
    : {}

  const overlayStyle = {
    backgroundColor: backgroundSettings.overlayColor,
    opacity: backgroundSettings.overlayOpacity / 100,
  }

  return (
    <div className="relative min-h-screen">
      {/* Fondo general personalizado - Mejorado */}
      {customBackgrounds.general.url && (
        <div className="fixed inset-0 z-0">
          {customBackgrounds.general.type === "video" ? (
            <video
              src={customBackgrounds.general.url}
              className="w-full h-full object-cover"
              style={{
                opacity: backgroundSettings.opacity / 100,
                filter: `blur(${backgroundSettings.blur}px) brightness(${backgroundSettings.brightness}%) contrast(${backgroundSettings.contrast}%)`,
                objectPosition: getBackgroundPosition(),
              }}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed" style={generalBackgroundStyle} />
          )}
          {/* Overlay mejorado */}
          <div className="absolute inset-0" style={overlayStyle} />
        </div>
      )}

      {/* Contenido con fondos específicos */}
      <div className="relative z-10">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              customBackgrounds,
              getCurrentBackgrounds,
              backgroundSettings,
            } as any)
          }
          return child
        })}
      </div>
    </div>
  )
}
