// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-94363.firebaseapp.com",
  projectId: "twitter-94363",
  storageBucket: "twitter-94363.firebasestorage.app",
  messagingSenderId: "740998318791",
  appId: "1:740998318791:web:c80713470fddccec1b4ce2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
