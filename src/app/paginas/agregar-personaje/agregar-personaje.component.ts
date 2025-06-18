import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonajeService, PersonajeFirestore } from '../../servicios/personaje.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-personaje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-personaje.component.html',
  styleUrl: './agregar-personaje.component.scss'
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