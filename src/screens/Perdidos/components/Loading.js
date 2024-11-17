import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function Loading() {
     return <View style={estilos.container}>
          <ActivityIndicator size="large" color="#fff"/>
     </View>
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center", 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
     },
})