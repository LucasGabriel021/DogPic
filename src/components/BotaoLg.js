import React from "react";
import { Text, Pressable, StyleSheet, Dimensions } from "react-native";

const { widthScreen } = Dimensions.get("window");

export default function Botao({ativo, texto, onPress}) {
     const estilos = estilosFunc(ativo);

     return <Pressable onPress={onPress} style={estilos.botao}>
          <Text style={estilos.texto}>{texto}</Text>
     </Pressable>
}

const estilosFunc = (ativo) => StyleSheet.create({
     botao: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: ativo ? "#EF9C66" : "#ffffff",
          borderRadius: 6,
          flex: 1,
          elevation: 6,
          height: 56,
          width: "100%",
          justifyContent: "center"
     },
     texto: {
          color: ativo ? "#ffffff" : "#EF9C66",
          textAlign: "center",
          fontSize: widthScreen < 360 ? 16 : 14,
          fontWeight: "medium",
          fontFamily: "CabinMedium",
     }
});