import { firestore, storage } from "../config/firebase";

export default async function addDados(dados) {
     // console.log("DADOS:", dados);
     const { foto, nome, descricao, localizacao, raca } = dados;

     try {
          let imageUrl = null;
          if(foto) {
               // Enviar imagem
               const response = await fetch(foto.uri);
               const blob = await response.blob();
               const imageRef = storage.ref().child(`anuncios/${Date.now()}`);
               await imageRef.put(blob);

               // Obter a URL da imagem armazenada
               imageUrl = await imageRef.getDownloadURL();
          }

          await firestore.collection("anuncios").add({
               nome, 
               descricao,
               localizacao,
               raca,
               imageUrl,
               createdAt: new Date(),
          });

          console.log("Anuncio criado!");
     } catch(error) {
          console.error("Erro ao criar anúncio: ", error);
     }
}