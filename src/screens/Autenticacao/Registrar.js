import React, { useState, } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import uploadImagemPerfil from "../../services/uploadImagemPerfil";

import pegarImagem from "../../utils/pegarImagem";
import Botao from "../../components/BotaoLg";
import bgLogin from "../../../assets/img/bg-login.png";
import Loading from "../../components/Loading";

const { height } = Dimensions.get("window");
const altura = height * 0.3;

export default function Registrar({ navigation }) {
     const [imagemPerfil, setImagemPerfil] = useState(null);
     const [nome, setNome] = useState("");
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");
     const [mostrarImagem, setMostrarImagem] = useState(false);
     const [loading, setLoading] = useState(false);

     const realizarRegistro = async () => {
          try {
               setLoading(true);
               // Criar usuário
               const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
               const user = userCredential.user;

               let fotoURL = null;
               if(imagemPerfil?.uri) {
                    fotoURL = await uploadImagemPerfil(imagemPerfil.uri, user.uid);
               }

               await updateProfile(user, {
                    displayName: nome,
                    photoURL: fotoURL
               });

               Alert.alert("Cadastro realizado com sucesso");
               navigation.navigate("Perfil");
          } catch (error) {
               if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("Este e-mail já está em uso. Tente outro.");
               } else if (error.code === 'auth/invalid-email') {
                    Alert.alert("O e-mail fornecido é inválido. Verifique e tente novamente.");
               } else if (error.code === 'auth/weak-password') {
                    Alert.alert("A senha deve ter pelo menos 6 caracteres.");
               } else {
                    console.error("Erro ao criar usuário: ", error);
                    Alert.alert("Ocorreu um erro, tente novamente.");
               }
          }
     }

     const pegarFotoPerfil = async () => {
          const uri = await pegarImagem();
          if (uri) {
               setImagemPerfil({ uri });
               setMostrarImagem(true);
          }
     }

     return (
          <ScrollView>
               {loading && <Loading/>}
               <Image source={bgLogin} style={estilos.imagemBg} />
               <View style={estilos.container}>
                    <Text style={estilos.titulo}>Faça seu cadastro para começar</Text>
                    <View style={{ marginTop: 12 }}>
                         <View style={{ width: "100%", alignItems: "center", marginBottom: 16 }}>
                              <TouchableOpacity style={estilos.btnImagem} onPress={() => pegarFotoPerfil()}>
                                   {mostrarImagem ?
                                        <Image source={imagemPerfil} style={estilos.imagemPerfil} />
                                        :
                                        <Ionicons name="camera" size={24} color="#EF9C66" />
                                   }
                              </TouchableOpacity>
                         </View>
                         <View style={{ marginBottom: 12 }}>
                              <Text style={estilos.textInput}>Informe seu nome *</Text>
                              <TextInput placeholder="Fulano" placeholderTextColor="#bebebe" style={estilos.input} value={nome} onChangeText={(value) => setNome(value)} />
                         </View>
                         <View style={{ marginTop: 12 }}>
                              <Text style={estilos.textInput}>Informe seu e-mail *</Text>
                              <TextInput keyboardType="email-address" placeholder="email@gmail.com" placeholderTextColor="#bebebe" style={estilos.input} value={email} onChangeText={(value) => setEmail(value)} />
                         </View>
                         <View style={{ marginVertical: 12 }}>
                              <Text style={estilos.textInput}>Informe sua senha *</Text>
                              <TextInput style={estilos.input} placeholder="******" placeholderTextColor="#bebebe" value={senha} onChangeText={(value) => setSenha(value)} secureTextEntry />
                         </View>
                    </View>
                    <Botao ativo={true} texto={"Cadastrar"} onPress={realizarRegistro} />
               </View>
          </ScrollView>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 18,
          marginTop: -24
     },
     imagemBg: {
          width: "100%",
          height: altura
     },
     titulo: {
          fontFamily: "CabinBold",
          fontSize: 24,
          color: "#313131",
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
     }
})