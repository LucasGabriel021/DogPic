import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

export default function BotaoScanner({ children, onPress }) {
     return (
       <Pressable style={{
           justifyContent: 'center',
           alignItems: 'center',
         }}
         onPress={onPress}
       >
         <View style={estilos.container}>
           {children}
         </View>
       </Pressable>
     );
}

const estilos = StyleSheet.create({
     container: {
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#EF9C66',
          justifyContent: "center",
          alignItems: 'center',
     },
})