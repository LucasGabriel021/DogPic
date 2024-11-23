import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from "react-native";

import bgLogin from "../../../assets/img/bg-login.png";
import Loading from "../../components/Loading";
import Botao from "../../components/BotaoLg";
import fazerLogin from "../../utils/fazerLogin";
import enviarEmailRecuperacao from "../../utils/enviarEmailRecuperacao";

const { height } = Dimensions.get("window");
const altura = height * 0.3;

export default function Login({navigation}) {
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");
     const [loading, setLoading] = useState(false);

     const logar = () => {
          if(!email || !senha) {
               Alert.alert("Por favor, preencha todos os campos.")
          }
          setLoading(true);
          fazerLogin(email, senha, navigation);
     }

     return (
          <ScrollView contentContainerStyle={estilos.scrollContainer}>
               {loading && <Loading/>}
               <Image source={bgLogin} style={estilos.imagemBg}/>
               <View style={estilos.container}>
                    <Text style={estilos.titulo}>Bem vindo de volta</Text>
                    <View style={{ marginTop: 12 }}>
                         <View style={{ marginTop: 12 }}>
                              <Text style={estilos.textInput}>Email</Text>
                              <TextInput keyboardType="email-address" placeholder="email@gmail.com" placeholderTextColor="#bebebe" style={estilos.input} value={email} onChangeText={(value) => setEmail(value)} />
                         </View>
                         <View style={{ marginTop: 12 }}>
                              <Text style={estilos.textInput}>Senha</Text>
                              <TextInput style={estilos.input} placeholder="******" placeholderTextColor="#bebebe" value={senha} onChangeText={(value) => setSenha(value)} secureTextEntry />
                         </View>
                         <TouchableOpacity style={{ marginVertical: 12 }} onPress={() => navigation.navigate("RecuperarSenha")}>
                              <Text style={estilos.textoEsqueceu}>Esqueceu sua senha?</Text>
                         </TouchableOpacity>
                    </View>
                    <Botao ativo={true} texto={"Entrar"} onPress={() => logar()} />
                    <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.navigate("Registrar")}>
                         <Text style={estilos.textoRegistre}>Não possuiu uma conta? <Text style={[estilos.textoRegistre, { color: "#EF9C66" }]}>Registre-se agora</Text></Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
     )
}

const estilos = StyleSheet.create({
     scrollContainer: { 
          flexGrow: 1, 
          justifyContent: "center"
     },
     container: {
          flex: 1,
          flexGrow: 1,
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 18,
          marginTop: -24,
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
     textoEsqueceu: {
          fontFamily: "CabinMedium",
          fontSize: 12,
          fontWeight: "normal",
          color: "#313131",
          textAlign: "right"
     },
     btnImagem: {
          width: 100,
          height: 100,
          borderRadius: 999,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F7E2C4"
     },
     textoRegistre: {
          fontFamily: "CabinMedium",
          fontSize: 12,
          fontWeight: "normal",
          color: "#313131", 
          textAlign: "center"
     },
})