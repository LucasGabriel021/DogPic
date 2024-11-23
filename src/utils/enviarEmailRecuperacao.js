import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export default async function enviarEmailRecuperacao(email, onSucess, onError) {
     try {
          await sendPasswordResetEmail(auth, email);
          if(onSucess) {
               onSucess();
          }
     } catch (error) {
          console.error("Erro ao enviar e-mail de recuperação: ", error);
          if(onError) {
               switch (error.code) {
                    case "auth/invalid-email":
                        onError("O e-mail informado é inválido.");
                        break;
                    case "auth/user-not-found":
                         onError("Usuário não encontrado com este e-mail.");
                        break;
                    default:
                         onError("Não foi possível enviar o e-mail. Tente novamente.");
                }
          }
     }
}