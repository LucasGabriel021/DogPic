import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import {Picker} from '@react-native-picker/picker';

import Botao from "../../components/BotaoLg";
import racas from "../../mocks/racas";

export default function Anuncio({navigation}) {
     const [fotoAnuncio, setFotoAnuncio] = useState(null);
     const [selecaoRaca, setSelecaoRaca] = useState(null);

     const pegarFotoAnuncio = async () => {
          let resultado = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.Images,
               allowsEditing: true,
               quality: 1,
               base64: true,
          });

          if (!resultado.canceled) {
               setFotoAnuncio({ uri: resultado.assets[0].uri });
               console.log(fotoAnuncio);
          } else {
               alert("Não foi selecionada nenhuma imagem!");
          }
     };

     return (
          <SafeAreaView style={estilos.safeArea}>
               <View style={estilos.container}>
                    <View>
                         <Text style={estilos.textInput}>Nome do cachorro</Text>
                         <TextInput style={estilos.input}/>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Descrição do anúncio</Text>
                         <TextInput style={[estilos.input, {height: 100, textAlignVertical: "top"}]} editable numberOfLines={5} multiline maxLength={100} />
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Raça do cachorro</Text>
                         <Picker style={estilos.picker} selectedValue={selecaoRaca} onValueChange={(value) => setSelecaoRaca(value)}>
                              {racas.map((item, index) => {
                                   return <Picker.Item key={index} label={item.racaPt} value={item.racaPt}/>;
                              })}
                         </Picker>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Ultima localização</Text>
                         <TextInput style={estilos.input}/>
                    </View>
                    <Botao ativo={false} texto={"Adicione uma foto"} onPress={pegarFotoAnuncio}/>
                    <View style={{width: "100%", height: 2, backgroundColor: "#E8ECF4", marginVertical: 16}}/>
                    <Botao ativo={true} texto={"Criar anúncio"} onPress={() => console.log("Criar anúncio!")}/>
               </View>
          </SafeAreaView>
     )
}

const estilos = StyleSheet.create({
     safeArea: {
          flex: 1,
          backgroundColor: "#F1F1F1",
     },
     container: {
          flex: 1,
          paddingHorizontal: 24,
          rowGap: 12,
          backgroundColor: "#F1F1F1",
     },
     textInput: {
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131",
          opacity: 0.5,
     },
     input: {
          width: "100%",
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 8,
          marginTop: 8,
          elevation: 0.5,
          paddingHorizontal: 16,
          paddingVertical: 8,
          color: "#313131"
     },
     picker: {
          width: "100%",
          height: 50,
          backgroundColor: "#fff",
          marginTop: 8,
          elevation: 0.5,
          paddingHorizontal: 16,
          paddingVertical: 8,
          color: "#313131"
     }
})