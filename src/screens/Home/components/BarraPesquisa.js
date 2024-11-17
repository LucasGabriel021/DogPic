import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';

import Botao from "../../../components/Botao";

export default function BarraPesquisa({setPesquisa, pesquisa, setFiltroPorte}) {
     const [btnAtivo, setBtnAtivo] = useState("Todas");

     const aplicarFiltro = (filtro) => {
          setBtnAtivo(filtro);
          setFiltroPorte(filtro);
          // console.log("Filtro aplicado: ", filtro);
     }

     return <View>
          <SearchBar placeholder="Pesquisar" platform="defaut" onChangeText={setPesquisa} value={pesquisa} containerStyle={estilos.searchContainer} inputContainerStyle={estilos.inputContainer} inputStyle={estilos.input} searchIcon={estilos.icon}/>
          <View style={estilos.secaoBtns}>
               <Botao texto={"Todas"} onPress={() => aplicarFiltro("Todas")} ativo={btnAtivo === "Todas"}/>
               <Botao texto={"Pequeno"} onPress={() => aplicarFiltro("Pequeno")} ativo={btnAtivo === "Pequeno"}/>
               <Botao texto={"Médio"} onPress={() => aplicarFiltro("Médio")} ativo={btnAtivo === "Médio"}/>
               <Botao texto={"Grande"} onPress={() => aplicarFiltro("Grande")} ativo={btnAtivo === "Grande"}/>
          </View>
     </View>
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
     },
     secaoBtns: {
          marginTop: 8,
          flexDirection: "row",
          columnGap: 4
     }
});