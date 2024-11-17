import Ract from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import placeholder from "../../../../assets/img/placeholder-dog.png";

const { width } = Dimensions.get("window");
const larguraImg = width * 0.25;

export default function Topo({nome, raca, localizacao, imagem}) {
     return (
          <View style={estilos.container}>
               <Image source={imagem ? { uri: imagem } : placeholder} style={estilos.imagem}/>
               <View style={{justifyContent: "space-between", paddingVertical: 4}}>
                    <View>
                         <Text style={[estilos.texto, {fontSize: 16, fontWeight: "bold"}]}>{nome}</Text>
                         <Text style={estilos.texto}>{raca}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", columnGap: 2}}>
                         <Ionicons name="location" size={18} color={"#5B5B5B"}/>
                         <Text style={[estilos.texto, {color: "#5B5B5B"}]}>{localizacao}</Text>
                    </View>
               </View>
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          padding: 16,
          borderRadius: 8,
          elevation: 2,
          backgroundColor: "#fff",
          flexDirection: "row",
          columnGap: 8,
          marginVertical: 8
     },
     imagem: {
          width: larguraImg,
          height: larguraImg,
          borderRadius: 6
     },
     texto: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131"
     }
});