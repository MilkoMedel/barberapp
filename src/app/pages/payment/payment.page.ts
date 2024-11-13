import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Para los Toasts

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {
  selectedPaymentMethod: string = ''; // Inicialmente no hay opción seleccionada
  isPaymentButtonDisabled: boolean = true; // El botón de pagar estará deshabilitado inicialmente

  constructor(private toastController: ToastController) {}

  // Función para manejar el pago en efectivo
  async payCash() {
    // Mostrar mensaje de confirmación
    const toast = await this.toastController.create({
      message: 'Su hora ha sido reservada correctamente.',
      duration: 3000,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
  }

  // Función para manejar el cambio de método de pago
  onPaymentMethodChange() {
    // Habilitar el botón de pagar solo si hay una opción seleccionada
    this.isPaymentButtonDisabled = this.selectedPaymentMethod === '';
  }
}
