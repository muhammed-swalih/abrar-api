import admin from "firebase-admin";
import serviceAccount from "./abrar-travels-a6cd1-firebase-adminsdk-9d9jz-4e7ab13663.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://abrar-travels-a6cd1.appspot.com",
});

const bucket = admin.storage().bucket();

export default bucket;
