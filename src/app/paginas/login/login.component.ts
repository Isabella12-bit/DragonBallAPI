import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

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
  number = '';
  isLogin = true;
  mensaje = '';
  rolUsuario = '';
  adminCode = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore 
  ) {}

  // async onSubmit() {
  // try {
  //   if (this.isLogin) {
  //     const userCredential = await this.authService.login(this.email, this.password);
  //     const uid = userCredential.user.uid;
  //     const userData = await this.authService.getUserData(uid);

  //     this.rolUsuario = userData.rol;

  //     this.mensaje = 'Inicio de sesión exitoso ✅';

  //     if (this.rolUsuario === 'admin') {
  //       this.router.navigate(['/admin-dashboard']);
  //     } else {
  //       this.router.navigate(['/home']);
  //     }
  //   } else {
  //     await this.authService.register(this.email, this.password, this.number, this.rolUsuario); // puedes cambiar a 'admin' si es necesario
  //     this.mensaje = 'Cuenta registrada correctamente ✅';
  //   }
  // } catch (err: any) {
  //   this.mensaje = 'Error: ' + err.message;
  // }
  // }
  async onSubmit() {
  try {
    const codigosRef = collection(this.firestore, 'codigosAdmin');

    if (this.isLogin) {
      // INICIAR SESIÓN
      const userCredential = await this.authService.login(this.email, this.password);
      const uid = userCredential.user.uid;
      const userData = await this.authService.getUserData(uid);
      this.rolUsuario = userData.rol;

      if (this.rolUsuario === 'admin') {
        // Verifica que el código y correo coincidan
        const q = query(codigosRef, where('codigo', '==', this.adminCode), where('email', '==', this.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          this.mensaje = '❌ Código de administrador inválido para este correo.';
          return;
        }
      }

      this.mensaje = 'Inicio de sesión exitoso ✅';

      if (this.rolUsuario === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/home']);
      }

    } else {
      // REGISTRO
      if (this.rolUsuario === 'admin') {
        const q = query(codigosRef, where('codigo', '==', this.adminCode), where('email', '==', this.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          this.mensaje = '❌ Código de administrador inválido o no autorizado para este correo.';
          return;
        }
      }

      await this.authService.register(this.email, this.password, this.number, this.rolUsuario);
      this.mensaje = 'Cuenta registrada correctamente ✅';
    }
  } catch (err: any) {
    this.mensaje = 'Error: ' + err.message;
  }
}
}