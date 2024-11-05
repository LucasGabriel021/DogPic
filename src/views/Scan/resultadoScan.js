import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, View, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";

import placeholder from "../../../assets/img/placeholder-dog.png";
import racas from "../../mocks/racas";
import Botao from "../../components/BotaoLg";

const { height } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;
const altura = height * 0.4;

export default function ResultadoScan({ route, navigation }) {
     const { resultados, imagemScan } = route.params;
     // console.log("Parametros: ", resultados);

     const [raca, setRaca] = useState("");
     const [porcentagem, setPorcentagem] = useState("");
     const [imagem, setImagem] = useState(placeholder);
     const [titulo, setTitulo] = useState("");
     const [descricao, setDescricao] = useState("");
     const [doencas, setDoencas] = useState("");
     const [prevencoes, setPrevencoes] = useState("");
     const [porte, setPorte] = useState("");

     const coresGrafico = [
          "#EF9C66", 
          "#E3915C",
          "#FCDC94",
          "#DE8F5F",
          "#FFB26F", 
     ];

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

     /**
      * Função mapeia os dados vindo da análise e formata 
      * para a construção do gráfico
      */
     const chartData = resultados.map((item, index) => {
          // console.log("Mapeando item: ", item);
          return {
              name: item.name,
              population: parseFloat(item.probability),
              color: coresGrafico[index % coresGrafico.length],
              legendFontColor: "#7F7F7F",
              legendFontSize: 12
          };
     });

     useEffect(() => {
          if (resultados && resultados.length > 0) {
               setRaca(resultados[0].name);
               setPorcentagem(resultados[0].probability);
               pegarInfosRacas(resultados[0].name);
          }
     }, [resultados]); // Executa sempre que resultados muda

     return <ScrollView style={{paddingHorizontal: 24}}>
               <Image source={imagem} style={estilos.imagem}/>
               <View style={estilos.container}>
                    <View style={estilos.conteudo}>
                         <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8}}>
                              <Text style={estilos.titulo}>Análise da foto</Text>
                              <View style={estilos.etiqueta}>
                                   <Text style={{color: "#ffffff", fontFamily: "CabinRegular"}}>{porte}</Text>
                                   <FontAwesome5 name="paw" size={12} color={"#ffffff"}/>
                              </View>
                         </View>
                         <Text style={estilos.paragrafo}>O cão que examinou possui <Text style={{ color: "#EF9C66", fontWeight: "bold" }}>{porcentagem}%</Text> das características de um <Text style={{ fontWeight: "bold" }}>{titulo}</Text></Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.subtitulo}>Demais raças analisadas</Text>
                         <View>
                              <PieChart 
                                   data={chartData} 
                                   width={screenWidth - 48} 
                                   height={160} 
                                   chartConfig={{
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                   }}
                                   accessor={"population"}
                                   backgroundColor={"transparent"}
                                   absolute
                              />
                         </View>
                    </View>
                    <View style={{width: "100%", height: 2, backgroundColor: "#F3F4F6", borderRadius: 4}}/>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.subtitulo}>Descrição</Text>
                         <Text style={estilos.paragrafo}>{descricao}</Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.subtitulo}>Possíveis doenças</Text>
                         <Text style={estilos.paragrafo}>{doencas}</Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.subtitulo}>Prevenções</Text>
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
          borderRadius: 6,
          marginTop: 16
     },
     container: {
          paddingVertical: 24,
          rowGap: 16
     },
     conteudo: {
          rowGap: 8,
          width: "100%"
     },
     titulo: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#313131"
     },
     subtitulo: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#313131",
     },
     paragrafo: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "normal",
          color: "#313131",
          textAlign: "justify",
          flexWrap: 'wrap',
     }, 
     etiqueta: {
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          columnGap: 8,
          backgroundColor: "#EF9C66",
          borderRadius: 18
     }
});