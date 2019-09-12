# Firebase Example with Angular

This is an example repository showing a full app created with Angular and Firestore.

## Rules

Before you can run these rules you have to have the `firebase-tools` package installed.

If you want to run the rules cd to the rules directory and make sure you run `npm install`. Once you have the node_modules installed you can setup the emulator by running:

```
firebase setup:emulators:firestore
```

and then starting the emulator by running:

```
firebase emulators:start --only firestore
```

## Angular App

Please see the [README](FirebaseNoteApp/README.md) for the FirebaseNoteApp.