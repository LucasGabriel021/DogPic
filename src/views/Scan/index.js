import React, { useState } from "react";
import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import BotaoPegarFoto from "./components/BotaoPegarFoto";
import placeholder from "../../../assets/img/placeholder-dog.png";
import { analiseDogClarifai } from "../../services/analiseDogScan";

const { height } = Dimensions.get("screen");
const imagemHeight = height * 0.4;

export default function ScanScreen({navigation}) {
     const [imagemSelecionada, setImagemSelecionada] = useState(placeholder);
     const [imagemBase64, setImagemBase64] = useState(null); // Armazenar a versão base64
     const [loading, setLoading] = useState(false);
     
     /**
      * Função que seleciona a imagem na galeria do dispositivo do usuário
      */
     const pickImageAsync = async () => {
          let resultado = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.Images,
               allowsEditing: true,
               quality: 1,
               base64: true,
          });

          if(!resultado.canceled) {
               // console.log(resultado);
               setImagemSelecionada({ uri: resultado.assets[0].uri });
               setImagemBase64(resultado.assets[0].base64); 

          } else {
               alert("Você não selecionou nenhuma imagem!");
          }
     }

     const handleScan = async () => {
          if (imagemBase64) {
               setLoading(true); // Iniciar loading
              try {
                  const resultadoAnalise = await analiseDogClarifai(imagemBase64);
                  console.log("Resultado da análise: ", resultadoAnalise);
      
                  // Acessando os resultados
                  const outputs = resultadoAnalise.outputs;
                  if (outputs && outputs.length > 0) {
                      const data = outputs[0].data; // Acessa o primeiro output
                      const classes = data.concepts; // Exibir as raças e suas respectivas probabilidades
                      const topClasses = classes.slice(0, 5).map(concept => ({
                         name: concept.name,
                         probability: (concept.value * 100).toFixed(2)
                      }));

                      console.log("Dados: ", topClasses);

                      // Navegar para a tela de Resultados e passar os parâmetros
                      navigation.navigate("Resultado", {imagemScan: imagemSelecionada, resultados: topClasses});
                  }
              } catch (error) {
                  console.error("Erro durante a análise: ", error);
              } finally {
               setLoading(false);
              }
          } else {
              alert("Por favor, selecione uma imagem primeiro");
          }
      };
      

     return (
          <View style={estilos.container}>
               <View style={estilos.containerImagem}>
                    <Image source={imagemSelecionada} style={estilos.imagem}/>
               </View>
               <View style={estilos.containerBotoes}>
                    <BotaoPegarFoto tema="primary" texto="Selecionar foto" onPress={pickImageAsync}/>
                    <BotaoPegarFoto texto="Scannear" onPress={handleScan}/>
               </View>
               {loading && <ActivityIndicator size="large" color="#000000" style={{marginTop: 20}}/>}
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: "center",
          padding: 24
     },
     containerImagem: {
          width: "100%",
          height: imagemHeight,
          borderRadius: 6
     },
     imagem: {
          width: "100%",
          height: "100%",
          borderRadius: 6
     },
     containerBotoes: {
          width: "100%",
          marginTop: 16,
          rowGap: 16
     },
});