import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage, firestore } from "../config/firebase";

export default async function excluirRegistros(documentoId, imagemUrl) {
     try {
          if(imagemUrl) {
               const imagemRef = ref(storage, imagemUrl);
               await deleteObject(imagemRef);
          }

          const documentoRef = doc(firestore, "historico", documentoId);
          await deleteDoc(documentoRef);
     } catch (error) {
          console.error("Erro ao apagar histórico: ", error);
     }
}