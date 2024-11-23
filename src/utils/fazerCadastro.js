
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert } from "react-native";

import uploadImagemPerfil from "../services/uploadImagemPerfil";

export default async function fazerCadastro(foto, nome, email, senha, onSucess, onError) {
     try {
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

          if(onSucess) {
               onSucess();
          }
          
     } catch (error) {
          if(onError) {
               switch(error.code) {
                    case "auth/email-already-in-use": 
                         onError("Este e-mail já está em uso. Tente outro.");
                         break;
                    case "auth/invalid-email":
                         onError("O e-mail fornecido é inválido. Verifique e tente novamente.");
                         break;
                    case "auth/weak-password":
                         onError("A senha deve ter pelo menos 6 caracteres.");
                         break;
                    default: 
                         console.error("Erro ao criar usuário: ", error);
                         onError("Ocorreu um erro, tente novamente.");
                         break;
               }
          }
     }
}