import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import { auth } from "../../config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import placeholder from "../../../assets/img/profile-default.png"
import Card from "../../components/Card";
import CardHistorico from "./components/CardHistorico";
import buscarAnuncios from "../../services/buscarAnuncios";

export default function Perfil({ navigation }) {
     const user = auth.currentUser;

     const [btnAtivo, setBtnAtivo] = useState("Histórico");
     const [listaAnuncios, setListaAnuncios] = useState([]);

     useFocusEffect(
          React.useCallback(() => {
               const fetchAnuncios = async () => {
                    const anuncios = await buscarAnuncios();
                    const anunciosPerfil = anuncios.filter(item => item.email === user.email);
                    setListaAnuncios(anunciosPerfil);
                    console.log(listaAnuncios);
               }
               fetchAnuncios();
          }, [])
     )

     const aplicarFiltro = (filtro) => {
          setBtnAtivo(filtro);
     }

     const renderItem = ({ item }) => {
          return <Card imagem={item.imageUrl} nome={item.nome} raca={item.raca} localizacao={item.localizacao} icone={"ellipsis-vertical"} opcoes={true} onPress={() => navigation.navigate("DetalhesAnuncio", { item })} />
     }

     return (
          <View style={estilos.container}>
               <View style={{ alignItems: "center", rowGap: 16 }}>
                    {user.photoURL ? (
                         <Image source={{ uri: user.photoURL }} style={estilos.imagemPerfil} />
                    ) : (
                         <Image source={placeholder} style={estilos.imagemPerfil} />
                    )}
                    <View style={{ alignItems: "center", rowGap: 4 }}>
                         <View style={{ flexDirection: "row", columnGap: 8, alignItems: "center" }}>
                              <Text style={estilos.nome}>{user.displayName}</Text>
                         </View>
                         <Text style={estilos.email}>{user.email}</Text>
                    </View>
               </View>
               <View style={{ flexDirection: "row", justifyContent: "center", columnGap: 8, marginTop: 24 }}>
                    <TouchableOpacity style={estilos.btn} onPress={() => aplicarFiltro("Histórico")}>
                         <Text style={[estilos.texto, btnAtivo === "Histórico" && estilos.textoAtivo]}>Histórico de scanners</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.btn} onPress={() => aplicarFiltro("Anúncios")}>
                         <Text style={[estilos.texto, btnAtivo === "Anúncios" && estilos.textoAtivo]}>Anúncios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.btnIcone} onPress={() => navigation.navigate("EditarPerfil")}>
                         <Ionicons name="pencil" size={16} color="#909090" />
                    </TouchableOpacity>
               </View>
               {btnAtivo === "Histórico" ?
                    <View style={estilos.conteudo}>
                         <CardHistorico nome={"Shi Tzu"} data={"18/03/2003"} icone={"trash-outline"} onPress={()=> {console.log("Histórico")}}/>
                    </View>
                    :
                    <View style={estilos.conteudo}>
                         {listaAnuncios.length !== 0 ?
                              <FlatList
                                   data={listaAnuncios}
                                   keyExtractor={(item) => item.id}
                                   renderItem={renderItem}
                              />
                              :
                              <Text style={estilos.textoInfo}>Ainda não há nenhum anúncio criado</Text>
                         }

                         <TouchableOpacity style={estilos.btnIconeAdd} onPress={() => navigation.navigate("Anuncio")}>
                              <Ionicons name="add" size={24} color={"#fff"} />
                         </TouchableOpacity>
                    </View>
               }
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#F1F1F1",
          padding: 24
     },
     imagemPerfil: {
          width: 100,
          height: 100,
          borderWidth: 4,
          borderColor: "#EF9C66",
          borderRadius: 999
     },
     nome: {
          fontFamily: "CabinMedium",
          fontSize: 18,
          color: "#313131"
     },
     email: {
          fontFamily: "CabinMedium",
          fontSize: 12,
          color: "#8391A1"
     },
     btn: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: "#fff",
          borderRadius: 6
     },
     btnIcone: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: "#fff",
          borderRadius: 6
     },
     texto: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          color: "#909090"
     },
     textoAtivo: {
          color: "#EF9C66"
     },
     conteudo: {
          flex: 1,
          marginTop: 24,
          position: "relative"
     },
     btnIconeAdd: {
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
     },
     textoInfo: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131",
          opacity: 0.5,
          textAlign: "center"
     }
});