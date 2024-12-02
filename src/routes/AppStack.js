import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import fazerLogout from '../utils/fazerLogout';

const Stack = createStackNavigator();

import Home from "../screens/Home/index";
import Autenticacao from "../screens/Autenticacao/index";
import Registrar from "../screens/Autenticacao/Registrar";
import Login from "../screens/Autenticacao/Login";
import RecuperarSenha from "../screens/Autenticacao/RecuperarSenha";
import Instrucao from '../screens/Instrucao/index';
import Raca from "../screens/Raca/index";
import Camera from "../screens/Scan/index";
import ResultadoScan from "../screens/Scan/ResultadoScan";
import Anuncio from "../screens/Perdidos/Anuncio";
import DetalhesAnuncio from '../screens/Perdidos/DetalhesAnuncio';
import Perfil from '../screens/Perfil/index';
import Historico from '../screens/Historico/index';
import EditarPerfil from '../screens/Perfil/EditarPerfil';

export default function AppStack({ setMostrarNavBar }) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="HomeScreen" 
                component={Home} 
                options={{ headerShown: false }} 
                listeners={{
                    focus: () => setMostrarNavBar(null), // Garante que a tab bar será exibida ao entrar na HomeStack
                }}
            />
            <Stack.Screen 
                name="Autenticacao" 
                component={Autenticacao} 
                options={({navigation}) => ({
                    title: "Autenticação",
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                                <Ionicons name="arrow-back" size={24} color={"#313131"} style={{marginLeft: 16}}/>
                            </TouchableOpacity>
                        )
                    }
                })} 
                listeners={{
                    focus: () => setMostrarNavBar("Perfil"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="Perfil" 
                component={Perfil} 
                options={({navigation}) => ({
                    title: "Perfil",
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => fazerLogout(navigation)}>
                                <Ionicons name="exit" size={24} color={"#313131"} style={{marginRight: 16}}/>
                            </TouchableOpacity>
                        )
                    }
                })} 
                listeners={{
                    focus: () => setMostrarNavBar("Perfil"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="Historico" 
                component={Historico} 
                options={{ title: "Histórico" }} 
                listeners={{
                    focus: () => setMostrarNavBar("Historico"), // Oculta a tab bar na tela de Resultado
                    blur: () => setMostrarNavBar(null), // Mostra a tab bar ao sair da tela de Resultado
                }}
            />
            <Stack.Screen 
                name="EditarPerfil" 
                component={EditarPerfil} 
                options={{ title: "Editar perfil" }} 
                listeners={{
                    focus: () => setMostrarNavBar("EditarPerfil"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="Registrar" 
                component={Registrar} 
                options={{ title: "Cadastrar" }} 
                listeners={{
                    focus: () => setMostrarNavBar("Registrar"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ title: "Login" }} 
                listeners={{
                    focus: () => setMostrarNavBar("Login"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="RecuperarSenha" 
                component={RecuperarSenha} 
                options={{ title: "Recuperar senha" }} 
                listeners={{
                    focus: () => setMostrarNavBar("RecuperarSenha"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="Instrucao" 
                component={Instrucao} 
                options={{ title: "Instrução" }} 
                listeners={{
                    focus: () => setMostrarNavBar("Instrucao"), // Garante que a tab bar será exibida ao entrar na Instrução
                    blur: () => setMostrarNavBar(null)
               }}
            />
            <Stack.Screen 
                name="Raca" 
                component={Raca} 
                options={{ title: "Raça" }} 
                listeners={{
                    focus: () => setMostrarNavBar(null), // Garante que a tab bar será exibida ao entrar na Raca
                }}
            />
            <Stack.Screen 
                name="Resultado" 
                component={ResultadoScan} 
                options={{ title: "Resultado" }} 
                listeners={{
                    focus: () => setMostrarNavBar("Resultado"), // Oculta a tab bar na tela de Resultado
                    blur: () => setMostrarNavBar(null), // Mostra a tab bar ao sair da tela de Resultado
                }}
            />
            <Stack.Screen 
                name="Camera" 
                component={Camera} 
                options={{ headerShown: false }} 
                listeners={{
                    focus: () => setMostrarNavBar("Camera"), // Oculta a tab bar na tela de Resultado
                    blur: () => setMostrarNavBar(null), // Mostra a tab bar ao sair da tela de Resultado
                }}
            />
            <Stack.Screen
                name="Anuncio"
                component={Anuncio}
                options={{title: "Criar anúncio"}}
                listeners={{
                    focus: () => setMostrarNavBar("Anuncio"),
                    blur: () => setMostrarNavBar(null),
                }}
            />
            <Stack.Screen
                name="DetalhesAnuncio"
                component={DetalhesAnuncio}
                options={{title: "Anúncio"}}
                listeners={{
                    focus: () => setMostrarNavBar("DetalhesAnuncio"),
                    blur: () => setMostrarNavBar(null),
                }}
            />
        </Stack.Navigator>
    );
}
