import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from "../screens/Home/index";
import Instrucao from '../screens/Instrucao/index';
import Raca from "../screens/Raca/index";
import Camera from "../screens/Scan/index";
import ResultadoScan from "../screens/Scan/ResultadoScan";
import Anuncio from "../screens/Perdidos/Anuncio";

export default function HomeStack({ setMostrarNavBar }) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="HomeStack" 
                component={Home} 
                options={{ headerShown: false }} 
                listeners={{
                    focus: () => setMostrarNavBar(null), // Garante que a tab bar será exibida ao entrar na HomeStack
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
        </Stack.Navigator>
    );
}
