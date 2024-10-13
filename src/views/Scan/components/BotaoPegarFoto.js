import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function BotaoPegarFoto({texto, tema, onPress}) {
     if(tema === "primary") {
          return (
               <View>
                    <Pressable style={[estilos.botao, {backgroundColor: "#fff"}]} onPress={onPress}>
                         <Text style={[estilos.texto, {color: "#25292e"}]}>{texto}</Text>
                    </Pressable>
               </View>
          );
     }

     return (
          <View>
               <Pressable style={estilos.botao} onPress={onPress}>
                    <Text style={estilos.texto}>{texto}</Text>
               </Pressable>
          </View>
     )
}

const estilos = StyleSheet.create({
     botao: {
          width: "auto",
          height: "auto",
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
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