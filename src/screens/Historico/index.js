import React, { useState, useEffect } from "react";
import { Text, Dimensions, StyleSheet, View, Image, ScrollView } from "react-native";

import placeholder from "../../../assets/img/placeholder-dog.png";

const { height } = Dimensions.get("window");
const altura = height * 0.5;

export default function Historico({route}) {
     const { registro } = route.params;
     console.log("Histórico: ", registro);

     const [imagem, setImagem] = useState(placeholder);
     const [raca, setRaca] = useState("");
     const [descricao, setDescricao] = useState("");
     const [doencas, setDoencas] = useState("");
     const [prevencoes, setPrevencoes] = useState("");

     useEffect(() => {
          setImagem({ uri: registro.imageUrl });
          setRaca(registro.titulo);
          setDescricao(registro.descricao);
          setDoencas(registro.doencas);
          setPrevencoes(registro.prevencoes);
     }, []);

     return (
          <ScrollView>
               <Image source={imagem} style={estilos.imagem}/>
               <View style={estilos.container}>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Raça</Text>
                         <Text style={estilos.paragrafo}>Após a análise da imagem foi determinado que a raça predominante é um <Text style={{fontWeight: "bold"}}>{raca}.</Text> {descricao}</Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Possíveis doenças</Text>
                         <Text style={estilos.paragrafo}>{doencas}</Text>
                    </View>
                    <View style={estilos.conteudo}>
                         <Text style={estilos.titulo}>Prevenções</Text>
                         <Text style={estilos.paragrafo}>{prevencoes}</Text>
                    </View>
               </View>
          </ScrollView>
     )
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
          flexWrap: 'wrap',
     }, 
});