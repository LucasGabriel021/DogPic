import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import placeholder from "../../assets/img/placeholder-dog.png";
import { Ionicons } from "@expo/vector-icons";

export default function Card({ imagem, nome, raca, localizacao, opcoes, icone, onPress, onPressExcluir, onPressEditar }) {
     const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

     useFocusEffect(
          React.useCallback(() => {
               setMostrarOpcoes(false);
          }, [])
     )

     return (
          <TouchableOpacity style={estilos.container} onPress={onPress}>
               <View style={{ flexDirection: "row", columnGap: 16 }}>
                    <Image source={imagem ? { uri: imagem } : placeholder} style={estilos.imagem} />
                    <View style={{ justifyContent: "center" }}>
                         <Text style={[estilos.texto, { fontWeight: "bold", fontSize: 16 }]}>{nome}</Text>
                         <Text style={estilos.texto}>{raca}</Text>
                         <View style={{ flexDirection: "row", alignItems: "center", columnGap: 2 }}>
                              <Ionicons name="location" size={12} color={"#909090"} />
                              <Text style={[estilos.texto, { color: "#909090", fontSize: 14 }]}>{localizacao}</Text>
                         </View>
                    </View>
               </View>
               {opcoes && (
                    <View style={{alignItems: "flex-end", rowGap: 4, position: "relative"}}>
                         <TouchableOpacity onPress={() => setMostrarOpcoes(!mostrarOpcoes)}>
                              <Ionicons name={icone} size={16} color={"#313131"} />
                         </TouchableOpacity>
                         {mostrarOpcoes && (
                              <View style={estilos.menu}>
                                   <TouchableOpacity style={estilos.btnOpcao} onPress={onPressExcluir}>
                                        <Text style={estilos.btnOpcaoTexto}>Excluir</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity style={estilos.btnOpcao} onPress={onPressEditar}>
                                        <Text style={estilos.btnOpcaoTexto}>Editar</Text>
                                   </TouchableOpacity>
                              </View>
                         )}
                    </View>
               )}
          </TouchableOpacity>
     )
}

const estilos = StyleSheet.create({
     container: {
          padding: 16,
          backgroundColor: "#fff",
          elevation: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 4,
          marginBottom: 16
     },
     imagem: {
          height: 80,
          width: 80,
          borderRadius: 6
     },
     texto: {
          fontFamily: "CabinMedium",
          fontSize: 12,
          fontWeight: "normal",
          color: "#313131"
     }, 
     menu: {
          position: "absolute",
          top: 0,
          right: 16,
          zIndex: 999,
          borderWidth: 1, 
          borderColor: "#ededed", 
          borderRadius: 2,
          alignItems: "center",
          backgroundColor: "#fff",
     },
     btnOpcao: {
          width: 100,
          height: 40,
          backgroundColor: "#fff",
          borderWidth: 1, 
          borderColor: "#fcfcfc",
          justifyContent: "center"
     },
     btnOpcaoTexto: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131",
          textAlign: "center"
     }
});