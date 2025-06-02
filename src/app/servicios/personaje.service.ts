import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personaje {
  id: number;
  name: string;
  race: string;
  gender: string;
  ki: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {
  private apiUrl = 'https://dragonball-api.com/api/characters';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<{ items: Personaje[] }> {
    return this.http.get<{ items: Personaje[] }>(this.apiUrl);
  }
}