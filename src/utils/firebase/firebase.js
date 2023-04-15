// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCedwDfm3rPZ1LAg18ZaNp4yPRlLo3FVyg",
  authDomain: "react-firebase-crud-f4ec2.firebaseapp.com",
  projectId: "react-firebase-crud-f4ec2",
  storageBucket: "react-firebase-crud-f4ec2.appspot.com",
  messagingSenderId: "942639669145",
  appId: "1:942639669145:web:399f237f1fafdffbf4bd08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
