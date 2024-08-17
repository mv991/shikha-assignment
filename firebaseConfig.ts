// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkkXEUT6aNOKLxE3JvokalB-b7cvnaUb8",
  authDomain: "first-bit-378017.firebaseapp.com",
  projectId: "first-bit-378017",
  storageBucket: "first-bit-378017.appspot.com",
  messagingSenderId: "886603618405",
  appId: "1:886603618405:web:b7a6810f764506dd944e8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

const db = getFirestore(app);

export { db, collection, addDoc };
// export const usersRef = collection(firebaseDB, "users");
// export const pokemonListRef = collection(firebaseDB, "tvList");