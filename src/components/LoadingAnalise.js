import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from 'lottie-react-native';

import Animacao from "../../assets/animations/animation.json";

export default function LoadingAnalise() {
     return <View style={estilos.container}>
          <LottieView source={Animacao} style={estilos.animation} autoPlay loop accessibilityLabel="Animação de carregamento"/>
          <Text style={estilos.texto} accessibilityLabel="Analisando a imagem...">Analisando a imagem...</Text>
     </View>
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center", 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 999
     },
     texto: {
          marginTop: 8,
          fontSize: 14,
          color: "#EF9C66",
          fontWeight: "bold"
     },
     animation: {
          width: 250,
          height: 250, 
     }
})