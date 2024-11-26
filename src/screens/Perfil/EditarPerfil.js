import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { UserContext } from "../../context/UserContext";

import Botao from "../../components/BotaoLg";
import pegarImagem from "../../utils/pegarImagem";
import atualizarUsuario from "../../services/atualizarUsuario";

export default function EditarPerfil({ navigation }) {
     const { user, setUser } = useContext(UserContext);

     const [nome, setNome] = useState(user.displayName);
     const [foto, setFoto] = useState(user.photoURL);
     const [fotoAlterada, setFotoAlterada] = useState(false);

     const selecionarFoto = async () => {
          const imagem = await pegarImagem();
          if(imagem) {
               setFoto(uri);
               setFotoAlterada(true)
          }
     }

     const handleSalvarAlteracoes = async () => {
          if(!nome.trim()) {
               Alert.alert("O nome não pode ser vazio.");
               return;
          }

          try {
               const dadosAtualizados = { displayName: nome }
               if(fotoAlterada) {
                    dadosAtualizados.photoURL = foto;
               }

               const usuarioAtualizado = await atualizarUsuario(user.uid, dadosAtualizados);
               setUser(usuarioAtualizado); // Atualiza o contexto com os novos dados
               Alert.alert("Perfil atualizado com sucesso.");
               navigation.goBack();
          } catch (error) {
               console.error("Erro ao atualizar o perfil: ", error);
               Alert.alert("Erro, Não foi possível atualizar o perfil.");
          }
     }

     return (
          <View style={estilos.container}>
               <View style={{ width: "100%", alignItems: "center", marginBottom: 16 }}>
                    <TouchableOpacity style={estilos.btnImagem} onPress={() => selecionarFoto()}>
                         <Image source={{ uri: foto }} style={estilos.imagemPerfil} />
                    </TouchableOpacity>
                    <Text style={estilos.texto}>Editar foto</Text>
               </View>
               <View style={{ marginBottom: 24 }}>
                    <Text style={estilos.textInput}>Informe seu nome *</Text>
                    <TextInput placeholder="Fulano" placeholderTextColor="#bebebe" style={estilos.input} value={nome} onChangeText={(value) => setnome(value)} />
               </View>
               <Botao ativo={true} texto={"Salvar as alterações"} onPress={() => handleSalvarAlteracoes()}/>
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          padding: 24,
          backgroundColor: "#fff"
     },
     btnImagem: {
          width: 100,
          height: 100,
          borderRadius: 999,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F7E2C4"
     },
     imagemPerfil: {
          width: 100,
          height: 100,
          borderRadius: 999,
     },
     texto: {
          marginTop: 8,
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131"
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
          borderRadius: 8,
          marginTop: 8,
          paddingHorizontal: 16,
          paddingVertical: 8,
          color: "#313131",
          borderBottomWidth: 2,
          borderColor: "#F1F1F1"
     },
});