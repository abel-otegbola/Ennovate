// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk-1oewHeh-QZBApVHTSD3bm6kNB4WTA8",
  authDomain: "todo-9ed34.firebaseapp.com",
  projectId: "todo-9ed34",
  storageBucket: "todo-9ed34.appspot.com",
  messagingSenderId: "683038376146",
  appId: "1:683038376146:web:455d7b4a382a2db127ed0b",
  databaseURL: "https://todo-9ed34-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const db = getFirestore();