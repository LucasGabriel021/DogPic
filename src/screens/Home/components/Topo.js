import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";

import logo from "../../../../assets/img/logo-horizontal.png";

export default function Topo({ navigation }) {
     const [user, setUser] = useState(null);

     /**
      * Atualiza o componente após o usuário estiver feito o cadastro ou login
      */
     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser);
          });

          return () => unsubscribe();
     }, []);

     const verificarAutenticacao = () => {
          if(user) {
               navigation.navigate("Perfil");
          } else {
               navigation.navigate("Autenticacao");
          }
     }

     return <View style={estilos.topo}>
          <Image source={logo} style={estilos.imgLogo} accessibilityLabel="DogPic"/>
          <TouchableOpacity onPress={() => verificarAutenticacao()}>
          <Ionicons name="person-circle" size={32} color="#8391A1"/>
          </TouchableOpacity>
     </View>
}

const estilos = StyleSheet.create({
     topo: {
          width: "100%",
          height: 80,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
     },
     imgLogo: {
          width: 105,
          height: 40
     },
     imgProfile: {
          height: 38,
          width: 38
     }
});