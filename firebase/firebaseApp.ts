// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMNJD9X9fd-8nCNUpfC8bPHSUDlXp03Kc",
  authDomain: "football-coach-assistant.firebaseapp.com",
  projectId: "football-coach-assistant",
  storageBucket: "football-coach-assistant.appspot.com",
  messagingSenderId: "87097730749",
  appId: "1:87097730749:web:7bf94e72a7bc83faabf9d4",
  measurementId: "G-GBFC2ZW9E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
  };