import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
     apiKey: "AIzaSyCoZYN0Cjqsfhsn4e58cZD8XpPbjzciLFA",
     authDomain: "dogpic-437ce.firebaseapp.com",
     projectId: "dogpic-437ce",
     storageBucket: "dogpic-437ce.appspot.com"
}

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Storage e Firestore
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };