import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Reservation } from 'src/app/models/Reservation.models';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  reservations: Reservation[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.loadAllReservations();
  }

  async loadAllReservations() {
    try {
      this.reservations = await this.firestoreService.getAllReservations();
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
    }
  }
}
