import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { AuthService } from 'src/app/firebase/auth.service';
import { Reservation } from 'src/app/models/Reservation.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  reservationForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];
  numberReservation!: number;
  datetime: string | null = null;

  // Propiedades nuevas
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  hours: string[] = [
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  details: string[] =  ['corte $ 10.000','corte + barba $ 15.000', 'paquete completo $25.000'];

  reservationHours: Reservation[] = []; // Define el array de reservas

  constructor(
    private firestoreService: FirestoreService,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private nav: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.reservationForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      detalle: ['', [Validators.required,]]
    });
  }

  // Método para confirmar y agregar una nueva reserva
  async reservationHour() {
    this.isSubmitting = true; // Activar el estado de "enviando"

    if (this.reservationForm.valid) {
      const getCurrentUser = this.AuthService.getCurrentUser();
      if (!getCurrentUser) {
        this.errorMessage = 'Para reservar una hora, debes iniciar sesión.';
        this.isSubmitting = false;
        return;
      }

      const loading = await this.loadingController.create({
        message: 'Guardando reserva...',
        spinner: 'circular',
      });

      await loading.present();
      const reservation: Reservation = {
        uid: getCurrentUser.uid,
        fecha: this.reservationForm.value.fecha,
        hora: this.reservationForm.value.hora,
        detalle : this.reservationForm.value.detalle,
      };

      try {
        // Guardar la reserva en Firestore
        await this.firestoreService.createReservation(reservation);

        this.successMessage = 'Su reserva ha sido guardada correctamente.';
        await loading.dismiss();

        // Redirigir a la vista de pago
        this.nav.navigateForward(['/payment']);  // Redirigir al componente "Payment"
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al guardar la reserva. Inténtelo nuevamente.';
        await loading.dismiss();
        console.error('Error al crear la reserva', error);
        this.reservationForm.reset();
      }

      this.isSubmitting = false; // Desactivar el estado de "enviando"
    } else {
      this.isSubmitting = false;
    }
  }


  async viewAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para manejar cambios de fecha
  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.datetime = selectedDate;
  }
}
