import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.auth.signOut();
  }
}
