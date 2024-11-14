import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  datetime: string | null = null;
  reservations: Array<{ time: string; details: string }> = [];

  constructor() { }

  ngOnInit() {}

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.datetime = selectedDate;
  }

  // Método para confirmar y agregar una nueva reserva
  confirmBooking() {
    const time = '3:00 PM'; // Puedes reemplazar esto con un valor dinámico
    const details = 'Nueva reserva';
    this.addReservation(time, details);
  }

  // Método para ver las reservas de la fecha seleccionada
  viewReservations() {
    if (this.datetime) {
      this.reservations = this.getReservationsForDate(this.datetime);
    }
  }

  // Método para agregar una reserva
  addReservation(time: string, details: string) {
    if (this.datetime && time && details) {
      this.reservations.push({ time, details });
      this.datetime = null; // Limpia la fecha seleccionada
    }
  }

  getReservationsForDate(date: string) {
    const sampleReservations = [
      { date: '2024-11-14', time: '10:00 AM', details: 'detalle' },
      { date: '2024-11-14', time: '2:00 PM', details: 'detalle' },
      { date: '2024-11-15', time: '11:30 AM', details: 'detalle' }
    ];

    return sampleReservations.filter(reservation => reservation.date === date);
  }
}
