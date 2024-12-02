import React, { useContext } from "react";
import { Text, Image, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import generoMacho from "../../../assets/img/icone-macho.png";
import generoFemea from "../../../assets/img/icone-femea.png";
import formatarDataDB from "../../utils/formatarDataDB";

const { height } = Dimensions.get("window");
const imagemHeight = height * 0.5;

export default function Cachorro({ route }) {
     const { item } = route.params;

     const data = item.createAt;
     const dateObject = new Date(data.seconds * 1000);
     const dataFormatada = formatarDataDB(dateObject);

     return <ScrollView>
          <View style={estilos.container}>
               <Image style={estilos.imagem} source={{ uri: item.imageUrl }} accessibilityLabel="Cachorro" />
               <View style={estilos.containerInfos}>
                    <View style={estilos.conteudo}>
                         <View style={{ justifyContent: "center", rowGap: 4 }}>
                              <Text style={[estilos.titulo, { fontSize: 20 }]}>{item.nome}</Text>
                              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}>
                                   <Ionicons name="location-outline" size={24} color={"#909090"} />
                                   <Text style={estilos.paragrafo}>{item.localizacao}</Text>
                              </View>
                         </View>
                         <View style={estilos.containerIcone}>
                              <Image source={item.sexo === "Macho" ? generoMacho : generoFemea} style={[estilos.iconeGenero, item.sexo === "Macho" ? { width: 24, height: 24 } : { width: 16, height: 24 }]}/>
                         </View>

                    </View>
                    <View style={[estilos.conteudo, { marginTop: 16 }]}>
                         <View style={{ flexDirection: "row", columnGap: 8, alignItems: "center" }}>
                              <Image source={{ uri: item.fotoUsuario }} style={{ width: 64, height: 64, borderRadius: 999 }} />
                              <View>
                                   <Text style={[estilos.titulo, { fontSize: 16 }]}>{item.nomeUsuario}</Text>
                                   <Text style={[estilos.paragrafo]}>{item.email}</Text>
                                   <Text style={[estilos.paragrafo, { fontSize: 12 }]}>Postado dia: {dataFormatada}</Text>
                              </View>
                         </View>
                    </View>
                    <View style={[estilos.conteudo, { marginTop: 8, backgroundColor: "#FCDC94", padding: 8, borderWidth: 2, borderColor: "#EF9C66", borderRadius: 6 }]}>
                         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 4 }}>
                              <Text style={estilos.titulo}>Raça</Text>
                              <Text style={estilos.paragrafo}>{item.raca}</Text>
                         </View>
                         <View style={{ width: 2, height: "100%", borderRadius: 9999, backgroundColor: "#EF9C66" }} />
                         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                              <Text style={estilos.titulo}>Idade</Text>
                              <Text style={estilos.paragrafo}>{item.idade}</Text>
                         </View>
                    </View>
                    <View style={[estilos.conteudo, { marginTop: 16 }]}>
                         <Text style={[estilos.paragrafo]}>{item.descricao}</Text>
                    </View>
               </View>
          </View>
     </ScrollView>
}

const estilos = StyleSheet.create({
     container: {
          flex: 1
     },
     imagem: {
          width: "100%",
          height: imagemHeight,
     },
     containerInfos: {
          backgroundColor: "#f1f1f1",
          marginTop: -32,
          padding: 24,
          rowGap: 16,
          borderRadius: 34
     },
     conteudo: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
     },
     textoRaca: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#EF9C66",
          fontFamily: "CabinBold"
     },
     titulo: {
          fontSize: 16,
          lineHeight: 26,
          color: "#313131",
          fontFamily: "CabinBold"
     },
     paragrafo: {
          width: "auto",
          fontSize: 14,
          lineHeight: 20,
          color: "#515151",
          fontFamily: "CabinRegular",
          textAlign: "justify"
     },
     containerIcone: {
          width: 50,
          height: 50,
          borderRadius: 9999,
          backgroundColor: "#FCDC94",
          justifyContent: "center",
          alignItems: "center"
     },
     iconeGenero: {
          width: 18,
          height: 24
     }
});