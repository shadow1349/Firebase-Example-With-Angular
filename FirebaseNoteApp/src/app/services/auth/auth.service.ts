import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser } from 'firebasenoteapptypes';
import Swal from 'sweetalert2';
import { Errors } from './errors';

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
      })
      .catch(e => this.showError(e));
  }

  signUp(user: IUser, password: string) {
    return this.auth.auth
      .createUserWithEmailAndPassword(user.Email, password)
      .then(userCredential => {
        user.CreatedOn = Date.now();
        user.Id = userCredential.user.uid;

        return this.db
          .collection('Users')
          .doc(userCredential.user.uid)
          .set(user)
          .then(() => {
            this.router.navigate(['/main/notes']);
          })
          .catch(e => console.log(e));
      })
      .catch(e => this.showError(e));
  }

  signOut() {
    return this.auth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/auth/sign-in']);
      })
      .catch(e => this.showError(e));
  }

  changePassword(email: string) {
    this.auth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Swal.fire(
          'Check your email',
          'For youur security, we have sent you an email with a password reset link',
          'success'
        );
      })
      .catch(e => this.showError(e));
  }

  private showError(e: any) {
    console.log(e);
    const index = Errors.findIndex(x => x.code === e.code);

    if (index !== -1) {
      const err = Errors[index];
      Swal.fire(err.title, err.message, 'error');
    } else {
      Swal.fire(
        'Oops, something went wrong!',
        `We couldn's complete your request at this time. Please try again later`,
        'error'
      );
    }
  }
}
