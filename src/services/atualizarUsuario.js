import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage, database } from "../config/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import uploadImagemPerfil from "./uploadImagemPerfil";

export default async function atualizarUsuario(uid, dados) {
     const { displayName, photoURL } = dados;

     /**
      * Atualizar a foto de perfil no Storage se necessário.
      */
     let novaFotoURL = photoURL;
     if (photoURL && photoURL.startsWith("file://")) {
     novaFotoURL = await uploadImagemPerfil(photoURL, uid); // Usa sua função
     }

     /**
      * Atualizar os dados no Auth
      */
     const usuario = auth.currentUser;
     await updateProfile(usuario, { displayName, photoURL: novaFotoURL });

     /**
      * Atualizar os dados no Firestore
      */
     const userRef = doc(database, "usuarios", uid);
     await updateDoc(userRef, { displayName, photoURL: novaFotoURL });

     return { ...usuario, displayName, photoURL: novaFotoURL };
}    