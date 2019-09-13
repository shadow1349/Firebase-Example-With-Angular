import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { IUser } from "firebasenoteapptypes";
import { checkStorageItemsAndDeleteOldFile } from "../utilities";

export const UserCreated = functions.firestore
  .document("Users/{UserId}")
  .onCreate((snapshot, context) => {
    const user = snapshot.data() as IUser;

    return admin.auth().updateUser(user.Id, {
      displayName: `${user.FirstName} ${user.LastName}`
    });
  });

export const UserUpdated = functions.firestore
  .document("Users/{UserId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data() as IUser;
    const after = change.after.data() as IUser;

    if (
      before.FirstName !== after.FirstName ||
      before.LastName !== after.LastName ||
      before.ProfilePhoto !== after.ProfilePhoto ||
      before.Disabled !== after.Disabled
    ) {
      await admin.auth().updateUser(context.params.UserId, {
        displayName: `${after.FirstName} ${after.LastName}`,
        photoURL: after.ProfilePhoto,
        disabled: after.Disabled
      });
    }

    return checkStorageItemsAndDeleteOldFile({
      before: before.ProfilePhoto,
      after: after.ProfilePhoto
    });
  });

export const UserDeleted = functions.firestore
  .document("Users/{UserId}")
  .onDelete((snapshot, context) => {
    const user = snapshot.data() as IUser;

    return admin.auth().deleteUser(user.Id);
  });
