import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from 'expo-camera/legacy';

export default function ScanScreen() {
     const [type, setType] = useState(Camera.back);
     const [permission, requestPermission] = Camera.useCameraPermissions();

     if(!permission) {
          return <View/>
     }

     if(!permission.granted) {
          return (
               <View style={estilos.container}>
                    <Text style={{ textAlign: 'center' }}>Permita o acesso a camera</Text>
                    <Button onPress={requestPermission} title="Garantir permissão"/>
               </View>
          )
     }

     function toggleCameraType() {
          setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
     }

     return (
          <View style={estilos.container}>
               <Camera style={estilos.camera} type={type}>
               <View style={estilos.buttonContainer}>
               <TouchableOpacity style={estilos.button} onPress={toggleCameraType}>
                    <Text style={estilos.text}>Flip Camera</Text>
               </TouchableOpacity>
               </View>
               </Camera>
          </View>
     )
}

const estilos = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
     },
     camera: {
       flex: 1,
     },
     buttonContainer: {
       flex: 1,
       flexDirection: 'row',
       backgroundColor: 'transparent',
       margin: 64,
     },
     button: {
       flex: 1,
       alignSelf: 'flex-end',
       alignItems: 'center',
     },
     text: {
       fontSize: 24,
       fontWeight: 'bold',
       color: 'white',
     },
   });