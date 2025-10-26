// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCcFgP4_Fcn_5CAIB4ZVOe1Iigs_BdxfY",
  authDomain: "notes-manager-10314.firebaseapp.com",
  projectId: "notes-manager-10314",
  storageBucket: "notes-manager-10314.firebasestorage.app",
  messagingSenderId: "454879480343",
  appId: "1:454879480343:web:0706187636f2eef2176a52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth  = getAuth(app);