import { firestore, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import fazerUploadImagemBd from "../utils/fazerUploadImagemBd";

export default async function addDados(dados) {
     const { email, nomeUsuario, fotoUsuario, foto, nome, idade, descricao, localizacao, raca, sexo } = dados;

     try {
          const imageUrl = foto ? await fazerUploadImagemBd(foto, "anuncio") : null;

          // Gerar ID único
          const anuncioId = `${nome}_${Date.now()}`;

          // Criar documento com ID personalizado
          const anuncioRef = doc(firestore, "anuncios", anuncioId);

          await setDoc(anuncioRef, {
               email,
               nomeUsuario,
               fotoUsuario,
               nome, 
               idade,
               descricao, 
               localizacao,
               raca,
               sexo,
               imageUrl,
               createAt: new Date(),
          });
     } catch(error) {
          console.error("Erro ao criar anúncio: ", error);
     }
}