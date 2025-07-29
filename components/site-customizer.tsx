"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  X,
  Save,
  Type,
  Palette,
  DollarSign,
  Plus,
  Trash2,
  FileText,
  Gamepad2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Lock,
  AlertTriangle,
  Bell,
} from "lucide-react"

interface SiteCustomizerProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (data: any) => void
}

interface CustomText {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  siteSlogan: string
  aboutTitle: string
  aboutDescription: string
  servicesTitle: string
  gamesTitle: string
  gamesDescription: string
  pricingTitle: string
  tournamentsTitle: string
  tournamentsDescription: string
  contactTitle: string
  footerText: string
}

interface CustomColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

interface CustomFonts {
  heading: string
  body: string
  size: string
}

interface PriceItem {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}

interface ServiceItem {
  id: string
  name: string
  description: string
  icon: string
  features: string[]
  color: string
}

interface ContactInfo {
  phone: string
  email: string
  address: string
  hours: string
  whatsapp: string
  instagram: string
  tiktok: string
  beacons: string
}

interface NotificationSettings {
  email: string
  phone: string
  whatsapp: string
  notifications: {
    reservations: boolean
    tournaments: boolean
    gameRequests: boolean
    contactForms: boolean
    emailService: "resend" | "nodemailer" | "emailjs" // resend, nodemailer, emailjs
  }
  emailConfig: {
    resendApiKey: string
    smtpHost: string
    smtpPort: string
    smtpUser: string
    smtpPass: string
    emailjsServiceId: string
    emailjsTemplateId: string
    emailjsPublicKey: string
  }
}

export function SiteCustomizer({ isOpen, onClose, onUpdate }: SiteCustomizerProps) {
  const [activeTab, setActiveTab] = useState("text")
  const [customText, setCustomText] = useState<CustomText>({
    heroTitle: "Viltrum Zone",
    heroSubtitle: "La élite del gaming ⚡",
    heroDescription:
      "Un espacio diseñado para jugadores que buscan máximo rendimiento y una atmósfera alucinante. PCs de alta gama, un ambiente cargado de energía competitiva y comodidad para que cada partida se disfrute al máximo.",
    siteSlogan: "Aquí no solo juegas, te sumerges en la experiencia.",
    aboutTitle: "¿Por qué elegir Viltrum Zone?",
    aboutDescription: "Somos más que un cyber café, somos una comunidad gaming.",
    servicesTitle: "Nuestros Servicios",
    gamesTitle: "Catálogo de Juegos",
    gamesDescription: "Más de 20 juegos instalados y listos para jugar. Desde battle royales hasta clásicos retro.",
    pricingTitle: "Precios Competitivos",
    tournamentsTitle: "Torneos Épicos",
    tournamentsDescription: "Demuestra tu habilidad y gana premios increíbles",
    contactTitle: "Contacto y Redes",
    footerText: "🎮 Donde los gamers se convierten en leyendas ⚡",
  })

  const [customColors, setCustomColors] = useState<CustomColors>({
    primary: "#22d3ee",
    secondary: "#ec4899",
    accent: "#facc15",
    background: "#0f172a",
    text: "#ffffff",
  })

  const [customFonts, setCustomFonts] = useState<CustomFonts>({
    heading: "Inter",
    body: "Inter",
    size: "16",
  })

  const [prices, setPrices] = useState<PriceItem[]>([
    {
      id: "hourly",
      name: "Por Hora",
      price: "$1.50",
      description: "/hora",
      features: ["Acceso completo a PCs", "Internet ultra rápido", "Todos los juegos", "Periféricos incluidos"],
    },
    {
      id: "combo",
      name: "Combo 2 Horas",
      price: "$2.50",
      description: "/2hrs",
      features: ["2 horas continuas", "Descuento especial", "Acceso premium", "Bebida incluida"],
      popular: true,
    },
    {
      id: "services",
      name: "Servicios Extra",
      price: "Desde $0.50",
      description: "",
      features: ["Impresión B/N: $0.50", "Impresión color: $1.00", "Escaneo: $0.25", "Copias: $0.10"],
    },
  ])

  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "gaming",
      name: "Gaming Zone",
      description: "PCs gaming de última generación con máximo rendimiento",
      icon: "gamepad",
      features: [
        "Steam, Epic Games, Battle.net",
        "Fortnite, Valorant, LOL, CS2",
        "Periféricos gaming premium",
        "Ambiente competitivo",
      ],
      color: "cyan",
    },
    {
      id: "work",
      name: "Internet & Trabajo",
      description: "Navegación, trabajo y estudios con comodidad total",
      icon: "monitor",
      features: ["Office 365 completo", "Zoom, Teams, Google Meet", "Cámaras web HD", "Ambiente tranquilo"],
      color: "pink",
    },
    {
      id: "digital",
      name: "Servicios Digitales",
      description: "Impresión, escaneo y servicios completos",
      icon: "printer",
      features: ["Impresión B/N y color", "Escaneo de documentos", "Copias y enmicado", "Servicios rápidos"],
      color: "yellow",
    },
  ])

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+58 412-115-6707",
    email: "viltrum.zonex@gmail.com",
    address: "Ubicación próximamente",
    hours: "Abierto 24 horas, 7 días a la semana",
    whatsapp: "https://chat.whatsapp.com/JklcE8QAg7E68PJcciAiGa",
    instagram: "https://www.instagram.com/viltrum.zone",
    tiktok: "https://www.tiktok.com/@viltrum.zone",
    beacons: "https://beacons.ai/viltrum.zone",
  })

  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "viltrum2024",
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: "viltrum.zonex@gmail.com",
    phone: "+58 412-115-6707",
    whatsapp: "+58 412-115-6707",
    notifications: {
      reservations: true,
      tournaments: true,
      gameRequests: true,
      contactForms: true,
      emailService: "resend", // resend, nodemailer, emailjs
    },
    emailConfig: {
      resendApiKey: "",
      smtpHost: "",
      smtpPort: "587",
      smtpUser: "",
      smtpPass: "",
      emailjsServiceId: "",
      emailjsTemplateId: "",
      emailjsPublicKey: "",
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedText = localStorage.getItem("customText")
    const savedColors = localStorage.getItem("customColors")
    const savedFonts = localStorage.getItem("customFonts")
    const savedPrices = localStorage.getItem("customPrices")
    const savedServices = localStorage.getItem("customServices")
    const savedContact = localStorage.getItem("customContact")
    const savedCredentials = localStorage.getItem("adminCredentials")
    const savedNotifications = localStorage.getItem("notificationSettings")

    if (savedText) setCustomText(JSON.parse(savedText))
    if (savedColors) setCustomColors(JSON.parse(savedColors))
    if (savedFonts) setCustomFonts(JSON.parse(savedFonts))
    if (savedPrices) setPrices(JSON.parse(savedPrices))
    if (savedServices) setServices(JSON.parse(savedServices))
    if (savedContact) setContactInfo(JSON.parse(savedContact))
    if (savedCredentials) setAdminCredentials(JSON.parse(savedCredentials))
    if (savedNotifications) setNotificationSettings(JSON.parse(savedNotifications))
  }, [])

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Guardar en localStorage
      localStorage.setItem("customText", JSON.stringify(customText))
      localStorage.setItem("customColors", JSON.stringify(customColors))
      localStorage.setItem("customFonts", JSON.stringify(customFonts))
      localStorage.setItem("customPrices", JSON.stringify(prices))
      localStorage.setItem("customServices", JSON.stringify(services))
      localStorage.setItem("customContact", JSON.stringify(contactInfo))
      localStorage.setItem("adminCredentials", JSON.stringify(adminCredentials))
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))

      // Notificar al componente padre
      onUpdate({
        text: customText,
        colors: customColors,
        fonts: customFonts,
        prices,
        services,
        contact: contactInfo,
      })

      // Disparar evento para actualizar la página
      window.dispatchEvent(new CustomEvent("siteCustomizationUpdate"))

      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("✅ Configuración guardada correctamente")
    } catch (error) {
      alert("❌ Error al guardar la configuración")
    } finally {
      setIsSaving(false)
    }
  }

  const addPrice = () => {
    const newPrice: PriceItem = {
      id: `price-${Date.now()}`,
      name: "Nuevo Precio",
      price: "$0.00",
      description: "",
      features: ["Nueva característica"],
    }
    setPrices([...prices, newPrice])
  }

  const removePrice = (id: string) => {
    setPrices(prices.filter((p) => p.id !== id))
  }

  const updatePrice = (id: string, field: keyof PriceItem, value: any) => {
    setPrices(prices.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addService = () => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      name: "Nuevo Servicio",
      description: "Descripción del servicio",
      icon: "gamepad",
      features: ["Nueva característica"],
      color: "cyan",
    }
    setServices([...services, newService])
  }

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const updateService = (id: string, field: keyof ServiceItem, value: any) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-black/90 border-purple-400/50 shadow-lg shadow-purple-400/25 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Settings className="w-5 h-5 mr-2 text-purple-400" />
              Personalizar Sitio Web
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-8 bg-black/40">
              <TabsTrigger value="text" className="text-white">
                <FileText className="w-4 h-4 mr-1" />
                Textos
              </TabsTrigger>
              <TabsTrigger value="colors" className="text-white">
                <Palette className="w-4 h-4 mr-1" />
                Colores
              </TabsTrigger>
              <TabsTrigger value="fonts" className="text-white">
                <Type className="w-4 h-4 mr-1" />
                Tipografía
              </TabsTrigger>
              <TabsTrigger value="prices" className="text-white">
                <DollarSign className="w-4 h-4 mr-1" />
                Precios
              </TabsTrigger>
              <TabsTrigger value="services" className="text-white">
                <Gamepad2 className="w-4 h-4 mr-1" />
                Servicios
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-white">
                <Phone className="w-4 h-4 mr-1" />
                Contacto
              </TabsTrigger>
              <TabsTrigger value="security" className="text-white">
                <Lock className="w-4 h-4 mr-1" />
                Seguridad
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-white">
                <Bell className="w-4 h-4 mr-1" />
                Notificaciones
              </TabsTrigger>
            </TabsList>

            {/* Tab de Textos */}
            <TabsContent value="text" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Título Principal</Label>
                  <Input
                    value={customText.heroTitle}
                    onChange={(e) => setCustomText({ ...customText, heroTitle: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Subtítulo</Label>
                  <Input
                    value={customText.heroSubtitle}
                    onChange={(e) => setCustomText({ ...customText, heroSubtitle: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-300">Descripción Principal</Label>
                  <Textarea
                    value={customText.heroDescription}
                    onChange={(e) => setCustomText({ ...customText, heroDescription: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white min-h-[80px]"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-300">Slogan del Sitio</Label>
                  <Input
                    value={customText.siteSlogan}
                    onChange={(e) => setCustomText({ ...customText, siteSlogan: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Título de Servicios</Label>
                  <Input
                    value={customText.servicesTitle}
                    onChange={(e) => setCustomText({ ...customText, servicesTitle: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Título de Juegos</Label>
                  <Input
                    value={customText.gamesTitle}
                    onChange={(e) => setCustomText({ ...customText, gamesTitle: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-300">Descripción de Juegos</Label>
                  <Textarea
                    value={customText.gamesDescription}
                    onChange={(e) => setCustomText({ ...customText, gamesDescription: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Título de Precios</Label>
                  <Input
                    value={customText.pricingTitle}
                    onChange={(e) => setCustomText({ ...customText, pricingTitle: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Título de Torneos</Label>
                  <Input
                    value={customText.tournamentsTitle}
                    onChange={(e) => setCustomText({ ...customText, tournamentsTitle: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-300">Texto del Footer</Label>
                  <Input
                    value={customText.footerText}
                    onChange={(e) => setCustomText({ ...customText, footerText: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab de Colores */}
            <TabsContent value="colors" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300">Color Primario (Cyan)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                      className="w-16 h-10 p-1 bg-black/20 border-gray-600"
                    />
                    <Input
                      value={customColors.primary}
                      onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white"
                      placeholder="#22d3ee"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Color Secundario (Pink)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
                      className="w-16 h-10 p-1 bg-black/20 border-gray-600"
                    />
                    <Input
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white"
                      placeholder="#ec4899"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Color de Acento (Yellow)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customColors.accent}
                      onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                      className="w-16 h-10 p-1 bg-black/20 border-gray-600"
                    />
                    <Input
                      value={customColors.accent}
                      onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white"
                      placeholder="#facc15"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Fondo</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customColors.background}
                      onChange={(e) => setCustomColors({ ...customColors, background: e.target.value })}
                      className="w-16 h-10 p-1 bg-black/20 border-gray-600"
                    />
                    <Input
                      value={customColors.background}
                      onChange={(e) => setCustomColors({ ...customColors, background: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white"
                      placeholder="#0f172a"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Texto</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customColors.text}
                      onChange={(e) => setCustomColors({ ...customColors, text: e.target.value })}
                      className="w-16 h-10 p-1 bg-black/20 border-gray-600"
                    />
                    <Input
                      value={customColors.text}
                      onChange={(e) => setCustomColors({ ...customColors, text: e.target.value })}
                      className="bg-black/20 border-gray-600 text-white"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-black/40 rounded-lg border border-cyan-400/30">
                <h4 className="text-cyan-400 font-semibold mb-3">Vista Previa de Colores</h4>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: customColors.primary }}></div>
                    <span className="text-gray-300 text-sm">Primario</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: customColors.secondary }}></div>
                    <span className="text-gray-300 text-sm">Secundario</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: customColors.accent }}></div>
                    <span className="text-gray-300 text-sm">Acento</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab de Tipografía */}
            <TabsContent value="fonts" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300">Fuente para Títulos</Label>
                  <Select onValueChange={(value) => setCustomFonts({ ...customFonts, heading: value })}>
                    <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                      <SelectValue placeholder={customFonts.heading} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Orbitron">Orbitron (Gaming)</SelectItem>
                      <SelectItem value="Exo 2">Exo 2 (Gaming)</SelectItem>
                      <SelectItem value="Rajdhani">Rajdhani (Gaming)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Fuente para Texto</Label>
                  <Select onValueChange={(value) => setCustomFonts({ ...customFonts, body: value })}>
                    <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                      <SelectValue placeholder={customFonts.body} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Tamaño Base (px)</Label>
                  <Select onValueChange={(value) => setCustomFonts({ ...customFonts, size: value })}>
                    <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                      <SelectValue placeholder={customFonts.size} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">14px</SelectItem>
                      <SelectItem value="16">16px</SelectItem>
                      <SelectItem value="18">18px</SelectItem>
                      <SelectItem value="20">20px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 p-4 bg-black/40 rounded-lg border border-cyan-400/30">
                <h4 className="text-cyan-400 font-semibold mb-3">Vista Previa de Tipografía</h4>
                <div style={{ fontFamily: customFonts.heading, fontSize: "24px" }} className="text-white mb-2">
                  Título Principal - {customFonts.heading}
                </div>
                <div
                  style={{ fontFamily: customFonts.body, fontSize: customFonts.size + "px" }}
                  className="text-gray-300"
                >
                  Texto del cuerpo - {customFonts.body} ({customFonts.size}px)
                </div>
              </div>
            </TabsContent>

            {/* Tab de Precios */}
            <TabsContent value="prices" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Gestionar Precios</h3>
                <Button onClick={addPrice} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Precio
                </Button>
              </div>
              <div className="space-y-4">
                {prices.map((price) => (
                  <Card key={price.id} className="bg-black/40 border-gray-600">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-gray-300">Nombre</Label>
                          <Input
                            value={price.name}
                            onChange={(e) => updatePrice(price.id, "name", e.target.value)}
                            className="bg-black/20 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Precio</Label>
                          <Input
                            value={price.price}
                            onChange={(e) => updatePrice(price.id, "price", e.target.value)}
                            className="bg-black/20 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Descripción</Label>
                          <Input
                            value={price.description}
                            onChange={(e) => updatePrice(price.id, "description", e.target.value)}
                            className="bg-black/20 border-gray-600 text-white"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={price.popular || false}
                              onChange={(e) => updatePrice(price.id, "popular", e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label className="text-gray-300 text-sm">Popular</Label>
                          </div>
                          <Button onClick={() => removePrice(price.id)} variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label className="text-gray-300">Características (una por línea)</Label>
                        <Textarea
                          value={price.features.join("\n")}
                          onChange={(e) =>
                            updatePrice(
                              price.id,
                              "features",
                              e.target.value.split("\n").filter((f) => f.trim()),
                            )
                          }
                          className="bg-black/20 border-gray-600 text-white"
                          placeholder="Característica 1\nCaracterística 2\nCaracterística 3"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab de Servicios */}
            <TabsContent value="services" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Gestionar Servicios</h3>
                <Button onClick={addService} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Servicio
                </Button>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="bg-black/40 border-gray-600">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-gray-300">Nombre del Servicio</Label>
                          <Input
                            value={service.name}
                            onChange={(e) => updateService(service.id, "name", e.target.value)}
                            className="bg-black/20 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Icono</Label>
                          <Select onValueChange={(value) => updateService(service.id, "icon", value)}>
                            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                              <SelectValue placeholder={service.icon} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gamepad">🎮 Gamepad</SelectItem>
                              <SelectItem value="monitor">🖥️ Monitor</SelectItem>
                              <SelectItem value="printer">🖨️ Printer</SelectItem>
                              <SelectItem value="wifi">📶 WiFi</SelectItem>
                              <SelectItem value="trophy">🏆 Trophy</SelectItem>
                              <SelectItem value="clock">⏰ Clock</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-300">Color</Label>
                          <Select onValueChange={(value) => updateService(service.id, "color", value)}>
                            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                              <SelectValue placeholder={service.color} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cyan">Cyan</SelectItem>
                              <SelectItem value="pink">Pink</SelectItem>
                              <SelectItem value="yellow">Yellow</SelectItem>
                              <SelectItem value="orange">Orange</SelectItem>
                              <SelectItem value="purple">Purple</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label className="text-gray-300">Descripción</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, "description", e.target.value)}
                          className="bg-black/20 border-gray-600 text-white"
                        />
                      </div>
                      <div className="mt-4">
                        <Label className="text-gray-300">Características (una por línea)</Label>
                        <Textarea
                          value={service.features.join("\n")}
                          onChange={(e) =>
                            updateService(
                              service.id,
                              "features",
                              e.target.value.split("\n").filter((f) => f.trim()),
                            )
                          }
                          className="bg-black/20 border-gray-600 text-white"
                          placeholder="Característica 1\nCaracterística 2\nCaracterística 3"
                        />
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button onClick={() => removeService(service.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar Servicio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab de Contacto */}
            <TabsContent value="contact" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Teléfono
                  </Label>
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Dirección
                  </Label>
                  <Input
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Horarios
                  </Label>
                  <Input
                    value={contactInfo.hours}
                    onChange={(e) => setContactInfo({ ...contactInfo, hours: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">WhatsApp URL</Label>
                  <Input
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Instagram URL</Label>
                  <Input
                    value={contactInfo.instagram}
                    onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">TikTok URL</Label>
                  <Input
                    value={contactInfo.tiktok}
                    onChange={(e) => setContactInfo({ ...contactInfo, tiktok: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Beacons URL</Label>
                  <Input
                    value={contactInfo.beacons}
                    onChange={(e) => setContactInfo({ ...contactInfo, beacons: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab de Seguridad */}
            <TabsContent value="security" className="space-y-4 mt-6">
              <div className="bg-red-900/20 border border-red-400/50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Lock className="w-5 h-5 text-red-400 mr-2" />
                  <h4 className="text-red-400 font-semibold">Configuración de Seguridad</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Cambia las credenciales de acceso al panel de administración. Asegúrate de recordar estos datos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Usuario de Administrador</Label>
                  <Input
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="admin"
                  />
                  <p className="text-xs text-gray-400 mt-1">Nombre de usuario para acceder al panel</p>
                </div>

                <div>
                  <Label className="text-gray-300">Contraseña</Label>
                  <Input
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="Nueva contraseña"
                  />
                  <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres recomendado</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-400/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                  <h4 className="text-yellow-400 font-semibold">Credenciales Actuales</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Usuario:</span>
                    <span className="text-white ml-2 font-mono">{adminCredentials.username}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Contraseña:</span>
                    <span className="text-white ml-2 font-mono">{"•".repeat(adminCredentials.password.length)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-900/20 border border-cyan-400/50 rounded-lg p-4">
                <h4 className="text-cyan-400 font-semibold mb-3">💡 Consejos de Seguridad</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Usa una contraseña única y segura</li>
                  <li>• No compartas estas credenciales</li>
                  <li>• Cambia la contraseña periódicamente</li>
                  <li>• Evita usar información personal obvia</li>
                </ul>
              </div>
            </TabsContent>

            {/* Tab de Notificaciones */}
            <TabsContent value="notifications" className="space-y-4 mt-6">
              <div className="bg-blue-900/20 border border-blue-400/50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Bell className="w-5 h-5 text-blue-400 mr-2" />
                  <h4 className="text-blue-400 font-semibold">Sistema de Notificaciones</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Configura cómo y dónde recibir notificaciones de reservas, inscripciones y contactos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email para Notificaciones
                  </Label>
                  <Input
                    value={notificationSettings.email}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, email: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="tu@email.com"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email donde recibirás todas las notificaciones</p>
                </div>

                <div>
                  <Label className="text-gray-300 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Teléfono para Notificaciones
                  </Label>
                  <Input
                    value={notificationSettings.phone}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, phone: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="+58 412-123-4567"
                  />
                  <p className="text-xs text-gray-400 mt-1">Teléfono para notificaciones SMS (opcional)</p>
                </div>

                <div>
                  <Label className="text-gray-300">WhatsApp para Notificaciones</Label>
                  <Input
                    value={notificationSettings.whatsapp}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, whatsapp: e.target.value })}
                    className="bg-black/20 border-gray-600 text-white"
                    placeholder="+58 412-123-4567"
                  />
                  <p className="text-xs text-gray-400 mt-1">Número de WhatsApp para notificaciones</p>
                </div>

                <div>
                  <Label className="text-gray-300">Servicio de Email</Label>
                  <Select
                    onValueChange={(value) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        notifications: { ...notificationSettings.notifications, emailService: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                      <SelectValue placeholder={notificationSettings.notifications.emailService} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resend">Resend (Recomendado)</SelectItem>
                      <SelectItem value="nodemailer">Nodemailer (SMTP)</SelectItem>
                      <SelectItem value="emailjs">EmailJS (Cliente)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-purple-400/30">
                <h4 className="text-purple-400 font-semibold mb-3">Tipos de Notificaciones</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifications.reservations}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifications: { ...notificationSettings.notifications, reservations: e.target.checked },
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label className="text-gray-300">Reservas de Estaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifications.tournaments}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifications: { ...notificationSettings.notifications, tournaments: e.target.checked },
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label className="text-gray-300">Inscripciones a Torneos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifications.gameRequests}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifications: { ...notificationSettings.notifications, gameRequests: e.target.checked },
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label className="text-gray-300">Solicitudes de Juegos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notifications.contactForms}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          notifications: { ...notificationSettings.notifications, contactForms: e.target.checked },
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label className="text-gray-300">Formularios de Contacto</Label>
                  </div>
                </div>
              </div>

              {notificationSettings.notifications.emailService === "resend" && (
                <div className="bg-green-900/20 border border-green-400/50 rounded-lg p-4">
                  <h4 className="text-green-400 font-semibold mb-3">Configuración de Resend</h4>
                  <div>
                    <Label className="text-gray-300">API Key de Resend</Label>
                    <Input
                      type="password"
                      value={notificationSettings.emailConfig.resendApiKey}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailConfig: { ...notificationSettings.emailConfig, resendApiKey: e.target.value },
                        })
                      }
                      className="bg-black/20 border-gray-600 text-white"
                      placeholder="re_xxxxxxxxxx"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Obtén tu API key en{" "}
                      <a href="https://resend.com" target="_blank" className="text-green-400" rel="noreferrer">
                        resend.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {notificationSettings.notifications.emailService === "nodemailer" && (
                <div className="bg-orange-900/20 border border-orange-400/50 rounded-lg p-4">
                  <h4 className="text-orange-400 font-semibold mb-3">Configuración SMTP</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Servidor SMTP</Label>
                      <Input
                        value={notificationSettings.emailConfig.smtpHost}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, smtpHost: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Puerto</Label>
                      <Input
                        value={notificationSettings.emailConfig.smtpPort}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, smtpPort: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="587"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Usuario</Label>
                      <Input
                        value={notificationSettings.emailConfig.smtpUser}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, smtpUser: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="tu@gmail.com"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Contraseña</Label>
                      <Input
                        type="password"
                        value={notificationSettings.emailConfig.smtpPass}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, smtpPass: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="contraseña de aplicación"
                      />
                    </div>
                  </div>
                </div>
              )}

              {notificationSettings.notifications.emailService === "emailjs" && (
                <div className="bg-purple-900/20 border border-purple-400/50 rounded-lg p-4">
                  <h4 className="text-purple-400 font-semibold mb-3">Configuración de EmailJS</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-gray-300">Service ID</Label>
                      <Input
                        value={notificationSettings.emailConfig.emailjsServiceId}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, emailjsServiceId: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="service_xxxxxxx"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Template ID</Label>
                      <Input
                        value={notificationSettings.emailConfig.emailjsTemplateId}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, emailjsTemplateId: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="template_xxxxxxx"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Public Key</Label>
                      <Input
                        value={notificationSettings.emailConfig.emailjsPublicKey}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailConfig: { ...notificationSettings.emailConfig, emailjsPublicKey: e.target.value },
                          })
                        }
                        className="bg-black/20 border-gray-600 text-white"
                        placeholder="user_xxxxxxxxxx"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Configura tu servicio en{" "}
                    <a href="https://emailjs.com" target="_blank" className="text-purple-400" rel="noreferrer">
                      emailjs.com
                    </a>
                  </p>
                </div>
              )}

              <div className="bg-cyan-900/20 border border-cyan-400/50 rounded-lg p-4">
                <h4 className="text-cyan-400 font-semibold mb-3">🔔 Estado de Notificaciones</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Email configurado:</span>
                    <span className={`ml-2 ${notificationSettings.email ? "text-green-400" : "text-red-400"}`}>
                      {notificationSettings.email ? "✅ Sí" : "❌ No"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Servicio de email:</span>
                    <span className="text-cyan-400 ml-2 capitalize">
                      {notificationSettings.notifications.emailService}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Notificaciones activas:</span>
                    <span className="text-yellow-400 ml-2">
                      {Object.values(notificationSettings.notifications).filter(Boolean).length - 1}/4
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">WhatsApp:</span>
                    <span className={`ml-2 ${notificationSettings.whatsapp ? "text-green-400" : "text-gray-400"}`}>
                      {notificationSettings.whatsapp ? "✅ Configurado" : "⚪ Opcional"}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
