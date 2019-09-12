import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser } from 'firebasenoteapptypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  signIn(email: string, password: string) {
    return this.auth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/main/notes']);
      });
  }

  signUp(user: IUser, password: string) {
    return this.auth.auth
      .createUserWithEmailAndPassword(user.Email, password)
      .then(userCredential => {
        user.CreatedOn = Date.now();

        return this.db
          .collection('Users')
          .doc(userCredential.user.uid)
          .set(user)
          .then(() => {
            this.router.navigate(['/main/notes']);
          });
      });
  }

  signOut() {
    return this.auth.auth.signOut().then(() => {
      this.router.navigate(['/auth/sign-in']);
    });
  }
}
