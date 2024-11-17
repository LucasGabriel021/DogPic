import React from "react-native";
import { View, Image, StyleSheet } from "react-native";

import logo from "../../../../assets/img/logo-horizontal.png";
import profileDefault from "../../../../assets/img/profile-default.png";

export default function Topo() {
     return <View style={estilos.topo}>
          <Image source={logo} style={estilos.imgLogo} accessibilityLabel="DogPic"/>
          {/* <Image source={profileDefault} style={estilos.imgProfile} accessibilityLabel="Perfil"/> */}
     </View>
}

const estilos = StyleSheet.create({
     topo: {
          width: "100%",
          height: 80,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
     },
     imgLogo: {
          width: 105,
          height: 40
     },
     imgProfile: {
          height: 38,
          width: 38
     }
});