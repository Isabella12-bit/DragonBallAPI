import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeService, PersonajeFirestore } from '../../servicios/personaje.service';
import { Auth, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth = inject(Auth);
  router = inject(Router);
  personajeService = inject(PersonajeService);

  user: User | null = null;
  favoritos: PersonajeFirestore[] = [];

  // async ngOnInit() {
  //   this.user = this.auth.currentUser;

  //   this.personajeService.obtenerFavoritos().subscribe(favs => {
  //     this.favoritos = favs;
  //   });
    async ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      this.personajeService.obtenerFavoritos().subscribe(favs => {
        this.favoritos = favs;
      });
      } else {
      this.router.navigate(['/home']);
    }
  });
  }
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/home']);
  }
}