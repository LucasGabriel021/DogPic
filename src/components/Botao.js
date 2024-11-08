import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

export default function Botao({ativo, texto, onPress}) {
     const estilos = estilosFunc(ativo);

     return <Pressable onPress={onPress} style={estilos.botao}>
          <Text style={estilos.texto}>{texto}</Text>
     </Pressable>
}

const estilosFunc = (ativo) => StyleSheet.create({
     botao: {
          paddingHorizontal: 8,
          paddingVertical: 8,
          backgroundColor: ativo ? "#EF9C66" : "#ffffff",
          borderRadius: 16,
          flex: 1,
          elevation: 6,
     },
     texto: {
          color: ativo ? "#ffffff" : "#EF9C66",
          textAlign: "center",
          fontSize: 12,
          fontWeight: "medium",
          fontFamily: "CabinMedium",
     }
});