import React, { useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import BotaoPegarFoto from "./components/BotaoPegarFoto";
import placeholder from "../../../assets/img/placeholder-dog.png";
import { analiseDogScan } from "../../services/analiseDogScan";

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
          });

          if(!resultado.canceled) {
               console.log(resultado);
               setImagemSelecionada({ uri: resultado.assets[0].uri });

               // Ler o arquivo selecionado como base64
               const base64Image = await FileSystem.readAsStringAsync(resultado.assets[0].uri, { encoding: "base64" });
               setImagemBase64(base64Image); // Armazena a imagem base64
          } else {
               alert("Você não selecionou nenhuma imagem!");
          }
     }

     const handleScan = async () => {
          if(imagemBase64) {
               try {
                    const resultadoAnalise = await analiseDogScan(imagemBase64);
                    console.log("Resultado da anáçise: ", resultadoAnalise);
               } catch (error) {
                    console.error("Erro durante a análise: ", error);
               }
          } else {
               alert("Por favor, selecione uma imagem primeiro");
          }
     }

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