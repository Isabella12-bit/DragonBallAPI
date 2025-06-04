// src/app/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Iniciar Sesión</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="email" name="email" placeholder="Correo" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Contraseña" required>
      <button type="submit">Entrar</button>
    </form>
    <p *ngIf="error" style="color: red;">{{ error }}</p>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.error = 'Error al iniciar sesión: ' + err.message;
      });
  }
}