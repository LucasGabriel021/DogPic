import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import Botao from "../../components/BotaoLg";

export default function Registrar({ navigation }) {
     const [nome, setNome] = useState("");
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");

     const realizarRegistro = async () => {
          try {
               // Criar usuário
               const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
               const user = userCredential.user;

               await updateProfile(user, {
                    displayName: nome,
               });

               alert("Cadastro realizado com sucesso");
               navigation.navigate("HomeScreen");
          } catch (error) {
               // Tratar erros
               if (error.code === 'auth/email-already-in-use') {
                    alert("Este e-mail já está em uso. Tente outro.");
               } else if (error.code === 'auth/invalid-email') {
                    alert("O e-mail fornecido é inválido. Verifique e tente novamente.");
               } else if (error.code === 'auth/weak-password') {
                    alert("A senha deve ter pelo menos 6 caracteres.");
               } else {
                    // Outros erros
                    console.error("Erro ao criar usuário: ", error);
                    alert("Ocorreu um erro, tente novamente.");
               }
          }
     }

     return (
          <SafeAreaView style={estilos.container}>
               <Text style={estilos.titulo}>Faça seu cadastro para começar</Text>
               <View style={{marginTop: 8}}>
                    <View>
                         <Text style={estilos.textInput}>Informe seu nome *</Text>
                         <TextInput style={estilos.input} value={nome} onChangeText={(value) => setNome(value)}/>
                    </View>
                    <View style={{marginTop: 8}}>
                         <Text style={estilos.textInput}>Informe seu e-mail *</Text>
                         <TextInput keyboardType="email-address" style={estilos.input} value={email} onChangeText={(value) => setEmail(value)}/>
                    </View>
                    <View style={{marginTop: 8}}>
                         <Text style={estilos.textInput}>Informe sua senha *</Text>
                         <TextInput style={estilos.input} value={senha} onChangeText={(value) => setSenha(value)} secureTextEntry/>
                    </View>
               </View>
               <Botao ativo={true} texto={"Cadastrar"} onPress={realizarRegistro}/>
          </SafeAreaView>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: "#F1F1F1",
          rowGap: 16
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
          backgroundColor: "#fff",
          borderRadius: 8,
          marginTop: 8,
          elevation: 0.5,
          paddingHorizontal: 16,
          paddingVertical: 8,
          color: "#313131"
     },
})