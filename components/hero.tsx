"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [backgroundImage, setBackgroundImage] = useState<string>("")

  useEffect(() => {
    // Cargar imagen de fondo desde localStorage o API
    const savedBg = localStorage.getItem("hero-background")
    if (savedBg) {
      setBackgroundImage(savedBg)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Vittrium Zone</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Bienvenido a la zona de innovación y tecnología</p>
        <Button size="lg" className="bg-white text-black hover:bg-gray-100">
          Explorar Servicios
        </Button>
      </div>
    </section>
  )
}
