import React, { useState } from "react";
import { Alert, Text, View, StyleSheet, TextInput, Image, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import Botao from "../../components/BotaoLg";
import racas from "../../mocks/racas";
import addDados from "../../services/criarAnuncio";
import Loading from "./components/Loading";
import pegarImagem from "../../utils/pegarImagem";

const { height } = Dimensions.get("window");
const altura = height * 0.2;

export default function Anuncio({navigation}) {
     const [fotoAnuncio, setFotoAnuncio] = useState(null);
     const [fotoSelecionada, setFotoSelecionada] = useState(false);
     const [nomeCachorro, setNomeCachorro] = useState("");
     const [descricaoAnuncio, setDescricaoAnuncio] = useState("");
     const [ultimaLocalizacao, setUltimaLocalizacao] = useState("");
     const [selecaoRaca, setSelecaoRaca] = useState(null);
     const [loading, setLoading] = useState(false);

     const pegarFotoAnuncio = async () => {
          const uri = await pegarImagem();

          if(uri) {
               setFotoAnuncio({ uri });
               setFotoSelecionada(true);
          }
     }

     const validaFormulario = () => {
          if(!fotoAnuncio || !nomeCachorro || !descricaoAnuncio || !ultimaLocalizacao || !selecaoRaca) {
               Alert.alert("Por favor, preencha todos os campos.");
               return false;
          }
          return true;
     }

     const enviarFormulario = () => {
          if(validaFormulario()) {
               setLoading(true);
               addDados({
                    foto: fotoAnuncio,
                    nome: nomeCachorro,
                    descricao: descricaoAnuncio,
                    localizacao: ultimaLocalizacao,
                    raca: selecaoRaca
               })
               .then(() => {
                    setLoading(false);
                    Alert.alert("Anúncio criado com sucesso!");
                    navigation.goBack();
               })
               .catch((error) => {
                    setLoading(false);
                    console.error("Erro ao criar anúncio ", error);
                    Alert.alert("Houve um problema ap criar o anúncio. Tente novamente");
               });
          }
     }

     return (
          <ScrollView style={estilos.safeArea}>
               <View style={estilos.container}>
                    <View>
                         <Text style={estilos.textInput}>Nome do cachorro *</Text>
                         <TextInput placeholder="Ex: Thor" placeholderTextColor="#bebebe" style={estilos.input} value={nomeCachorro} onChangeText={(value) => setNomeCachorro(value)}/>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Descrição do anúncio *</Text>
                         <TextInput placeholder="Ex: Cachorro está desaparecido" placeholderTextColor="#bebebe" style={[estilos.input, {height: 100, textAlignVertical: "top"}]} editable numberOfLines={5} multiline maxLength={100} value={descricaoAnuncio} onChangeText={(value) => setDescricaoAnuncio(value)}/>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Raça do cachorro *</Text>
                         <Picker style={estilos.picker} selectedValue={selecaoRaca} onValueChange={(value) => setSelecaoRaca(value)}>
                         <Picker.Item label="Selecione uma raça" value="default" enabled={false} />
                              {racas.map((item, index) => {
                                   return <Picker.Item key={index} label={item.racaPt} value={item.racaPt}/>;
                              })}
                         </Picker>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Ultima localização *</Text>
                         <TextInput placeholder="Ex: Brasília - DF" placeholderTextColor="#bebebe" style={estilos.input} value={ultimaLocalizacao} onChangeText={(value) => setUltimaLocalizacao(value)}/>
                    </View>
                    <View>
                         <Botao ativo={false} texto={"Adicione uma foto"} onPress={pegarFotoAnuncio}/>
                         {fotoSelecionada && 
                              <View style={{marginTop: 16, position: "relative"}}>
                                   <TouchableOpacity style={estilos.btnRemoverFoto} onPress={() => {
                                        setFotoAnuncio(null);
                                        setFotoSelecionada(false);
                                   }}>
                                        <Ionicons name="close" size={18} color="#313131"/>
                                   </TouchableOpacity>
                                   <Image source={fotoAnuncio} style={estilos.imagem}/>
                                   <Text style={{fontSize: 12, color: "#EF9C66", fontWeight: "bold", textAlign: "center", marginTop: 4}}>Image adicionada com sucesso</Text>
                              </View>
                         }
                    </View>
                    <View style={{width: "100%", height: 2, backgroundColor: "#E8ECF4", marginVertical: 16}}/>
                    <Botao ativo={true} texto={"Criar anúncio"} onPress={enviarFormulario}/>
                    {loading && <Loading/>}
               </View>
          </ScrollView>
     )
}

const estilos = StyleSheet.create({
     safeArea: {
          flex: 1,
          backgroundColor: "#F1F1F1",
     },
     container: {
          flex: 1,
          padding: 24,
          rowGap: 12,
          backgroundColor: "#F1F1F1",
          position: "relative"
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
     },
     imagem: {
          width: "100%",
          height: altura,
          borderRadius: 6,
     },
     btnRemoverFoto: {
          width: 28, 
          height: 28, 
          borderRadius: 900, 
          backgroundColor: "#fff", 
          justifyContent: "center", 
          alignItems: "center", 
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
          marginTop: 8,
          marginRight: 8
     }
})