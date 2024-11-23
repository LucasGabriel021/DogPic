import { firestore, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

export default async function addDados(dados) {
     const { usuario, foto, nome, descricao, localizacao, raca } = dados;

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

          // Gerar ID único
          const anuncioId = `${nome}_${Date.now()}`;

          // Criar documento com ID personalizado
          const anuncioRef = doc(firestore, "anuncios", anuncioId);

          await setDoc(anuncioRef, {
               usuario,
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