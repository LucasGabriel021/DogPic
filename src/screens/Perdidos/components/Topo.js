import Ract, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import BarraPesquisa from "./BarraPesquisa";

export default function Topo({navigation}) {
     return (
          <View style={estilos.container}>
               <View style={{flex: 1}}>
                    <BarraPesquisa/>
               </View>
               <TouchableOpacity style={estilos.btnAdd} onPress={() => navigation.navigate("Anuncio")}>
                    <Ionicons name="add" size={24} color={"#fff"}/>
               </TouchableOpacity>
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          flexDirection: "row",
          alignItems: "center",
          columnGap: 16,
     },
     btnAdd: {
          width: 40, 
          height: 40,
          borderRadius: 9999,
          backgroundColor: "#EF9C66",
          alignItems: "center",
          justifyContent: "center"
     }
});