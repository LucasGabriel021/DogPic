import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
     apiKey: "AIzaSyCoZYN0Cjqsfhsn4e58cZD8XpPbjzciLFA",
     projectId: "dogpic-437ce",
     storageBucket: "dogpic-437ce.appspot.com"
}

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Storage
const storage = getStorage(app);

export { storage };