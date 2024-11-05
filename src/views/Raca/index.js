import React from "react";
import { Text, Image, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const imagemHeight = height * 0.5;

export default function Cachorro({route}) {
     const { item } = route.params; // Obtendo os parâmetros passados pela navegação

     // console.log("Item: ", item);

     return <ScrollView>
          <View style={estilos.container}>
               <Image style={estilos.imagem} source={{uri: item.imagem}} accessibilityLabel="Cachorro"/>
               <View style={estilos.containerInfos}>
                    <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                         <Text style={estilos.textoRaca}>{item.raca}</Text>
                         <View style={estilos.etiqueta}>
                              <Text style={{color: "#ffffff", fontFamily: "CabinRegular"}}>{item.porte}</Text>
                              <FontAwesome5 name="paw" size={12} color={"#ffffff"}/>
                         </View>
                    </View>
                    <View>
                         <Text style={estilos.titulo}>Sobre mim</Text>
                         <Text style={estilos.descricao}>{item.descricao}</Text>
                    </View>
                    <View>
                         <Text style={estilos.titulo}>Possíveis doenças</Text>
                         <Text style={estilos.descricao}>{item.possiveisDoencas}</Text>
                    </View>
                    <View>
                         <Text style={estilos.titulo}>Prevenções</Text>
                         <Text style={estilos.descricao}>{item.tratamentosDoencas}</Text>
                    </View>
               </View>
          </View>
     </ScrollView>
}

const estilos = StyleSheet.create({
     container: {
          flex: 1
     },
     imagem: {
          width: "100%",
          height: imagemHeight,
     },
     containerInfos: {
          padding: 24,
          rowGap: 8
     },
     textoRaca: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#EF9C66",
          fontFamily: "CabinBold"
     },
     etiqueta: {
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          columnGap: 8,
          backgroundColor: "#EF9C66",
          borderRadius: 18
     },
     titulo: {
          fontSize: 16,
          lineHeight: 26,
          color: "#313131",
          fontFamily: "CabinBold"
     },
     descricao: {
          fontSize: 14,
          lineHeight: 20,
          color: "#3F3F3F",
          fontFamily: "CabinRegular"
     }
});