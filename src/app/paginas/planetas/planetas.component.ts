import { Component, OnInit } from '@angular/core';
import { PlanetaAPI } from '../../servicios/planeta.service';
import { PlanetaService } from '../../servicios/planeta.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./planetas.component.scss']
})
export class PlanetasComponent implements OnInit {
  planetas: PlanetaAPI[] = [];
  cargando = true;
  busqueda: string = '';

  constructor(private planetaService: PlanetaService) {}

  ngOnInit(): void {
    this.planetaService.obtenerTodos().subscribe({
      next: res => {
        this.planetas = res.items;
        this.cargando = false;
      },
      error: err => {
        console.error('Error al cargar planetas', err);
        this.cargando = false;
      }
    });
  }

  // 👇 2. Agrega este getter al final de la clase
  get planetasFiltrados(): PlanetaAPI[] {
    return this.planetas.filter(planeta =>
      planeta.name.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
}
