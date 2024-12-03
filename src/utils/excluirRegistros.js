import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage, firestore } from "../config/firebase";

export default async function excluirRegistros(documentoId, imagemUrl, colecao) {
     try {
          if(imagemUrl) {
               const imagemRef = ref(storage, imagemUrl);
               await deleteObject(imagemRef);
          }

          const documentoRef = doc(firestore, colecao, documentoId);
          await deleteDoc(documentoRef);
     } catch (error) {
          console.error("Erro ao excluir registro: ", error);
     }
}