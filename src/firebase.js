// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fullstack-twitter-4d8a5.firebaseapp.com",
  projectId: "fullstack-twitter-4d8a5",
  storageBucket: "fullstack-twitter-4d8a5.firebasestorage.app",
  messagingSenderId: "628971384743",
  appId: "1:628971384743:web:8d3e6aa8ce5803125ed082"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
