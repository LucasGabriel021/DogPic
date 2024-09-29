import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Quadrado({imagem, icone, style}) {
     return <View style={estilos.container}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
               <Image source={imagem} accessibilityLabel="Cachorro" style={[estilos.imagem, style]}/>
          </View>
          <View style={{height: 24, width: "100%", alignItems: "flex-end", justifyContent: "flex-end"}}>
               <View style={estilos.boxIcone}>
                    <Icon name={icone} size={16} color="#FFFFFF"/>
               </View>   
          </View>
     </View>
}

const estilos = StyleSheet.create({
     container: {
          width: 171,
          height: 171,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          elevation: 4,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          overflow: "hidden"
     },
     imagem: {
          height: 80,
          width: 80,
          resizeMode: "cover"
     },
     boxIcone: {
          width: 25,
          height: 24,
          backgroundColor: "#EF9C66",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4
     }
});