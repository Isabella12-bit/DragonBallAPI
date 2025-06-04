import { Component } from '@angular/core';
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
export class NavbarComponent {
  usuarioLogueado: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.usuarioLogueado = user;
    });
  }
}

