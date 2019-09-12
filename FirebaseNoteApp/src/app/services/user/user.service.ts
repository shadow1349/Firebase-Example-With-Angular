import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'firebasenoteapptypes';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<IUser>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.user = this.auth.user.pipe(
      switchMap(user =>
        !user
          ? null
          : this.db
              .collection('Users')
              .doc<IUser>(user.uid)
              .valueChanges()
      )
    );
  }

  update(model: IUser) {
    return this.db
      .collection('Users')
      .doc(model.Id)
      .set(model, { merge: true });
  }

  delete(id: string) {
    return this.db
      .collection('Users')
      .doc(id)
      .delete();
  }
}
