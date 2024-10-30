import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function BotaoPegarFoto({texto, tema, onPress}) {
     if(tema === "primary") {
          return (
               <Pressable style={[estilos.botao, {backgroundColor: "#fff"}]} onPress={onPress}>
                    <Text style={[estilos.texto, {color: "#25292e"}]}>{texto}</Text>
               </Pressable>
          );
     }

     return (
          <Pressable style={estilos.botao} onPress={onPress}>
               <Text style={estilos.texto}>{texto}</Text>
          </Pressable>
     )
}

const estilos = StyleSheet.create({
     botao: {
          width: "100%",
          height: "auto",
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#EF9C66",
          borderRadius: 6, 
          paddingHorizontal: 16,
          paddingVertical: 8
     },
     icone: {
          paddingRight: 8,
     },
     texto: {
          color: '#fff',
          fontSize: 16,
     }
});