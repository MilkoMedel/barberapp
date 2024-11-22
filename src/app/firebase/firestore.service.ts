import { inject, Injectable } from '@angular/core';
import { User } from '../models/User.models';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Reservation } from '../models/Reservation.models';
import { addDoc, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  createUser(uid: string, userData: User){
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userDocRef, userData);
  }

  async getUser(uid: string){
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  // Crear una nueva reserva
  async createReservation(reservation: Reservation) {
    const reservationsCollectionRef = collection(this.firestore, 'reservations');
    return addDoc(reservationsCollectionRef, reservation);
  }

  // Obtener reservas de un usuario por su UID
  async getReservationsByUser(uid: string) {
    const reservationsCollectionRef = collection(this.firestore, 'reservations');
    const q = query(reservationsCollectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

