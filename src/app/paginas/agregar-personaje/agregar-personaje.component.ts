import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonajeService, PersonajeFirestore } from '../../servicios/personaje.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Agregar nuevo personaje</h2>
    <form (ngSubmit)="agregar()" #form="ngForm">
      <input name="name" [(ngModel)]="nombre" placeholder="Nombre" required />
      <input name="race" [(ngModel)]="raza" placeholder="Raza" required />
      <input name="gender" [(ngModel)]="genero" placeholder="Género" required />
      <input name="ki" type="number" [(ngModel)]="ki" placeholder="Ki" required />
      <input name="image" [(ngModel)]="imagen" placeholder="URL Imagen" required />
      <button type="submit" [disabled]="form.invalid">Agregar</button>
    </form>
  `
})
export class AgregarPersonajeComponent {
  nombre = '';
  raza = '';
  genero = '';
  ki!: number;
  imagen = '';

  constructor(private personajeService: PersonajeService, private router: Router) {}

  agregar() {
    const nuevoPersonaje: Omit<PersonajeFirestore, 'id'> = {
      name: this.nombre,
      race: this.raza,
      gender: this.genero,
      ki: this.ki,
      image: this.imagen,
    };

    this.personajeService.agregarPersonaje(nuevoPersonaje)
    .then(() => {
      alert('Personaje agregado con éxito!');
      this.nombre = '';
      this.raza = '';
      this.genero = '';
      this.ki = 0;
      this.imagen = '';

      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/personajes']);
      });
    })
      .catch(error => alert('Error al agregar personaje: ' + error.message));
  }
}