import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

import Botao from "../../components/BotaoLg";
import racas from "../../mocks/racas";
import Loading from "../../components/Loading";
import reqEstadosIBGE from "../../services/reqEstadosIBGE";
import editarAnuncio from "../../services/editarAnuncio";

export default function Anuncio({ route, navigation }) {
     const { registro } = route.params;
     const id = registro.id;

     const [nomeCachorro, setNomeCachorro] = useState(registro.nome);
     const [idadeCachorro, setIdadeCachorro] = useState(registro.idade);
     const [descricaoAnuncio, setDescricaoAnuncio] = useState(registro.descricao);
     const [selecaoRaca, setSelecaoRaca] = useState(registro.raca);
     const [selecaoSexo, setSelecaoSexo] = useState(registro.sexo);
     const [listaEstados, setListaEstados] = useState([]);
     const [selecaoLocalizacao, setSelecaoLocalizacao] = useState(registro.localizacao);
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          const fecthEstados = async () => {
               const estados = await reqEstadosIBGE();
               setListaEstados(estados);
          }

          fecthEstados();
     }, [])


     const validaFormulario = () => {
          if (!nomeCachorro || !descricaoAnuncio || !selecaoLocalizacao || !selecaoRaca || !selecaoSexo) {
               Alert.alert("Por favor, preencha todos os campos.");
               return false;
          }
          return true;
     }

     const handleFormulario = async () => {
          if (validaFormulario()) {
               try {
                    setLoading(true);
                    await editarAnuncio({
                         id,
                         nome: nomeCachorro,
                         descricao: descricaoAnuncio,
                         raca: selecaoRaca,
                         sexo: selecaoSexo,
                         idade: idadeCachorro,
                    });
                    setLoading(false);
                    Alert.alert("Anúncio alterado com sucesso!");
                    navigation.goBack();
               } catch (error) {
                    setLoading(false);
                    console.error("Erro ao alterar anúncio ", error);
                    Alert.alert("Houve um problema ao alterar o anúncio. Tente novamente.");
               }
          }
     };

     return (
          <ScrollView style={estilos.safeArea}>
               {loading && <Loading />}
               <View style={estilos.container}>
                    <View>
                         <Text style={estilos.textInput}>Nome do cachorro *</Text>
                         <TextInput placeholder="Ex: Thor" placeholderTextColor="#bebebe" style={estilos.input} value={nomeCachorro} onChangeText={(value) => setNomeCachorro(value)} />
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Idade do cachorro *</Text>
                         <TextInput placeholder="Ex: 3" placeholderTextColor="#bebebe" style={estilos.input} value={idadeCachorro} onChangeText={(value) => setIdadeCachorro(value)} />
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Descrição do anúncio *</Text>
                         <TextInput placeholder="Ex: Cachorro está desaparecido" placeholderTextColor="#bebebe" style={[estilos.input, { height: 100, textAlignVertical: "top" }]} editable numberOfLines={6} multiline maxLength={200} value={descricaoAnuncio} onChangeText={(value) => setDescricaoAnuncio(value)} />
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Raça do cachorro *</Text>
                         <Picker style={estilos.picker} selectedValue={selecaoRaca} onValueChange={(value) => setSelecaoRaca(value)}>
                              <Picker.Item label="Selecione uma raça" value="default" enabled={false} />
                              {racas.map((item, index) => {
                                   return <Picker.Item key={index} label={item.racaPt} value={item.racaPt} />;
                              })}
                         </Picker>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Sexo do cachorro *</Text>
                         <Picker style={estilos.picker} selectedValue={selecaoSexo} onValueChange={(value) => setSelecaoSexo(value)}>
                              <Picker.Item label="Selecione o sexo" value="default" enabled={false} />
                              <Picker.Item label="Macho" value="Macho" />
                              <Picker.Item label="Fêmea" value="Femea" />
                         </Picker>
                    </View>
                    <View>
                         <Text style={estilos.textInput}>Ultima localização *</Text>
                         <Picker style={estilos.picker} selectedValue={selecaoLocalizacao} onValueChange={(value) => setSelecaoLocalizacao(value)}>
                              <Picker.Item label="Selecione sua localização" value="default" enabled={false} />
                              {listaEstados.map((item, index) => {
                                   return <Picker.Item key={index} label={item.nome} value={item.nome} />;
                              })}
                         </Picker>
                    </View>
                    <View style={{ width: "100%", height: 2, backgroundColor: "#E8ECF4", marginVertical: 16 }} />
                    <Botao ativo={true} texto={"Editar anúncio"} onPress={handleFormulario} />
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
})