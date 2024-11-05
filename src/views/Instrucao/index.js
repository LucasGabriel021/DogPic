import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";

import textos from "../../mocks/intrucoes";
import desfoque from "../../../assets/img/desfoque.png";
import cachorro from "../../../assets/img/cachorro02.png";
import cachorro2 from "../../../assets/img/cachorro03.png";
import iluminacao from "../../../assets/img/iluminacao.png";

import Quadrado from "./components/Quadrado";
import BotaoLg from "../../components/BotaoLg";

export default function Instrucao({navigation}) {
     const { paragrafo, secao1, secao2, secao3 } = textos;

     return <ScrollView>
               <View style={estilos.container}>
                    <Text style={estilos.descricao}>{paragrafo}</Text>
                    <View>
                         <View>
                              <Text style={estilos.titulo}>{secao1}</Text>
                              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                   <Quadrado imagem={desfoque} icone={"close"}/>
                                   <Quadrado imagem={cachorro} icone={"check"}/>
                              </View>
                         </View> 
                         <View style={{marginTop: 16}}>
                              <Text style={estilos.titulo}>{secao2}</Text>
                              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                   <Quadrado imagem={cachorro2} icone={"close"} style={estilos.quadrado}/>
                                   <Quadrado imagem={cachorro} icone={"check"}/>
                              </View>
                         </View> 
                         <View style={{marginTop: 16}}>
                              <Text style={estilos.titulo}>{secao3}</Text>
                              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                   <Quadrado imagem={iluminacao} icone={"close"}/>
                                   <Quadrado imagem={cachorro} icone={"check"}/>
                              </View>
                         </View> 
                    </View>
                    <BotaoLg texto={"Identificar"} ativo={true} onPress={() => navigation.navigate("CameraScreen")}/>
               </View>
     </ScrollView>
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          padding: 24,
          rowGap: 16
     },
     descricao: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "normal",
          textAlign: "justify",
          fontFamily: "CabinRegular",
          color: "#3F3F3F",
     },
     titulo: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "medium",
          textAlign: "justify",
          fontFamily: "CabinMedium",
          color: "#313131",
     },
     quadrado: {
          width: 40,
          height: 40
     },
});