import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService, Personaje } from '../../servicios/personaje.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.scss'
})
export class PersonajesComponent {
  personajes: Personaje[] = [];
  visibles: Personaje[] = [];
  cantidadAMostrar = 10;
  personajeService = inject(PersonajeService);

  busqueda = ''; // 👈 Campo para búsqueda

  constructor() {
    this.personajeService.obtenerTodos().subscribe(res => {
      this.personajes = res.items;
      this.actualizarVisibles();
    });
  }

  get personajesFiltrados(): Personaje[] {
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
}
