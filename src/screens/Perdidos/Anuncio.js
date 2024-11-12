import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import {Picker} from '@react-native-picker/picker';

import Botao from "../../components/BotaoLg";
import racas from "../../mocks/racas";

import addDados from "../../services/criarAnuncio";

export default function Anuncio({navigation}) {
     const [fotoAnuncio, setFotoAnuncio] = useState(null);
     const [nomeCachorro, setNomeCachorro] = useState("");
     const [descricaoAnuncio, setDescricaoAnuncio] = useState("");
     const [ultimaLocalizacao, setUltimaLocalizacao] = useState("");
     const [selecaoRaca, setSelecaoRaca] = useState(null);
     const [dados, setDados] = useState({
          foto: null,
          nome: "",
          descricao: "",
          localizacao: "",
          raca: null
     });

     useEffect(() => {
          setDados({
               foto: fotoAnuncio,
               nome: nomeCachorro,
               descricao: descricaoAnuncio,
               localizacao: ultimaLocalizacao,
               raca: selecaoRaca
          })

     }, [fotoAnuncio, nomeCachorro, descricaoAnuncio, ultimaLocalizacao, selecaoRaca])

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
                         <TextInput style={estilos.input} value={nomeCachorro} onChangeText={(value) => setNomeCachorro(value)}/>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Descrição do anúncio</Text>
                         <TextInput style={[estilos.input, {height: 100, textAlignVertical: "top"}]} editable numberOfLines={5} multiline maxLength={100} value={descricaoAnuncio} onChangeText={(value) => setDescricaoAnuncio(value)}/>
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
                         <TextInput style={estilos.input} value={ultimaLocalizacao} onChangeText={(value) => setUltimaLocalizacao(value)}/>
                    </View>
                    <Botao ativo={false} texto={"Adicione uma foto"} onPress={pegarFotoAnuncio}/>
                    <View style={{width: "100%", height: 2, backgroundColor: "#E8ECF4", marginVertical: 16}}/>
                    <Botao ativo={true} texto={"Criar anúncio"} onPress={() => addDados(dados)}/>
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