import React from "react";
import { Text, Image, StyleSheet, Dimensions, ScrollView, View } from "react-native";

import Doenca from "../../../assets/img/icons/icone-doenca.png";
import Prevencao from "../../../assets/img/icons/icone-prevencao.png";

const { height } = Dimensions.get("window");
const imagemHeight = height * 0.5;

export default function Cachorro({route}) {
     const { item } = route.params; // Obtendo os parâmetros passados pela navegação

     // console.log("Item: ", item);

     return <ScrollView>
          <View style={estilos.container}>
               <Image style={estilos.imagem} source={{uri: item.imagem}} accessibilityLabel="Cachorro"/>
               <View style={estilos.containerInfos}>
                    <View style={estilos.conteudo}>
                         <Text style={[estilos.titulo, {fontSize: 20}]}>{item.racaPt}</Text>
                         <Text style={estilos.paragrafo}>{item.descricao} Seu porte é considerado <Text style={{fontWeight: "bold"}}>{item.porte}.</Text></Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Guia Rápido</Text>
                         <View style={{width: "100%", rowGap: 16}}>
                              <View style={estilos.card}>
                                   <Image source={Doenca} style={estilos.imagemCard}/>
                                   <View style={estilos.containerTexto}>
                                        <Text style={[estilos.titulo, {fontSize: 14}]}>Possíveis doenças</Text>
                                        <Text style={estilos.paragrafo}>{item.possiveisDoencas}</Text>
                                   </View>
                              </View>
                         </View>
                         <View style={{width: "100%", rowGap: 16}}>
                              <View style={estilos.card}>
                                   <Image source={Prevencao} style={estilos.imagemCard}/>
                                   <View style={estilos.containerTexto}>
                                        <Text style={[estilos.titulo, {fontSize: 14}]}>Possíveis tratamentos</Text>
                                        <Text style={estilos.paragrafo}>{item.tratamentosDoencas}</Text>
                                   </View>
                              </View>
                         </View>
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
     conteudo: {
          rowGap: 8,
          width: "100%",
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
     paragrafo: {
          width: "auto",
          fontSize: 14,
          lineHeight: 20,
          color: "#515151",
          fontFamily: "CabinRegular",
          textAlign: "justify"
     },
     card: {
          width: "100%",
          height: "auto",
          borderRadius: 8,
          flexDirection: "row", 
          columnGap: 16,
          alignItems: "center",
          padding: 16,
          backgroundColor: "#ECECEC",
          elevation: 0.5
     },
     imagemCard: {
          width: 32,
          height: 32
     },
     containerTexto: {
          rowGap: 4,
          flexShrink: 1,
          width: "100%"
     },
});