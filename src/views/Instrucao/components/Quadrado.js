import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("screen");
const largura = width * 0.4

export default function Quadrado({imagem, icone, style}) {
     return <View style={estilos.container}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
               <Image source={imagem} accessibilityLabel="Cachorro" style={[estilos.imagem, style]}/>
          </View>
          <View style={{height: 24, width: "100%", alignItems: "flex-end", justifyContent: "flex-end"}}>
               <View style={estilos.boxIcone}>
                    <Icon name={icone} size={14} color="#FFFFFF"/>
               </View>   
          </View>
     </View>
}

const estilos = StyleSheet.create({
     container: {
          width: largura,
          height: largura,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          elevation: 4,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          overflow: "hidden"
     },
     imagem: {
          height: 60,
          width: 60,
          resizeMode: "cover"
     },
     boxIcone: {
          width: 20,
          height: 20,
          backgroundColor: "#EF9C66",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4
     }
});