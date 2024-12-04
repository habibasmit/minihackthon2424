import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";   
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";// Authentication
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; // firestore

const firebaseConfig = {
  apiKey: "AIzaSyBd3qEnbF9a52GF3dyTBv9qTuFR-PqYMeA",
  authDomain: "hackathonproject-d16b8.firebaseapp.com",
  projectId: "hackathonproject-d16b8",
  storageBucket: "hackathonproject-d16b8.firebasestorage.app",
  messagingSenderId: "902026334815",
  appId: "1:902026334815:web:146843f0c0af5e12a9c1ea",
};

const app = initializeApp(firebaseConfig);
// console.log("App ==> ", app);
const auth = getAuth(app);  
const db = getFirestore(app);
// console.log("db ==> ", db);


export {getAuth, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, deleteDoc, doc,  getDocs , db, updateDoc }