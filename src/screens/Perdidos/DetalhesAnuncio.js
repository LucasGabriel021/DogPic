import React from "react";
import { Text, Image, StyleSheet, Dimensions, ScrollView, View } from "react-native";

const { height } = Dimensions.get("window");
const imagemHeight = height * 0.5;

export default function Cachorro({route}) {
     const { item } = route.params;
     console.log("Item: ", item);

     return <ScrollView>
          <View style={estilos.container}>
               <Image style={estilos.imagem} source={{uri: item.imageUrl}} accessibilityLabel="Cachorro"/>
               <View style={estilos.containerInfos}>
                    <View style={estilos.conteudo}>
                         <Text style={[estilos.titulo, {fontSize: 20}]}>{item.nome}</Text>
                         <Text style={estilos.paragrafo}>{item.raca}</Text>
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
          rowGap: 16
     },
     textoRaca: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#EF9C66",
          fontFamily: "CabinBold"
     },
     titulo: {
          fontSize: 16,
          lineHeight: 26,
          color: "#313131",
          fontFamily: "CabinBold"
     },
     paragrafo: {
          width: "auto",
          fontSize: 14,
          lineHeight: 20,
          color: "#515151",
          fontFamily: "CabinRegular",
          textAlign: "justify"
     },
});