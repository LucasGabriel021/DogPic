import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Dimensions, Alert, Image, TouchableOpacity } from "react-native";

import Loading from "../../components/Loading";
import Botao from "../../components/BotaoLg";
import enviarEmailRecuperacao from "../../utils/enviarEmailRecuperacao";
import bgLogin from "../../../assets/img/bg-login.png";

const { height } = Dimensions.get("window");
const altura = height * 0.3;

export default function RecuperarSenha({ navigation }) {
     const [email, setEmail] = useState("");
     const [loading, setLoading] = useState(false);

     const enviar = () => {
          if(!email) {
               Alert.alert("Por favor, insira um e-mail.");
               return;
          }
          setLoading(true);

          enviarEmailRecuperacao(
               email,
               () => {
                    setLoading(false);
                    navigation.goBack();
                    Alert.alert(
                         "E-mail enviado!",
                         "Um e-mail de redefinição de senha foi enviado para o endereço informado."
                    );
               }, 
               (errorMessage) => {
                    Alert.alert("Erro: ", errorMessage);
                    setLoading(false);
               }
          );

     }

     return (
          <View style={{flex: 1, justifyContent: "center", backgroundColor: "#fff"}}>
               <Image source={bgLogin} style={estilos.imagemBg}/>
               <View style={estilos.container}>
                    {loading && <Loading/>}
                    <View style={{flex: 1}}>
                         <Text style={estilos.titulo}>Esqueceu sua senha?</Text>
                         <Text style={estilos.paragrafo}>Não se preocupe! Isso ocorre. Por favor, insira o endereço de e-mail vinculado à sua conta.</Text>
                         <View style={{ marginVertical: 24 }}>
                              <Text style={estilos.textInput}>Email</Text>
                              <TextInput keyboardType="email-address" placeholder="Informe seu e-mail" placeholderTextColor="#bebebe" style={estilos.input} value={email} onChangeText={(value) => setEmail(value)} />
                         </View>
                         <Botao ativo={true} texto={"Enviar e-mail de recuperação"} onPress={() => enviar()} />
                         <TouchableOpacity style={{marginTop: 24}} onPress={() => navigation.navigate("Login")}>
                              <Text style={estilos.textoLogin}>Lembra da senha? <Text style={[estilos.textoRegistre, { color: "#EF9C66" }]}>Faça o login agora</Text></Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
          flex: 1,
          padding: 24,
          backgroundColor: "#fff"
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
     paragrafo: {
          marginTop: 8,
          fontFamily: "CabinMedium",
          fontSize: 14,
          fontWeight: "normal",
          color: "#313131",
          textAlign: "justify"
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
     textoLogin: {
          fontFamily: "CabinMedium",
          fontSize: 12,
          fontWeight: "normal",
          color: "#313131", 
          textAlign: "center"
     },
     imagemPerfil: {
          width: 100,
          height: 100,
          borderRadius: 999,
     }
})
