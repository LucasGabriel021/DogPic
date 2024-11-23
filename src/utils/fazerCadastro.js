
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert } from "react-native";

import uploadImagemPerfil from "../services/uploadImagemPerfil";

export default async function fazerCadastro(foto, nome, email, senha, navigation) {
     try {
          // console.log("Imagem: ", foto);
          // Criar usuário
          const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
          const user = userCredential.user;

          let fotoURL = null;
          if(foto?.uri) {
               fotoURL = await uploadImagemPerfil(foto.uri, user.uid);
          }

          await updateProfile(user, {
               displayName: nome,
               photoURL: fotoURL
          });

          Alert.alert("Cadastro realizado com sucesso");
          navigation.navigate("Perfil");
     } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
               Alert.alert("Este e-mail já está em uso. Tente outro.");
          } else if (error.code === 'auth/invalid-email') {
               Alert.alert("O e-mail fornecido é inválido. Verifique e tente novamente.");
          } else if (error.code === 'auth/weak-password') {
               Alert.alert("A senha deve ter pelo menos 6 caracteres.");
          } else {
               console.error("Erro ao criar usuário: ", error);
               Alert.alert("Ocorreu um erro, tente novamente.");
          }
     }
}