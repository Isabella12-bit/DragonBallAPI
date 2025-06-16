import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanetaService } from '../../servicios/planeta.service';
import { PlanetaAPI } from '../../servicios/planeta.service';

@Component({
  selector: 'app-detalle-planetas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-planeta.component.html',
  styleUrl: './detalle-planeta.component.scss'
})
export class DetallePlanetasComponent {
  planeta?: PlanetaAPI;
  planetaId!: number;

  private route = inject(ActivatedRoute);
  private planetaService = inject(PlanetaService);

  constructor() {
    this.planetaId = Number(this.route.snapshot.params['id']);

    this.planetaService.obtenerTodos().subscribe(res => {
      this.planeta = res.items.find(p => p.id === this.planetaId);
    });
  }
}
