"use client"

import { useEffect, useState } from "react"

export function GamingBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-8 z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/15 to-pink-900/10"></div>

      {/* Matrix-like effect - más suave */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Circuit-like lines - más suaves */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q150,50 300,100 T600,100 L600,200 Q450,150 300,200 T0,200 Z"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
        />
        <path
          d="M100,0 Q200,100 300,50 T500,100 L500,300 Q400,200 300,250 T100,300 Z"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
