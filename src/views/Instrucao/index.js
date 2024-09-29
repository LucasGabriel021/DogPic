import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, ScrollView } from "react-native";

import textos from "../../mocks/intrucoes";
import desfoque from "../../../assets/img/desfoque.png";
import cachorro from "../../../assets/img/cachorro02.png";
import cachorro2 from "../../../assets/img/cachorro03.png";
import iluminacao from "../../../assets/img/iluminacao.png";

import Quadrado from "./components/Quadrado";
import BotaoLg from "../../components/BotaoLg";

export default function Instrucao() {
     const { paragrafo, secao1, secao2, secao3 } = textos;

     console.log("Paragrafo: ", paragrafo);

     return <ScrollView>
               <View style={estilos.container}>
                    <Text style={estilos.texto}>{paragrafo}</Text>
                    <View>
                         <View>
                              <Text>{secao1}</Text>
                              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                   <Quadrado imagem={desfoque} icone={"close"}/>
                                   <Quadrado imagem={cachorro} icone={"check"}/>
                              </View>
                         </View> 
                         <View style={{marginTop: 16}}>
                              <Text>{secao2}</Text>
                              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                   <Quadrado imagem={cachorro2} icone={"close"} style={estilos.quadrado}/>
                                   <Quadrado imagem={cachorro} icone={"check"}/>
                              </View>
                         </View> 
                         <View style={{marginTop: 16}}>
                              <Text>{secao3}</Text>
                              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                   <Quadrado imagem={iluminacao} icone={"close"}/>
                                   <Quadrado imagem={cachorro} icone={"check"}/>
                              </View>
                         </View> 
                    </View>
                    <BotaoLg texto={"Identificar"} ativo={true}/>
               </View>
     </ScrollView>
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          padding: 24,
          rowGap: 16
     },
     texto: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "normal",
          color: "#000000",
          textAlign: "justify"
     },
     quadrado: {
          width: 40,
          height: 40
     },
});