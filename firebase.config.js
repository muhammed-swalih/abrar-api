const admin = require('firebase-admin');
const serviceAccount = require('./abrar-travels-a6cd1-firebase-adminsdk-9d9jz-4e7ab13663.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://abrar-travels-a6cd1.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
