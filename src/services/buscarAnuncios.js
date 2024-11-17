import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";

export default async function buscarAnuncios() {
     try {
          const querySnapshot = await getDocs(collection(firestore, "anuncios"));
          const arrayAnuncios = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data(),
          }));
          
          console.log("Dados: ", arrayAnuncios);
          return arrayAnuncios;
     } catch (error) {
          console.error("Erros ao buscar anuncios: ", error);
          return [];
     }
}