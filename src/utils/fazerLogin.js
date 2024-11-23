import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Alert } from "react-native";

export default async function fazerLogin(email, senha, onSucess, onError) {
     try {
          await signInWithEmailAndPassword(auth, email, senha);
          if(onSucess) {
            onSucess();
          }
     } catch (error) {
          console.error("Erro em realizar o login. Tente novamente! ", error);
          if(onError) {
            switch (error.code) {
                case "auth/invalid-email":
                    onError("O e-mail informado é inválido.");
                    break;
                case "auth/user-not-found":
                    onError("Usuário não encontrado.");
                    break;
                case "auth/wrong-password":
                    onError("Senha incorreta.");
                    break;
                default:
                    onError("Não foi possível realizar o login. Tente novamente.");
           }
          }
     }
}