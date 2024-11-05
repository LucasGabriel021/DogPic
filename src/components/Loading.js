import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import LottieView from 'lottie-react-native';

import Animacao from "../../assets/animations/animation.json";

export default function Loading() {
     return <View style={estilos.container}>
          {/* <LottieView source={Animacao} autoPlay loop accessibilityLabel="Animação de carregamento"/> */}
          <ActivityIndicator size="large" color="#EF9C66"/>
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
          fontSize: 14,
          color: "#EF9C66",
          fontWeight: "bold"
     }
})