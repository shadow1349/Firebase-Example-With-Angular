import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { INote, IUser } from "firebasenoteapptypes";

export const NoteCreated = functions.firestore
  .document("Notes/{NoteId}")
  .onCreate((snapshot, context) => {
    const note = snapshot.data() as INote;

    const userRef = admin
      .firestore()
      .collection("Users")
      .doc(note.Author);

    return admin
      .firestore()
      .runTransaction(t =>
        t.get(userRef).then(doc => {
          const user = doc.data() as IUser;
          return t.set(
            userRef,
            {
              NumNotes: user.NumNotes + 1
            },
            { merge: true }
          );
        })
      )
      .catch(e => console.log("TRANSACTION ERROR: ", e));
  });

export const NoteDeleted = functions.firestore
  .document("Notes/{NoteId}")
  .onDelete((snapshot, context) => {
    const note = snapshot.data() as INote;

    const userRef = admin.firestore().doc(`Users/${note.Author}`);

    return admin
      .firestore()
      .runTransaction(t =>
        t.get(userRef).then(doc => {
          const user = doc.data() as IUser;
          return t.update(userRef, {
            NumNotes: user.NumNotes - 1
          });
        })
      )
      .catch(e => console.log("TRANSACTION ERROR: ", e));
  });
