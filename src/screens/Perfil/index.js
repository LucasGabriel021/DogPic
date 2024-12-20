import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert } from "react-native";
import { auth } from "../../config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import placeholder from "../../../assets/img/profile-default.png"
import Card from "../../components/Card";
import CardHistorico from "./components/CardHistorico";
import buscarAnuncios from "../../services/buscarAnuncios";
import buscarHistorico from "../../services/buscarHistorico";
import excluirRegistros from "../../utils/excluirRegistros";
import formatarDataDB from "../../utils/formatarDataDB";
import Loading from "../../components/Loading";

export default function Perfil({ navigation }) {
     const user = auth.currentUser;

     const [btnAtivo, setBtnAtivo] = useState("Histórico");
     const [listaAnuncios, setListaAnuncios] = useState([]);
     const [listaHistoricos, setListaHistoricos] = useState([]);
     const [loading, setLoading] = useState(false);

     useFocusEffect(
          React.useCallback(() => {
               fetchAnuncios();
               fetchHistoricos();
          }, [])
     )

     const handleExcluir = (id, imagemUrl, tipo) => {
          const titulo = tipo === "historico" ? "Excluir histórico" : "Excluir anúncio";
          const mensagem = tipo === "historico" ? "Tem certeza que deseja excluir este histórico?" : "Tem certeza que deseja excluir este anúncio?";
          const onPressHandler = async () => {
               setLoading(true);
               await excluirRegistros(id, imagemUrl, tipo);
               if (tipo === "historico") {
                    await fetchHistoricos();
               } else {
                    await fetchAnuncios(); // Certifique-se de ter essa função para anúncios
               }
          };

          Alert.alert(
               titulo,
               mensagem,
               [
                    { text: "Cancelar", style: "cancel" },
                    {
                         text: "Excluir",
                         style: "destructive",
                         onPress: onPressHandler,
                    },
               ]
          );
     };


     const fetchHistoricos = async () => {
          setLoading(true);
          const historicos = await buscarHistorico();
          const historicoPerfil = historicos.filter(item => item.emailUser === user.email);
          setListaHistoricos(historicoPerfil);
          setLoading(false);
     }

     const fetchAnuncios = async () => {
          setLoading(true);
          const anuncios = await buscarAnuncios();
          const anunciosPerfil = anuncios.filter(item => item.email === user.email);
          setListaAnuncios(anunciosPerfil);
          setLoading(false);
     }

     const aplicarFiltro = (filtro) => {
          setBtnAtivo(filtro);
     }

     const renderItem = ({ item }) => {
          return <Card imagem={item.imageUrl} nome={item.nome} raca={item.raca} localizacao={item.localizacao} icone={"ellipsis-vertical"} opcoes={true} onPressExcluir={() => handleExcluir(item.id, item.imageUrl, "anuncios")} onPressEditar={() => navigation.navigate("EditarAnuncio", { registro: item })} onPress={() => navigation.navigate("DetalhesAnuncio", { item })} />
     }

     const renderItemHistorico = ({ item }) => {
          const data = item.createAt;
          const dataObject = new Date(data.seconds * 1000);
          const dataFormatada = formatarDataDB(dataObject);

          return <CardHistorico imagem={item.imageUrl} nome={item.titulo} data={dataFormatada} icone={"trash-outline"} onPress={() => navigation.navigate("Historico", { registro: item })} onPressExcluir={() => handleExcluir(item.id, item.imageUrl, "historico")} />
     }

     return (
          <View style={estilos.container}>
               {loading && <Loading />}
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
                         {listaHistoricos.length !== 0 ?
                              <FlatList
                                   data={listaHistoricos}
                                   keyExtractor={(item) => item.id}
                                   renderItem={renderItemHistorico}
                              />
                              :
                              <Text style={estilos.textoInfo}>Ainda não há nenhum histórico de scanners</Text>
                         }
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