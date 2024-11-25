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

  async getUser(uid: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);
      return userDoc.exists() ? (userDoc.data() as User) : null;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }


  // Crear una nueva reserva
  async createReservation(reservation: Reservation) {
    const reservationsCollectionRef = collection(this.firestore, 'reservations');
    return addDoc(reservationsCollectionRef, reservation);
  }

  // Obtener reservas de un usuario por su UID
  async getReservationsByUser(uid: string): Promise<Reservation[]> {
    const reservationsCollectionRef = collection(this.firestore, 'reservations');
    const q = query(reservationsCollectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation));
  }

  // Obtener todas las reservas
  async getAllReservations(): Promise<Reservation[]> {
    const reservationsCollectionRef = collection(this.firestore, 'reservations');
    const querySnapshot = await getDocs(reservationsCollectionRef);
    // Mapea los datos y excluye el campo 'uid'
    return querySnapshot.docs.map(doc => {
      const { uid, ...rest } = doc.data(); // Excluir 'uid'
      return { id: doc.id, ...rest } as Reservation;
    });
  }
}

