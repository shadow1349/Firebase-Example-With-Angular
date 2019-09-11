/// <reference path='../node_modules/mocha-typescript/globals.d.ts' />
import * as firebase from "@firebase/testing";
import * as fs from "fs";

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "fir-example-with-angular";
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;
const rules = fs.readFileSync("firestore.rules", "utf8");

function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
before(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

@suite
class FirestoreRulesTests {
  @test
  async "unauthenticated user cannot update a user profile"() {
    const db = authedApp(null);

    // A document has to exist first in order to update it
    db.collection("Users")
      .doc("abc123")
      .set({ name: "Jack Doe" });

    await firebase.assertFails(
      db
        .collection("Users")
        .doc("abc123")
        .update({ name: "John Doe" })
    );
  }

  @test
  async "logged in user cannot update user profile if it is not theirs"() {
    const db = authedApp({ uid: "123abc" });

    // A document has to exist first in order to update it
    db.collection("Users")
      .doc("abc123")
      .set({ name: "Jack Doe" });

    await firebase.assertFails(
      db
        .collection("Users")
        .doc("abc123")
        .update({ name: "John Doe" })
    );
  }

  @test
  async "user can update their own profile"() {
    const db = authedApp({ uid: "abc123" });

    // A document has to exist first in order to update it
    db.collection("Users")
      .doc("abc123")
      .set({ name: "Jack Doe" });

    await firebase.assertSucceeds(
      db
        .collection("Users")
        .doc("abc123")
        .update({ name: "John Doe" })
    );
  }

  @test
  async "unauthenticated user cannot create a note"() {
    const db = authedApp(null);

    await firebase.assertFails(
      db.collection("Notes").add({ Note: "Lorem ipsum dolor" })
    );
  }

  @test
  async "authenticated user can create a note"() {
    const db = authedApp({ uid: "abc123" });

    await firebase.assertSucceeds(
      db.collection("Notes").add({ Note: "Lorem ipsum dolor" })
    );
  }
}
