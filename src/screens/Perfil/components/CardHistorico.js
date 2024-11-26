import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import placeholder from "../../../../assets/img/placeholder-dog.png";
import { Ionicons } from "@expo/vector-icons";

export default function CardHistorico({ imagem, nome, data, icone, onPress }) {
     return (
          <TouchableOpacity style={estilos.container} onPress={onPress}>
               <View style={{ flexDirection: "row", columnGap: 16 }}>
                    <Image source={imagem ? { uri: imagem } : placeholder} style={estilos.imagem} />
                    <View style={{ justifyContent: "center" }}>
                         <Text style={[estilos.texto, { fontWeight: "bold", fontSize: 16 }]}>{nome}</Text>
                         <Text style={estilos.texto}>{data}</Text>
                    </View>
               </View>
               <TouchableOpacity>
                    <Ionicons name={icone} size={16} color={"#313131"} />
               </TouchableOpacity>
          </TouchableOpacity>
     )
}

const estilos = StyleSheet.create({
     container: {
          padding: 16,
          backgroundColor: "#fff",
          elevation: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 4,
          marginBottom: 16,
          width: "100%",
          height: "auto"
     },
     imagem: {
          height: 80,
          width: 80,
          borderRadius: 6
     },
     texto: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131"
     }
});