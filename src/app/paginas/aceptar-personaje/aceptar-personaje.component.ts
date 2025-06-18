import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-aceptar-personaje',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './aceptar-personaje.component.html',
  styleUrl: './aceptar-personaje.component.scss'
})
export class AceptarPersonajeComponent {
  firestore = inject(Firestore);
  personajesPendientes: any[] = [];

  constructor() {
    this.cargarPendientes();
  }

  async cargarPendientes() {
    const ref = collection(this.firestore, 'personajesPendientes');
    const snapshot = await getDocs(ref);
    this.personajesPendientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async aprobarPersonaje(personaje: any) {
    const personajesRef = collection(this.firestore, 'personajes');
    await addDoc(personajesRef, personaje); // ✅ Se guarda en la colección final
    await deleteDoc(doc(this.firestore, 'personajesPendientes', personaje.id)); // ❌ Se elimina de la colección temporal
    this.cargarPendientes();
  }

  async rechazarPersonaje(personaje: any) {
    await deleteDoc(doc(this.firestore, 'personajesPendientes', personaje.id)); // ❌ Solo se elimina
    this.cargarPendientes();
  }
}
