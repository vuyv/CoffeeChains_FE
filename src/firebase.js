import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuwLtjxTmsFQtVSpDE7LMwt1iFjypu42Y",
  authDomain: "coffee-7b1d7.firebaseapp.com",
  projectId: "coffee-7b1d7",
  storageBucket: "coffee-7b1d7.appspot.com",
  messagingSenderId: "610007845695",
  appId: "1:610007845695:web:ceebc62ce413be48bda18a",
  measurementId: "G-29K7GEPN95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
