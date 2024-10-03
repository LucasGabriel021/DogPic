import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import Topo from "./components/Topo";
import BarraPesquisa from "../../components/BarraPesquisa";
import cachorro from "../../../assets/img/cachorro01.png";
import racas from "../../mocks/racas";

const { widthScreen } = Dimensions.get("window");

const renderItem = ({item}, navigation) => {
     return <Pressable style={estilos.cardLista} onPress={() => navigation.navigate("Raca", { item })}>
          <Image source={item.imagem} accessibilityLabel="Cachorro" style={estilos.imagemLista}/>
          <View>
               <Text style={estilos.textoRaca}>{item.raca}</Text>
               <Text style={estilos.textoPorte}>{item.porte}</Text>
          </View>
     </Pressable>
}

export default function Home({navigation}) {
     const [pesquisa, setPesquisa] = useState("");
     const [itensFiltrados, setItensFiltrados] = useState(racas);
     const [filtroPorte, setFiltroPorte] = useState("Todas");

     useEffect(() => {

          /**
           * A variável abaixo obtem os filtros tanto dos botões quanto da barra de pesquisa e
           * ao final será setado no state os resultados
           */
          const resultados = racas.filter(item => {
               const correspondePesquisa = item.raca.toLowerCase().includes(pesquisa.toLowerCase());
               const correspondePorte = filtroPorte === "Todas" || item.porte === filtroPorte;

               return correspondePesquisa && correspondePorte;
          });
          
          setItensFiltrados(resultados);
     }, [pesquisa, filtroPorte]); // Toda vez que esse valores forem alterados o useEffect será executado

     return <SafeAreaView style={estilos.safeArea}>
          <View style={estilos.container}>
               <Topo/>
               <View style={{flex: 1, rowGap: 16}}>
                    <Pressable style={estilos.card} onPress={() => navigation.navigate("Instrucao")}>
                         <Text style={estilos.textoCard}>Ver instruções de uso</Text>
                         <Image style={estilos.imagemCard} source={cachorro} accessibilityLabel="Cachorro"/>
                    </Pressable>
                    <BarraPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} setFiltroPorte={setFiltroPorte}/>
                    <FlatList
                         data={itensFiltrados}
                         renderItem={(props) => renderItem(props, navigation)}
                         keyExtractor={item => item.id}
                    />
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
          flex: 1,
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
          fontSize: widthScreen < 360 ? 16 : 14,
          lineHeight: 26,
          fontFamily: "CabinMedium",
          fontWeight: "bold",
          color: "#313131"
     },
     imagemCard: {
          height: 60,
          width: 60
     },
     cardLista: {
          width: "100%",
          height: 72,
          backgroundColor: "#ffffff",
          elevation: 3,
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          columnGap: 16,
          borderRadius: 4
     },
     imagemLista: {
          width: 40,
          height: 40,
          borderRadius: 999,
     },
     textoRaca: {
          fontSize: widthScreen < 360 ? 16 : 14,
          fontWeight: "bold",
          color: "#313131",
          fontFamily: "CabinBold"

     },
     textoPorte: {
          fontSize: widthScreen < 360 ? 14 : 12,
          fontWeight: "normal",
          fontFamily: "CabinRegular",
          color: "#3F3F3F",
     },
});