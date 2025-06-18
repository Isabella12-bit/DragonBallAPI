import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { User } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuarioLogueado: User | null = null;
  rolUsuario: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe(async (user) => {
      this.usuarioLogueado = user;

      if (user) {
        const datos = await this.authService.getUserData(user.uid);
        this.rolUsuario = datos?.rol || ''; // <- aquí se guarda el rol
      } else {
        this.rolUsuario = '';
      }
    });
  }
}