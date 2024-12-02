import { firestore, storage } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import fazerUploadImagemBd from "../utils/fazerUploadImagemBd";
import { auth } from "../config/firebase";

export default async function salvarHistorico(dados) {
     const { nomeUser, emailUser, imagem, titulo, descricao, doencas, prevencoes } = dados;
     const user = auth.currentUser;

     if (!user) {
          console.error("Usuário não autenticado.");
          return;
     }

     try {
          const imageUrl = imagem ? await fazerUploadImagemBd(imagem, "historico") : null;

          const historicoId = `${user.displayName}_${Date.now()}`;
          const historicoRef = doc(firestore, "historico", historicoId);

          await setDoc(historicoRef, {
               nomeUser,
               emailUser,
               imageUrl,
               titulo,
               descricao,
               doencas,
               prevencoes,
               createAt: new Date(),
          });
     } catch (error) {
          console.error("Erro ao salvar histórico: ", error);
     }
}