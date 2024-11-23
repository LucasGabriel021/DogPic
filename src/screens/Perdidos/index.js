import React, { useState, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext";

import Pesquisa from "./components/Pesquisa";
import Card from "../../components/Card";
import buscarAnuncios from "../../services/buscarAnuncios";
import Topo from "../../components/Topo";
import Loading from "../../components/Loading";

export default function Localizar({navigation}) {
     const { user } = useContext(UserContext);

     const [listaAnuncios, setListaAnuncios] = useState([]);
     const [loading, setLoading] = useState(false);

     useFocusEffect(
          React.useCallback(() => {
               const fetchAnuncios = async () => {
                    setLoading(true);
                    try {
                         const anuncios = await buscarAnuncios();
                         setListaAnuncios(anuncios);
                    } catch (error) {
                         console.error("Erro ao buscar os dados: ", error);
                    } finally {
                         setLoading(false);
                    }
               }
               fetchAnuncios();
          }, [])
     )

     const renderItem = ({ item }) => {
          return <Card imagem={item.imageUrl} nome={item.nome} raca={item.raca} localizacao={item.localizacao} onPress={() => navigation.navigate("DetalhesAnuncio", { item })}/>
     }

     return (
          <SafeAreaView style={estilos.safeArea}>
               {loading && <Loading/>}
               <View style={estilos.container}>
                    <Topo navigation={ navigation }/>
                    <Pesquisa navigation={ navigation }/>
                    <FlatList 
                         style={{marginTop: 16}}
                         data={listaAnuncios}
                         renderItem={renderItem}
                         keyExtractor={(item) => item.id}
                    />
                    {user && 
                         <TouchableOpacity style={estilos.btnIconeAdd} onPress={() => navigation.navigate("Anuncio")}>
                              <Ionicons name="add" size={24} color={"#fff"}/>
                         </TouchableOpacity>
                    }
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
          paddingHorizontal: 24,
          backgroundColor: "#F1F1F1",
     },
     btnIconeAdd : {
          width: 54,
          height: 54,
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 12,
          backgroundColor: "#EF9C66",
          borderRadius: 999,
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 999,
          marginBottom: 24,
          marginRight: 24
     }
})