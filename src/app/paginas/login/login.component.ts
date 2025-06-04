import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isLogin = true;
  mensaje = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    try {
      if (this.isLogin) {
        await this.authService.login(this.email, this.password);
        this.mensaje = 'Inicio de sesión exitoso ✅';
      } else {
        await this.authService.register(this.email, this.password);
        this.mensaje = 'Cuenta registrada correctamente ✅';
      }
    } catch (err: any) {
      this.mensaje = 'Error: ' + err.message;
    }
  }
}
