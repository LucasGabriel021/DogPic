import React, { useContext } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../context/UserContext";

import logo from "../../assets/img/logo-horizontal.png";

export default function Topo({ navigation }) {
     const { user } = useContext(UserContext);

     const verificarAutenticacao = () => {
          if(user) {
               navigation.navigate("Perfil");
          } else {
               navigation.navigate("Autenticacao");
          }
     }

     return (
          <View style={estilos.topo}>
               <Image source={logo} style={estilos.imgLogo} accessibilityLabel="DogPic"/>
               {user ? 
                    <TouchableOpacity onPress={() => verificarAutenticacao()}>
                         <Image source={{ uri: user.photoURL }} style={estilos.imgProfile} accessibilityLabel="Usuário"/> 
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => verificarAutenticacao()}>
                         <Ionicons name="person-circle" size={32} color="#8391A1"/>
                    </TouchableOpacity>
               }
          </View>
     )
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
          width: 38,
          borderRadius: 999
     }
});