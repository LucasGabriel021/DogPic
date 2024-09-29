import { StatusBar } from 'expo-status-bar';
import { useFonts, Cabin_400Regular, Cabin_500Medium, Cabin_700Bold } from "@expo-google-fonts/cabin";
import React, { useEffect } from 'react';
import * as SplashScreen from "expo-splash-screen";
import { View } from 'react-native';

import AppRotas from "./src/routes/AppRotas";

export default function App() {
  const [fontCarregada] = useFonts({
    "CabinRegular": Cabin_400Regular,
    "CabinMedium": Cabin_500Medium,
    "CabinBold": Cabin_700Bold
  });

  /**
   * Prevenção para que a Splash Screen desapareça automaticamente 
   * enquanto os recursos (fontes) estão sendo carregados
   */
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();

  }, []);

  /**
   * Monitoramento do estado da fontCarregada, caso seu estado seja true
   * será chamado o método hideAsync() para ocultar o Splash Screen
   */
  useEffect(() => {
    if(fontCarregada) {
      SplashScreen.hideAsync();
    }
  }, [fontCarregada]);

  if(!fontCarregada) {
    return <View/>
  }

  return <AppRotas/>
}