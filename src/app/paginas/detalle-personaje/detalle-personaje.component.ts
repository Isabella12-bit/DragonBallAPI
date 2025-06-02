import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajeService, Personaje } from '../../servicios/personaje.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-personaje.component.html',
  styleUrl: './detalle-personaje.component.scss'
})
export class DetallePersonajeComponent {
  personaje?: Personaje;
  route = inject(ActivatedRoute);
  personajeService = inject(PersonajeService);

  constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.personajeService.obtenerTodos().subscribe(res => {
      this.personaje = res.items.find(p => p.id === id);
    });
  }
}
