import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';

import Botao from "../../../components/Botao";

export default function BarraPesquisa({setPesquisa, pesquisa}) {
     return (
          <SearchBar placeholder="Procurar" platform="defaut" onChangeText={setPesquisa} value={pesquisa} containerStyle={estilos.searchContainer} inputContainerStyle={estilos.inputContainer} inputStyle={estilos.input} searchIcon={estilos.icon}/>
     )
}

const estilos = StyleSheet.create({
     searchContainer: {
          backgroundColor: '#f1f1f1',
          borderRadius: 45,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 40,
          padding: 0,
          justifyContent: "center"
     },
     inputContainer: {
          width: "100%",
          height: "100%",
          backgroundColor: '#ffffff',
          borderRadius: 45,
          height: 40,
          elevation: 6
     },
     input: {
          color: '#000',
          fontSize: 14
     },
     leftIcon: {
          marginLeft: 10,
     },
     rightIcon: {
          marginRight: 10,
     },
     icon: {
          color: "#EF9C66"
     }
});