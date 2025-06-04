import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  auth = inject(Auth);
  router = inject(Router);

  user: User | null = this.auth.currentUser;

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/home']);
  }
}
