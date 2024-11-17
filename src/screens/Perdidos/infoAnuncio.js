import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Topo from "./components/Topo";
import Card from "./components/Card";
import buscarAnuncios from "../../services/buscarAnuncios";

export default function Localizar({navigation}) {
     return (
          <SafeAreaView style={estilos.safeArea}>
               <View style={estilos.container}>
                    <Topo navigation={navigation}/>
                    <FlatList 
                         style={{marginTop: 8}}
                         data={listaAnuncios}
                         renderItem={renderItem}
                         keyExtractor={(item) => item.id}
                    />
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