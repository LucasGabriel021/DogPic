import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { auth } from "../../config/firebase";
import { Ionicons } from "@expo/vector-icons";

import placeholder from "../../../assets/img/profile-default.png"

export default function Perfil() {
     const user = auth.currentUser;

     return (
          <View style={estilos.container}>
               <View/>
               <View style={{alignItems: "center", rowGap: 16}}>
                    {user.photoURL ? (
                         <Image source={{ uri: user.photoURL }} style={estilos.imagemPerfil}/>
                    ) : (
                         <Image source={placeholder} style={estilos.imagemPerfil}/>
                    )}
                    <View style={{alignItems: "center", rowGap: 4}}>
                         <View style={{flexDirection: "row", columnGap: 8, alignItems: "center"}}>
                              <Text style={estilos.nome}>{user.displayName}</Text>
                              <Ionicons name="pencil" size={16} color="#313131"/>
                         </View>
                         <Text style={estilos.email}>{user.email}</Text>
                    </View>
               </View>
               <View style={{flexDirection: "row", justifyContent: "center", columnGap: 8, marginTop: 24}}>
                    <TouchableOpacity style={estilos.btn}>
                         <Text style={estilos.texto}>Histórico de scanners</Text>   
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.btn}>
                         <Text style={[estilos.texto, {color: "#EF9C66"}]}>Anúncios</Text>
                    </TouchableOpacity>
               </View>
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#F1F1F1",
          padding: 24
     },
     imagemPerfil: {
          width: 100,
          height: 100,
          borderWidth: 4,
          borderColor: "#EF9C66",
          borderRadius: 999
     },
     nome: {
          fontFamily: "CabinMedium",
          fontSize: 18,
          color: "#313131"
     },
     email: {
          fontFamily: "CabinMedium",
          fontSize: 12,
          color: "#8391A1"
     },
     btn: {
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          paddingVertical: 8,
          backgroundColor: "#fff",
          borderRadius: 6
     },
     texto: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          color: "gray"
     }
});