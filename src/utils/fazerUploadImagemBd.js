import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export default async function fazerUploadImagemBd(foto, dir) {
     if (!foto || !foto.uri) {
          console.error("Foto inválida ou não encontrada.");
          return "";
     }

     try {
          const response = await fetch(foto.uri);
          const blob = await response.blob();
          const imageRef = ref(storage, `${dir}/${Date.now()}`);

          await uploadBytes(imageRef, blob);
          blob.close(); // Libera memória após o upload

          return await getDownloadURL(imageRef);

     } catch (error) {
          console.error("Erro ao fazer upload da imagem para o Storage: ", error);
          return "";
     }
}