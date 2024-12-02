import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage, firestore } from "../config/firebase";

export default async function excluirRegistros(documentoId, imagemUrl) {
     try {
          if(imagemUrl) {
               const imagemRef = ref(storage, imagemUrl);
               await deleteObject(imagemRef);
               console.log("Imagem excluída com sucesso!");
          }

          const documentoRef = doc(firestore, "historico", documentoId);
          await deleteDoc(documentoRef);
          console.log("Histórico apagadao com sucesso!");
     } catch (error) {
          console.error("Erro ao apagar histórico: ", error);
     }
}