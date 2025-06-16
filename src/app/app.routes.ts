import { Routes } from '@angular/router';
import { PersonajesComponent } from './paginas/personajes/personajes.component';
import { DetallePersonajeComponent } from './paginas/detalle-personaje/detalle-personaje.component';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { AgregarPersonajeComponent } from './paginas/agregar-personaje/agregar-personaje.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detalle/:id', component: DetallePersonajeComponent },
  { path: 'login',
  loadComponent: () =>
    import('./paginas/login/login.component').then(m => m.LoginComponent)},
  { path: 'profile',
  loadComponent: () => import('./paginas/profile/profile.component').then(m => m.ProfileComponent) },
   { path: 'agregar-personaje', component: AgregarPersonajeComponent },
];
