import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { Alert } from "react-native";

export default async function enviarEmailRecuperacao(email, navigation) {
     try {
          await sendPasswordResetEmail(auth, email);
          Alert.alert(
               "E-mail enviado!",
               "Um e-mail de redefinição de senha foi enviado para o endereço informado."
          );
          navigation.navigate("Login");
     } catch (error) {
          console.error("Erro ao enviar e-mail de recuperação: ", error);
          switch (error.code) {
               case "auth/invalid-email":
                   Alert.alert("O e-mail informado é inválido.");
                   break;
               case "auth/user-not-found":
                   Alert.alert("Usuário não encontrado com este e-mail.");
                   break;
               default:
                   Alert.alert("Não foi possível enviar o e-mail. Tente novamente.");
           }
     }
}