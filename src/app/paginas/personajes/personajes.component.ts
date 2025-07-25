import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService } from '../../servicios/personaje.service';
import { PersonajeAPI } from '../../servicios/personaje.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})

export class PersonajesComponent {
  personajes: PersonajeAPI[] = [];
  busqueda = '';
  favoritos = new Set<string>();

  private personajeService = inject(PersonajeService);

  // constructor() {
  //   this.personajeService.obtenerTodos().subscribe(res => {
  //     console.log('Lista completa de personajes:', res.items);

  //     this.personajes = res.items.map(p => ({
  //       ...p,
  //       ki: (typeof p.ki === 'string' && p.ki != null)
  //             ? Number((p.ki as any).replace(/\./g, ''))
  //             : p.ki
  //     }));
  //   });

  //   this.personajeService.obtenerFavoritos().subscribe(favoritos => {
  //     this.favoritos = new Set(favoritos.map(f => f.name));
  //   });
  // }
  constructor() {
  // Usamos combineLatest para combinar personajes de API y de Firestore
  combineLatest([
  this.personajeService.obtenerTodos(),
  this.personajeService.obtenerPersonajesAprobados()
]).subscribe(([apiResponse, personajesAprobados]) => {
  const apiPersonajes: PersonajeAPI[] = apiResponse.items.map(p => ({
    ...p,
    ki: typeof p.ki === 'string' ? Number(p.ki.replace(/\./g, '')) : p.ki
  }));

  const firestorePersonajesConvertidos: PersonajeAPI[] = personajesAprobados.map(p => ({
  ...p,
  id: Number(p.id ?? 0), // Convertimos el id a número, por defecto 0 si es undefined
  ki: typeof p.ki === 'string' ? Number(p.ki.replace(/\./g, '')) : p.ki
}));


  this.personajes = [...apiPersonajes, ...firestorePersonajesConvertidos];
});

  }


  get personajesFiltrados(): PersonajeAPI[] {
    return this.personajes.filter(p =>
      p.name.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  agregarAFavoritos(personaje: PersonajeAPI): void {
  const user = this.personajeService['auth'].currentUser;

  if (!user) {
    alert('Debes iniciar sesión para agregar personajes a favoritos.');
    return;
  }

  if (this.favoritos.has(personaje.name)) return;

  this.personajeService.agregarFavorito(personaje)
    .then(() => {
      console.log(`${personaje.name} agregado a favoritos`);
      this.favoritos.add(personaje.name);
    })
    .catch(error => console.error('Error al agregar a favoritos:', error));
  }

  esFavorito(nombre: string): boolean {
    return this.favoritos.has(nombre);
  }
}