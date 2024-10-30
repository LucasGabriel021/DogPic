import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import HomeStack from "./HomeStack";
import DogLocScreen from "../views/DogLoc/index";
import ScanScreen from '../views/Scan';
import Camera from "../views/Scan/camera";

export default function AppRotas() {
    const [mostrarNavBar, setMostrarNavBar] = useState(null);

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icone;

                    if (route.name === "Home") {
                        icone = "home-outline";
                    } else if (route.name === "ScanScreen") {
                        icone = "scan-outline";
                    } else if (route.name === "DogLocScreen") {
                        icone = "location-outline";
                    }

                    return <Ionicons name={icone} size={focused ? 24 : 20} color={color} />;
                },
                tabBarActiveTintColor: "#EF9C66",
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    display: mostrarNavBar === "Resultado" || mostrarNavBar === "Instrucao" || mostrarNavBar === "Camera" ? "none" : "flex",
                }
            })}>
                <Tab.Screen 
                    name="Home" 
                    options={{ 
                        tabBarLabel: 'DogLoc', 
                        headerShown: false 
                    }}>
                    {() => <HomeStack setMostrarNavBar={setMostrarNavBar} />}
                </Tab.Screen>
                <Tab.Screen 
                    name="ScanScreen" 
                    component={ScanScreen} 
                    options={{ 
                        tabBarLabel: 'Scan', 
                        headerShown: false 
                    }}
                    listeners={{
                        focus: () => setMostrarNavBar(null), // Mostra a tab bar ao focar na ScanScreen
                    }}
                />
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
                    name="DogLocScreen" 
                    component={DogLocScreen} 
                    options={{ 
                        tabBarLabel: 'DogLoc', 
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
