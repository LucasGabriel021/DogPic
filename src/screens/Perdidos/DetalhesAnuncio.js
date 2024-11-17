import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetalhesAnuncio({ route }) {
     const { item } = route.params;
     console.log("Item do card: ", item);

     return (
          <SafeAreaView style={estilos.safeArea}>
               <Text>Teste</Text>
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