import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import Topo from "./components/Topo";
import BarraPesquisa from "../../components/BarraPesquisa";

import cachorro from "../../../assets/img/cachorro01.png";

export default function Home({navigation}) {
     return <SafeAreaView style={estilos.safeArea}>
          <View style={estilos.container}>
               <Topo/>
               <View style={{rowGap: 16}}>
                    <Pressable style={estilos.card} onPress={() => navigation.navigate("Instrucao")}>
                         <Text style={estilos.textoCard}>Ver instruções de uso</Text>
                         <Image style={estilos.imagemCard} source={cachorro} accessibilityLabel="Cachorro"/>
                    </Pressable>
                    <BarraPesquisa/>
               </View>
          </View>
     </SafeAreaView>
     
}

const estilos = StyleSheet.create({
     safeArea: {
          flex: 1,
          backgroundColor: "#F1F1F1",
     },
     container: {
          paddingHorizontal: 24,
          backgroundColor: "#F1F1F1",
          rowGap: 16
     },
     card: {
          height: 100,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#ffffff",
          borderRadius: 6,
          elevation: 4
     },
     textoCard: {
          fontSize: 16,
          lineHeight: 26,
          fontFamily: "CabinMedium",
          fontWeight: "bold",
          color: "#313131"
     },
     imagemCard: {
          height: 60,
          width: 60
     }
});