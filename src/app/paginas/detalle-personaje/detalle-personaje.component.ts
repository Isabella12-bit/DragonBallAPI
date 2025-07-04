import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajeService } from '../../servicios/personaje.service';
import { PersonajeAPI } from '../../servicios/personaje.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-personaje.component.html',
  styleUrl: './detalle-personaje.component.scss'
})
export class DetallePersonajeComponent {
  personaje?: PersonajeAPI;
  personajeId!: number;
  esFavorito = false;
  favoritoFirestoreId: string | null = null;

  private route = inject(ActivatedRoute);
  private personajeService = inject(PersonajeService);

  constructor() {
    this.personajeId = Number(this.route.snapshot.params['id']);

    this.personajeService.obtenerTodos().subscribe(res => {
      this.personaje = res.items.find(p => p.id === this.personajeId) || undefined;
    });

    this.personajeService.obtenerFavoritos().subscribe(favoritos => {
      const favorito = favoritos.find(f => f.name && f.name.toLowerCase() === this.personaje?.name.toLowerCase());
      this.esFavorito = !!favorito;
      this.favoritoFirestoreId = favorito?.id ?? null;
    });
  }

  agregarAFavoritos() {
    if (this.personaje) {
      this.personajeService.agregarFavorito(this.personaje)
        .then(() => this.esFavorito = true)
        .catch(err => console.error('Error al agregar favorito', err));
    }
  }

  eliminarFavorito() {
    if (this.favoritoFirestoreId) {
      this.personajeService.eliminarFavorito(this.favoritoFirestoreId)
        .then(() => {
          this.esFavorito = false;
          this.favoritoFirestoreId = null;
        })
        .catch(err => console.error('Error al eliminar favorito', err));
    }
  }
}