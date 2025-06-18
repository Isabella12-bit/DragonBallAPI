import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface PlanetaAPI {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanetaService {
  private apiUrl = 'https://dragonball-api.com/api/planets';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<{ items: PlanetaAPI[] }> {
    const totalPages = 3;
    const requests: Observable<{ items: PlanetaAPI[] }>[] = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = `${this.apiUrl}?page=${page}`;
      requests.push(this.http.get<{ items: PlanetaAPI[] }>(url));
    }

    return forkJoin(requests).pipe(
      map(responses => {
        const allItems = responses.flatMap(res => res.items);
        return { items: allItems };
      })
    );
  }
}