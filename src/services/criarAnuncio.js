import { firestore, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default async function addDados(dados) {
     // console.log("DADOS:", dados);
     const { foto, nome, descricao, localizacao, raca } = dados;

     try {
          let imageUrl = null;
          if(foto) {
               // Enviar imagem
               const response = await fetch(foto.uri);
               const blob = await response.blob();
               const imageRef = ref(storage, `anuncio/${Date.now()}`);
               await uploadBytes(imageRef, blob);

               // Obter a URL da imagem armazenada
               imageUrl = await getDownloadURL(imageRef);
          }

          await addDoc(collection(firestore, "anuncios"), {
               nome, 
               descricao, 
               localizacao,
               raca,
               imageUrl,
               createAt: new Date(),
          });

          console.log("Anuncio criado: ", nome);
     } catch(error) {
          console.error("Erro ao criar anúncio: ", error);
     }
}