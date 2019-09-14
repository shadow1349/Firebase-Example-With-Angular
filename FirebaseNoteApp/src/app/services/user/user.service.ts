import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from 'firebasenoteapptypes';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<IUser>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
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

  update(model: Partial<IUser>) {
    if (!model.Id) {
      throw new Error(
        'No ID was supplied with the Partial<IUser> parameter to update a user record'
      );
    }
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

  async uploadProfilePhoto(userId: string, file: File) {
    const fileparts = file.name.split('.');

    const path = `${userId}/profilePhoto.${fileparts[fileparts.length - 1]}`;

    const upload = await this.storage.upload(path, file);

    const url = await upload.ref.getDownloadURL();

    return this.update({ Id: userId, ProfilePhoto: url });
  }
}
