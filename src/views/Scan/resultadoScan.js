import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, View, Image, ScrollView } from "react-native";

import placeholder from "../../../assets/img/placeholder-dog.png";
import racas from "../../mocks/racas";

const { height } = Dimensions.get("window");
const altura = height * 0.5;

export default function ResultadoScan({route}) {
     const { resultados } = route.params;
     console.log("Parametros: ", resultados);

     const [raca, setRaca] = useState("");
     const [porcentagem, setPorcentagem] = useState("");
     const [imagem, setImagem] = useState(placeholder);
     const [titulo, setTitulo] = useState("");
     const [descricao, setDescricao] = useState("");

     const pegarInfosRacas = (raca) => {
          console.log("Nome da raça: ", raca);

          const infoRaca = racas.find(item => item.raca === raca);
          console.log("Pesquisa: ", infoRaca);

          if(infoRaca) {
               setImagem(infoRaca.imagem);
               setTitulo(infoRaca.racaPt);
               setDescricao(infoRaca.descricao);
          } else {
               console.log("Raça não encontrada!");
          }
     }

     useEffect(() => {
          if(resultados && resultados.length > 0) {
               setRaca(resultados[0].name); 
               setPorcentagem(resultados[0].probability);
               pegarInfosRacas(resultados[0].name);
          }
     }, [resultados]); // Executa sempre que resultados muda

     return (
          <ScrollView>
               <Image source={{uri: imagem}} style={estilos.imagem}/>
               <View style={estilos.container}>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Análise da foto</Text>
                         <Text style={estilos.paragrafo}>O cão que examinou possui <Text style={{color: "#EF9C66", fontWeight: "bold"}}>{porcentagem}%</Text> das características de um <Text style={{fontWeight: "bold"}}>{titulo}</Text></Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.subtitulo}>Demais raças analisadas</Text>
                         <View>
                              {resultados.map((value, index) => (
                                   <Text key={index}>{value.name}: <Text style={{ fontWeight: "bold" }}>{value.probability}%</Text></Text>
                              ))}
                         </View>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.subtitulo}>Descrição</Text>
                         <Text style={estilos.paragrafo}>{descricao}</Text>
                    </View>
               </View>
          </ScrollView>
     )
}

const estilos = StyleSheet.create({
     imagem: {
          width: "100%",
          height: altura
     }, 
     container: {
          flex: 1,
          padding: 24,
          rowGap: 16
     },
     conteudo: {
          rowGap: 8
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
          textAlign: "justify"
     }
});