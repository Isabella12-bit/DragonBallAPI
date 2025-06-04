import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

    // Guardar datos básicos del usuario en Firestore
    const uid = userCredential.user.uid;
    await setDoc(doc(this.firestore, 'usuarios', uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
      // Aquí puedes agregar más campos que quieras guardar
    });

    return userCredential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
