import React, { useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import BotaoPegarFoto from "./components/BotaoPegarFoto";
import placeholder from "../../../assets/img/placeholder-dog.png";

const { height } = Dimensions.get("screen");
const imagemHeight = height * 0.7;

export default function ScanScreen() {
     const [imagemSelecionada, setImagemSelecionada] = useState(placeholder);

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
          } else {
               alert("Você não selecionou nenhuma imagem!");
          }
     }

     return (
          <View style={estilos.container}>
               <View style={estilos.containerImagem}>
                    <Image source={imagemSelecionada} style={estilos.imagem}/>
               </View>
               <View style={estilos.containerBotoes}>
                    <BotaoPegarFoto tema="primary" texto="Selecionar foto" onPress={pickImageAsync}/>
                    <BotaoPegarFoto texto="Scannear"/>
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