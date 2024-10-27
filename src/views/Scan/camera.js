import React, { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraType } from 'expo-camera/legacy';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ScanScreen() {
    const [type, setType] = useState(CameraType.back); // Alterado para CameraType.back
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [foto, setFoto] = useState(null);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null); // UseRef para referência da câmera

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={estilos.container}>
                <Text style={{ textAlign: 'center' }}>Permita o acesso à câmera</Text>
                <Button onPress={requestPermission} title="Garantir permissão" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function selecionarImagem() {
        if (cameraRef.current) {
            const dadoFoto = await cameraRef.current.takePictureAsync();
            const processarFoto = await processarImagem(dadoFoto.uri);
            setFoto(processarFoto.uri); // Corrigido para usar processarFoto.uri
        }
    }

    async function processarImagem(uri) {
        const manipuladorResultado = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }],
            { format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipuladorResultado; // Retornando o objeto completo para mais processamento
    }

    function toggleFlash() {
        setFlashMode(current => (
            current === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
        ));
    }

    return (
        <View style={estilos.container}>
            <Camera
                style={estilos.camera}
                type={type}
                flashMode={flashMode}
                ref={cameraRef} // Referência da câmera
            >
                <View style={estilos.buttonContainer}>
                    <TouchableOpacity style={estilos.button} onPress={toggleCameraType}>
                        <Text style={estilos.text}>V</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.button} onPress={toggleFlash}>
                        <Text style={estilos.text}>{flashMode === Camera.Constants.FlashMode.off ? "Flash On" : "Flash Off"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.button} onPress={selecionarImagem}>
                        <Text style={estilos.text}>T</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            {foto && <Image source={{ uri: foto }} style={estilos.preview} />}
        </View>
    );
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
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width: 300,
        height: 300,
        borderRadius: 15,
        overflow: 'hidden',
    },
});
