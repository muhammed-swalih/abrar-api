// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8VVuxmlxohEDzYx00ybNs57zoPykPoI0",
  authDomain: "abrar-travels-a6cd1.firebaseapp.com",
  projectId: "abrar-travels-a6cd1",
  storageBucket: "abrar-travels-a6cd1.appspot.com",
  messagingSenderId: "6276997465",
  appId: "1:6276997465:web:df94cead3cf5e383dbac48",
  measurementId: "G-Y0DQ9WQ1TB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
