import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, View, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ProgressBar from 'react-native-progress/Bar';

import placeholder from "../../../assets/img/placeholder-dog.png";
import racas from "../../mocks/racas";
import Botao from "../../components/BotaoLg";

const { height } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;
const altura = height * 0.5;

export default function ResultadoScan({ route, navigation }) {
     const { resultados, imagemScan } = route.params;
     // console.log("Parametros: ", resultados);

     const [porcentagem, setPorcentagem] = useState("");
     const [imagem, setImagem] = useState(placeholder);
     const [titulo, setTitulo] = useState("");
     const [descricao, setDescricao] = useState("");
     const [doencas, setDoencas] = useState("");
     const [prevencoes, setPrevencoes] = useState("");
     const [porte, setPorte] = useState("");

     /**
      * Função que pega as informações da raça no BD com porcetagem 
      * mais forte e apresenta ao usuário
      */
     const pegarInfosRacas = (raca) => {
          // console.log("Nome da raça: ", raca);

          const infoRaca = racas.find(item => item.raca === raca);
          // console.log("Pesquisa: ", infoRaca);

          if (infoRaca) {
               setTitulo(infoRaca.racaPt);
               setDescricao(infoRaca.descricao);
               setImagem(imagemScan);
               setPrevencoes(infoRaca.tratamentosDoencas);
               setDoencas(infoRaca.possiveisDoencas);
               setPorte(infoRaca.porte);
          } else {
               console.log("Raça não encontrada!");
          }
     }

     useEffect(() => {
          if (resultados && resultados.length > 0) {
               setPorcentagem(resultados[0].probability);
               pegarInfosRacas(resultados[0].name);
          }
     }, [resultados]); // Executa sempre que resultados muda

     return <ScrollView>
               <Image source={imagem} style={estilos.imagem}/>
               <View style={estilos.container}>
                    <View style={[estilos.conteudo, {rowGap: 24}]}>
                         <Text style={estilos.titulo}>Análise obtida pela imagem</Text>
                         {resultados.map((item, index) => {
                              const racaEncontrada = racas.find(raca => raca.raca === item.name);
                              const imagemRaca = racaEncontrada ? { uri: racaEncontrada.imagem } : placeholder;
                         
                              return (
                                   <View style={{flexDirection: "row", columnGap: 8, alignItems: "center"}} key={index}>
                                        <Image source={imagemRaca} style={{width: 54, height: 54, borderRadius: 12, elevation: 2}}/>
                                        <View style={{rowGap: 2}}>
                                             <Text style={{color: "#515151", fontWeight: "bold"}}>{item.name}</Text>
                                             <Text style={{color: "#9E9E9E"}}>Corresponde a {item.probability}%</Text>
                                        </View>
                                   </View>
                              )
                         })}
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Descrição</Text>
                         <Text style={estilos.paragrafo}>{descricao} Seu porte é considerado <Text style={{fontWeight: "bold"}}>{porte}.</Text></Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Possíveis doenças</Text>
                         <Text style={estilos.paragrafo}>{doencas}</Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Prevenções</Text>
                         <Text style={estilos.paragrafo}>{prevencoes}</Text>
                    </View>
                    <Botao texto="Refazer análise" onPress={() => navigation.navigate("Camera")} ativo={true}/>
               </View>
          </ScrollView>
}

const estilos = StyleSheet.create({
     imagem: {
          width: "100%",
          height: altura,
     },
     container: {
          padding: 24,
          rowGap: 16,
     },
     conteudo: {
          rowGap: 8,
          width: "100%",
          elevation: 0.5,
          padding: 16,
          backgroundColor: "#ECECEC",
          borderRadius: 16
     },
     titulo: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#313131",
     },
     paragrafo: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "normal",
          color: "#515151",
          textAlign: "justify",
          flexWrap: 'wrap',
     }, 
});