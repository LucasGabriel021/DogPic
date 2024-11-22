import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export default async function uploadImagemPerfil(uri, usuarioId) {
     try {
          const response = await fetch(uri);
          const blob = await response.blob();
          const storageRef = ref(storage, `perfil/${usuarioId}.jpg`);

          // Fazer upload da foto
          await uploadBytes(storageRef, blob);

          // Obter URL pública
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL;
     } catch (error) {
          console.error("Erro ao fazer upload da imagem: ", error);
          throw error;
     }
}