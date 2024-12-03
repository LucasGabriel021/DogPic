import { firestore, storage } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function editarAnuncio(dados) {
     const { id, nome, idade, descricao, raca, sexo } = dados;

     try {
          const anuncioRef = doc(firestore, "anuncios", id);

          const novosDados = {
               ...(nome && { nome }),
               ...(idade && { idade }),
               ...(descricao && { descricao }),
               ...(raca && { raca }),
               ...(sexo && { sexo }),
          };

          await updateDoc(anuncioRef, novosDados);

          console.log("Anúncio atualizado com sucesso!");
     } catch (error) {
          console.error("Erro ao editar anúncio: ", error);
     }
}