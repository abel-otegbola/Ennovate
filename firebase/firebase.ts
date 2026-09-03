// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1k6iJ7uygzzZKsk8y38ZPLZ5u7BCFm_o",
    authDomain: "ennovate-hub.firebaseapp.com",
    projectId: "ennovate-hub",
    storageBucket: "ennovate-hub.firebasestorage.app",
    messagingSenderId: "191047283739",
    appId: "1:191047283739:web:c87eef3028ab144b9474be",
    measurementId: "G-59TG04VPNB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const db = getFirestore();