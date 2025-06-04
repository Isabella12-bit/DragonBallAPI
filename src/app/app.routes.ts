import { Routes } from '@angular/router';
import { PersonajesComponent } from './paginas/personajes/personajes.component';
import { DetallePersonajeComponent } from './paginas/detalle-personaje/detalle-personaje.component';
import { LoginComponent } from './paginas/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'login', component: LoginComponent },
   { path: 'detalle/:id', component: DetallePersonajeComponent }
];
