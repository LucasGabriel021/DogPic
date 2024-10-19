import React, { useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import BotaoPegarFoto from "./components/BotaoPegarFoto";
import placeholder from "../../../assets/img/placeholder-dog.png";
import { analiseDogClarifai } from "../../services/analiseDogScan";

const { height } = Dimensions.get("screen");
const imagemHeight = height * 0.7;

export default function ScanScreen({navigation}) {
     const [imagemSelecionada, setImagemSelecionada] = useState(placeholder);
     const [imagemBase64, setImagemBase64] = useState(null); // Armazenar a versão base64
     
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
               setImagemBase64(resultado.assets[0].base64); // 

          } else {
               alert("Você não selecionou nenhuma imagem!");
          }
     }

     const handleScan = async () => {
          if (imagemBase64) {
              try {
                  const resultadoAnalise = await analiseDogClarifai(imagemBase64);
                  console.log("Resultado da análise: ", resultadoAnalise);
      
                  // Acessando os resultados
                  const outputs = resultadoAnalise.outputs;
                  if (outputs && outputs.length > 0) {
                      const data = outputs[0].data; // Acessa o primeiro output
      
                      // Exibir as raças e suas respectivas probabilidades
                      const classes = data.concepts;
                      if (classes) {
                          const topClasses = classes.slice(0, 6); // Limitar a 6 resultados
      
                          // Formatar e exibir os resultados
                          topClasses.forEach((concept) => {
                              const formattedValue = (concept.value * 100).toFixed(2); // Multiplica por 100 e formata com 2 casas decimais
                              console.log(`Raça: ${concept.name}, Probabilidade: ${formattedValue}%`); // Mostra os 6 resultados
                          });
                      }
                  }
              } catch (error) {
                  console.error("Erro durante a análise: ", error);
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
          marginTop: 16,
          flexDirection: "row",
          columnGap: 16
     },
});