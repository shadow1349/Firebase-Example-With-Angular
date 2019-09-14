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

## Using this app with your own Firebase Project

If you want to fork this repo and implement this in your own Firebase project, make sure that you replace the `firebaseConfig` field in both `environment.ts` and `environment.prod.ts` in the Angular app so that it uses your Firebase project. You will also have to edit all of the `.firebaserc` files and change the default to your project id.

```
{
  "projects": {
    "default": "my-project-id-goes-here"
  }
}

```

You must do this for `FirebaseNoteApp`, `noteappfunctions`, and `rules`.

If you have any issues reproducing the app, feel free to post an issue in the repo. I don't care what format you use so long as you explain things clearly so I know what you're talking about.