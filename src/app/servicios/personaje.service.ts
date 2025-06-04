import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

import { Firestore, collection, addDoc, deleteDoc, doc, collectionData, CollectionReference, DocumentData } from '@angular/fire/firestore';

export interface PersonajeAPI {
  id: number;
  name: string;
  race: string;
  gender: string;
  ki: number;
  image: string;
}

export interface PersonajeFirestore {
  id?: string;
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
  private favoritosCol: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private firestore: Firestore) {
    this.favoritosCol = collection(this.firestore, 'favoritos');
  }

  // Obtener personajes desde API externa
  obtenerTodos(): Observable<{ items: PersonajeAPI[] }> {
  const totalPages = 16;
  const requests: Observable<{ items: PersonajeAPI[] }>[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const url = `${this.apiUrl}?page=${page}`;
    requests.push(this.http.get<{ items: PersonajeAPI[] }>(url));
  }

  return forkJoin(requests).pipe(
    map(responses => {
      const allItems = responses.flatMap(res => res.items);
      return { items: allItems };
    })
  );
}

  // Agregar personaje a Firestore (favoritos)
  agregarFavorito(personaje: PersonajeAPI) {
    const { id, ...personajeSinId } = personaje;
    return addDoc(this.favoritosCol, personajeSinId);
  }

  // Obtener personajes favoritos desde Firestore
  obtenerFavoritos(): Observable<PersonajeFirestore[]> {
    return collectionData(this.favoritosCol, { idField: 'id' }) as Observable<PersonajeFirestore[]>;
  }

  // Eliminar personaje favorito
  eliminarFavorito(id: string) {
    const personajeDoc = doc(this.firestore, `favoritos/${id}`);
    return deleteDoc(personajeDoc);
  }
}