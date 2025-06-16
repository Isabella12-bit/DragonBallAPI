import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService, PersonajeFirestore } from '../../servicios/personaje.service';
import { RouterModule } from '@angular/router';
import { collection, deleteDoc, doc, Firestore, getDocs, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revisar-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Personajes pendientes de aprobación</h2>
    <div *ngFor="let p of personajesPendientes">
      <h4>{{ p.name }}</h4>
      <p>Raza: {{ p.race }} | Género: {{ p.gender }} | Ki: {{ p.ki }}</p>
      <img [src]="p.image" alt="{{ p.name }}" width="150" />
      <br />
      <button (click)="aprobar(p)">✅ Aprobar</button>
      <button (click)="rechazar(p)">❌ Rechazar</button>
      <hr />
    </div>
  `
})
export class RevisarPersonajesComponent {
  personajesPendientes: PersonajeFirestore[] = [];

  private firestore = inject(Firestore);
  private personajeService = inject(PersonajeService);

  constructor() {
    const pendientesCol = collection(this.firestore, 'personajesPendientes');
    collectionData(pendientesCol, { idField: 'id' }).subscribe((data) => {
      this.personajesPendientes = data as PersonajeFirestore[];
    });
  }

  async aprobar(personaje: PersonajeFirestore) {
    const aprobadosCol = collection(this.firestore, 'personajesPersonalizados');
    const pendientesDoc = doc(this.firestore, `personajesPendientes/${personaje.id}`);

    // copiar a aprobados
    const { id, ...personajeSinId } = personaje;
    await addDoc(aprobadosCol, personajeSinId);

    // eliminar de pendientes
    await deleteDoc(pendientesDoc);
    alert(`${personaje.name} aprobado ✅`);
  }

  async rechazar(personaje: PersonajeFirestore) {
    const pendientesDoc = doc(this.firestore, `personajesPendientes/${personaje.id}`);
    await deleteDoc(pendientesDoc);
    alert(`${personaje.name} eliminado ❌`);
  }
}
