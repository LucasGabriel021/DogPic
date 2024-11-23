import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Alert } from "react-native";

export default async function fazerLogin(email, senha, navigation) {
     try {
          await signInWithEmailAndPassword(auth, email, senha);
          navigation.navigate("Perfil");
     } catch (error) {
          console.error("Erro em realizar o login. Tente novamente! ", error);
          switch (error.code) {
               case "auth/invalid-email":
                   Alert.alert("O e-mail informado é inválido.");
                   break;
               case "auth/user-not-found":
                   Alert.alert("Usuário não encontrado.");
                   break;
               case "auth/wrong-password":
                   Alert.alert("Senha incorreta.");
                   break;
               default:
                   Alert.alert("Não foi possível realizar o login. Tente novamente.");
          }
     }
}