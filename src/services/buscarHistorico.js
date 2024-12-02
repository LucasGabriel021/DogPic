import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

export default async function buscarHistorico() {
     try {
          const querySnapshot = await getDocs(collection(firestore, "historico"));
          const arrayHistorico = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data(),
          }));
          
          return arrayHistorico;
     } catch (error) {
          console.error("Erros ao buscar históricos: ", error);
          return [];
     }
}