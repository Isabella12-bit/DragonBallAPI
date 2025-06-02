import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService, Personaje } from '../../servicios/personaje.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})
export class PersonajesComponent {
  personajes: Personaje[] = [];
  visibles: Personaje[] = [];
  cantidadAMostrar = 10;
  personajeService = inject(PersonajeService);

  constructor() {
    this.personajeService.obtenerTodos().subscribe(res => {
      this.personajes = res.items;
      this.actualizarVisibles();
    });
  }

  actualizarVisibles(): void {
    this.visibles = this.personajes.slice(0, this.visibles.length + this.cantidadAMostrar);
  }

  cargarMas(): void {
    this.actualizarVisibles();
  }

  quedanMas(): boolean {
    return this.visibles.length < this.personajes.length;
  }
}
