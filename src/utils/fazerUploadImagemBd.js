import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function fazerUploadImagemBd(foto, dir) {
     try {
          let imagemURL = null;
          if(foto) {
               const response = await fetch(foto.uri);
               const blob = await response.blob();
               const imageRef = ref(storage, `${dir}/${Date.now()}`);
               await uploadBytes(imageRef, blob);

               imagemURL = await getDownloadURL(imageRef);
          }
     } catch (error) {
          console.error("Erro ao fazer upload da imagem para o Storage: ", error);
     }
}