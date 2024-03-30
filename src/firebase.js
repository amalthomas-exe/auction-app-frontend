// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUJlGtWNJ_E49UDbNltOlQMBYRinU_jU0",
  authDomain: "auction-app-97009.firebaseapp.com",
  projectId: "auction-app-97009",
  storageBucket: "auction-app-97009.appspot.com",
  messagingSenderId: "748050687040",
  appId: "1:748050687040:web:fe8c2ff9a1dabc2ac36ba5",
  measurementId: "G-4K189NJDQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);