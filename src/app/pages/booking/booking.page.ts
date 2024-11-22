import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { AuthService } from 'src/app/firebase/auth.service';
import { Reservation } from 'src/app/models/Reservation.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { delay } from 'rxjs';

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

  hours: string[] = [
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  reservationHours: Reservation[] = []; // Define el array de reservas

  constructor(
    private firestoreService: FirestoreService,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private nav: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }


  ngOnInit() {this.reservationForm = this.fb.group({
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.min(1)]]
  });}

  // Método para confirmar y agregar una nueva reserva

  async reservationHour(){
    if(this.reservationForm.valid){
      const getCurrentUser = this.AuthService.getCurrentUser();
      if(!getCurrentUser) {
        await this.viewAlert('Error','Para reservar una hora, debes iniciar sesión.');
        return;
      }

      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'circular',
      });

      await loading.present();
      const reservation: Reservation = {
        uid: getCurrentUser.uid,
        fecha: this.reservationForm.value.fecha,
        hora: this.reservationForm.value.hora,
      };
      try {
        await this.firestoreService.createReservation(reservation);
        await this.viewAlert('Su reserva ha sido confirmada','Su hora ha sido reservada correctamente.');
        await loading.dismiss();
        delay(4000);
        this.nav.navigateRoot(['/home']);
      } catch (error) {
        await this.viewAlert('Error al reservar','Ha ocurrido un error, intente nuevamente.');
        await loading.dismiss();
        console.error('Error al crear la reserva', error);
        await this.viewAlert('Error al reserva','Ha ocurrido un error, intente nuevamente.');
        this.reservationForm.reset();
      }
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
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
