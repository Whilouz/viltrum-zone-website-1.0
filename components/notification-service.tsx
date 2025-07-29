"use client"

// Servicio para manejar notificaciones del lado del cliente
export class NotificationService {
  static async sendNotification(type: string, data: any) {
    try {
      const settings = localStorage.getItem("notificationSettings")
      if (!settings) {
        console.log("No hay configuración de notificaciones")
        return { success: false, message: "No hay configuración de notificaciones" }
      }

      const notificationSettings = JSON.parse(settings)

      if (!notificationSettings.notifications[type]) {
        console.log(`Notificaciones deshabilitadas para: ${type}`)
        return { success: false, message: `Notificaciones deshabilitadas para: ${type}` }
      }

      // Log de la notificación
      console.log("📧 Notificación enviada:", {
        type,
        data,
        to: notificationSettings.email,
        service: notificationSettings.notifications.emailService,
      })

      return { success: true, message: "Notificación enviada" }
    } catch (error) {
      console.error("Error en NotificationService:", error)
      return { success: false, message: "Error enviando notificación" }
    }
  }
}
