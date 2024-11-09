import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Topo from "./components/Topo";
import Card from "./components/Card";

export default function Localizar({navigation}) {
     return (
          <SafeAreaView style={estilos.safeArea}>
               <View style={estilos.container}>
                    <Topo navigation={navigation}/>
                    <View style={{marginTop: 16, rowGap: 8}}>
                         <Card nome={"Thor"} raca={"Shi Tzu"} localizacao={"Brasília"}/>
                         <Card nome={"Thor"} raca={"Shi Tzu"} localizacao={"São Paulo"}/>
                    </View>
               </View>
          </SafeAreaView>
     )
}

const estilos = StyleSheet.create({
     safeArea: {
          flex: 1,
          backgroundColor: "#F1F1F1",
     },
     container: {
          flex: 1,
          padding: 24,
          backgroundColor: "#F1F1F1",
     },
})