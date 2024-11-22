export interface Reservation {
  id?: string;         // Generado automáticamente por Firestore
  uid: string;         // UID del usuario que realiza la reserva
  fecha: string;       // Fecha de la reserva
  hora?: string;       // Hora de la reserva (para clientes)
  detalle?: string;    // Detalle de la reserva (para clientes)
}
