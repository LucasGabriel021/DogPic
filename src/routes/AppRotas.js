import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import AppStack from "./AppStack";
import Localizar from "../screens/Perdidos/index";
import Camera from "../screens/Scan/index";

export default function AppRotas() {
    const [mostrarNavBar, setMostrarNavBar] = useState(null);

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icone;

                    if (route.name === "Home") {
                        icone = "home-outline";
                    } else if (route.name === "CameraScreen") {
                        icone = "scan-outline";
                    } else if (route.name === "Localizar") {
                        icone = "location-outline";
                    }

                    return <Ionicons name={icone} size={focused ? 24 : 20} color={color} />;
                },
                tabBarActiveTintColor: "#EF9C66",
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    display: mostrarNavBar === "Resultado" || mostrarNavBar === "Autenticacao" || mostrarNavBar === "Perfil" || mostrarNavBar === "Registrar" || mostrarNavBar === "Instrucao" || mostrarNavBar === "Camera" || mostrarNavBar === "Anuncio" || mostrarNavBar === "DetalhesAnuncio" ? "none" : "flex",
                }
            })}>
                <Tab.Screen 
                    name="Home" 
                    options={{ 
                        tabBarLabel: 'DogLoc', 
                        headerShown: false 
                    }}>
                    {() => <AppStack setMostrarNavBar={setMostrarNavBar} />}
                </Tab.Screen>
                <Tab.Screen 
                    name="CameraScreen" 
                    component={Camera} 
                    options={{ 
                        tabBarLabel: 'Scan', 
                        headerShown: false 
                    }}
                    listeners={{
                        focus: () => setMostrarNavBar("Camera"),
                        blur: () => setMostrarNavBar(null) // Mostra a tab bar ao focar na ScanScreen
                    }}
                />
                <Tab.Screen 
                    name="Localizar" 
                    component={Localizar} 
                    options={{ 
                        tabBarLabel: 'Localizar', 
                        headerShown: false 
                    }}
                    listeners={{
                        focus: () => setMostrarNavBar(null), // Mostra a tab bar ao focar na DogLocScreen
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
