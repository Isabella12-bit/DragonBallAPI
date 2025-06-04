// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { PersonajeService, Personaje } from '../../servicios/personaje.service';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService } from '../../servicios/personaje.service';
import { PersonajeAPI } from '../../servicios/personaje.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})
// export class PersonajesComponent {
//   personajes: Personaje[] = [];
//   visibles: Personaje[] = [];
//   cantidadAMostrar = 10;
//   personajeService = inject(PersonajeService);

//   busqueda = '';

//   constructor() {
//     this.personajeService.obtenerTodos().subscribe(res => {
//       this.personajes = res.items;
//       this.actualizarVisibles();
//     });
//   }

//   get personajesFiltrados(): Personaje[] {
//     return this.personajes.filter(p =>
//       p.name.toLowerCase().includes(this.busqueda.toLowerCase())
//     );
//   }

//   actualizarVisibles(): void {
//     const nuevos = this.personajesFiltrados.slice(0, this.visibles.length + this.cantidadAMostrar);
//     this.visibles = nuevos;
//   }

//   cargarMas(): void {
//     this.actualizarVisibles();
//   }

//   quedanMas(): boolean {
//     return this.visibles.length < this.personajesFiltrados.length;
//   }

//   onBuscar(): void {
//     this.visibles = this.personajesFiltrados.slice(0, this.cantidadAMostrar);
//   }

//   agregarAFavoritos(personaje: Personaje): void {
//   this.personajeService.agregarFavorito(personaje)
//     .then(() => console.log(`${personaje.name} agregado a favoritos`))
//     .catch(error => console.error('Error al agregar a favoritos:', error));
//   }
// }
export class PersonajesComponent {
  personajes: PersonajeAPI[] = [];
  visibles: PersonajeAPI[] = [];
  cantidadAMostrar = 10;
  busqueda = '';

  favoritos = new Set<string>();

  private personajeService = inject(PersonajeService);

  constructor() {
  this.personajeService.obtenerTodos().subscribe(res => {
    console.log('Lista completa de personajes:', res.items);

    this.personajes = res.items.map(p => ({
    ...p,
    ki: (typeof p.ki === 'string' && p.ki != null)
          ? Number((p.ki as any).replace(/\./g, ''))
          : p.ki
  	}));


    this.visibles = this.personajes.slice(0, this.cantidadAMostrar);
  });

  this.personajeService.obtenerFavoritos().subscribe(favoritos => {
    this.favoritos = new Set(favoritos.map(f => f.name));
  });
}

  get personajesFiltrados(): PersonajeAPI[] {
    return this.personajes.filter(p =>
      p.name.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  actualizarVisibles(): void {
    const nuevos = this.personajesFiltrados.slice(0, this.visibles.length + this.cantidadAMostrar);
    this.visibles = nuevos;
  }

  cargarMas(): void {
    this.actualizarVisibles();
  }

  quedanMas(): boolean {
    return this.visibles.length < this.personajesFiltrados.length;
  }

  onBuscar(): void {
    this.visibles = this.personajesFiltrados.slice(0, this.cantidadAMostrar);
  }

  agregarAFavoritos(personaje: PersonajeAPI): void {
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