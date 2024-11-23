import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import cachorro from "../../../assets/img/cachorro04.png";
import Botao from "../../components/BotaoLg";
import { redefinirStackSair } from "../../utils/redefinirStack";

const { height } = Dimensions.get("window");
const altura = height * 0.4;

export default function Autenticacao({ navigation }) {
     return (
          <SafeAreaView style={estilos.container}>
               <Image source={cachorro} style={estilos.imagem} resizeMode="contain"/>
               <Text style={estilos.titulo}>Faça parte da {"\n"} família DogPic</Text>
               <View style={{marginTop: 8, width: "100%", rowGap: 8}}>
                    <Botao ativo={true} texto={"Registrar"} onPress={() => navigation.navigate("Registrar")}/>
                    <Botao texto={"Login"} onPress={() => navigation.navigate("Login")}/>
               </View>
          </SafeAreaView>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          padding: 24,
          backgroundColor: "#F1F1F1",
          justifyContent: "center",
          alignItems: "center"
     },
     imagem: {
          width: "80%",
          height: altura
     },
     titulo: {
          fontFamily: "CabinBold",
          fontSize: 34,
          lineHeight: 43,
          color: "#8E8E8E",
          textAlign: "center"
     }
})