import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>; 

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = authState(this.auth); 
  }

  async register(email: string, password: string, number: string, rol: string = 'usuario') {
  const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  const uid = userCredential.user.uid;

  await setDoc(doc(this.firestore, 'usuarios', uid), {
    email: userCredential.user.email,
    number: number,
    rol: rol,
    createdAt: new Date(),
  });

    return userCredential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async getUserData(uid: string): Promise<any> {
    const userDoc = doc(this.firestore, 'usuarios', uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  logout() {
  return signOut(this.auth);
  }
}