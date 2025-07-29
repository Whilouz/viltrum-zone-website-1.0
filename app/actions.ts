"use server"

interface GameRequestData {
  name: string
  email: string
  phone: string
  gameName: string
  platform: string
  reason: string
}

interface TournamentRegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  game: string
  experience: string
  teamName: string
  comments: string
}

interface ReservationData {
  name: string
  phone: string
  date: string
  time: string
  duration: string
  service: string
}

interface ContactData {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendGameRequest(data: GameRequestData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("📧 Solicitud de juego recibida:", data)

    return {
      success: true,
      message: "Solicitud enviada correctamente",
    }
  } catch (error) {
    console.error("Error enviando solicitud:", error)
    return { success: false, message: "Error al enviar la solicitud" }
  }
}

export async function sendTournamentRegistration(data: TournamentRegistrationData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("📧 Inscripción al torneo recibida:", data)

    return {
      success: true,
      message: "Inscripción enviada correctamente",
    }
  } catch (error) {
    console.error("Error enviando inscripción:", error)
    return { success: false, message: "Error al enviar la inscripción" }
  }
}

export async function sendReservation(data: ReservationData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("📧 Reserva recibida:", data)

    return {
      success: true,
      message: "Reserva enviada correctamente",
    }
  } catch (error) {
    console.error("Error enviando reserva:", error)
    return { success: false, message: "Error al enviar la reserva" }
  }
}

export async function sendContactMessage(data: ContactData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("📧 Mensaje de contacto recibido:", data)

    return {
      success: true,
      message: "Mensaje enviado correctamente",
    }
  } catch (error) {
    console.error("Error enviando mensaje:", error)
    return { success: false, message: "Error al enviar el mensaje" }
  }
}
