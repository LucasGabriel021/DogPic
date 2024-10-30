import React, { useState, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera, CameraType } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [imagem, setImagem] = useState(null);
    const [imagemBase64, setImagemBase64] = useState(null);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [cameraReady, setCameraReady] = useState(null);
    const [isFocused, setIsFocused] = useState(null); // Estado para controlar o foco na tela
    const cameraRef = useRef(null); // UseRef para referência da câmera

    // Resetar estado ao sair da tela
    useFocusEffect(
        React.useCallback(() => {
            setIsFocused(true); // Define que a camera seja montada
            return () => {
                setIsFocused(false); // Define que a cemra seja desmontada
                setImagem(null);
                setCameraReady(false);
            }
        }, [])
    );

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

    async function tirarFoto() {
        if (cameraReady && cameraRef.current) {
            const dadoFoto = await cameraRef.current.takePictureAsync();
            const processarFoto = await processarImagem(dadoFoto.uri);
            setImagem(processarFoto.uri); // Corrigido para usar processarFoto.uri
        }
    }

    async function pegarFoto() {
        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base: true,
        });

        if(!resultado.canceled) {
            setImagem({ uri: resultado.assets[0].uri });
            setImagemBase64(resultado.assets[0].base64);
        } else {
            alert("Não foi selecionada nenhuma imagem!");
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
            current === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off
        ));
    }

    return (
        <View style={estilos.container}>
            {isFocused && (
                <>
                    <Camera
                        style={estilos.camera}
                        type={type}
                        flashMode={flashMode}
                        ref={cameraRef}
                        onCameraReady={() => {
                            setCameraReady(true);
                        }}
                    >
                        <View style={estilos.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name={"close-outline"} color={"#313131"} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleFlash}>
                                <Ionicons name={"flash-outline"} color={"#313131"} size={30} />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View style={estilos.menuFoto}>
                        <TouchableOpacity style={estilos.orgBtns} onPress={pegarFoto}>
                            <Ionicons name={"image-outline"} size={30} color={"868686"} />
                            <Text>Fotos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos.btnTirarFoto} onPress={tirarFoto} />
                        <TouchableOpacity style={estilos.orgBtns} onPress={() => navigation.navigate("Instrucao")}>
                            <Ionicons name={"help-circle-outline"} size={30} color={"868686"} />
                            <Text style={{textAlign: "center"}}>Dicas para fotos</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 72
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
    menuFoto: {
        width: "100%",
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
        columnGap: 60,
        flexDirection: "row"
    },
    orgBtns: {
        flex: 1,
        rowGap: 8,
        alignItems: "center",
    },
    btnTirarFoto: {
        width: 64,
        height: 64,
        borderRadius: 999,
        backgroundColor: "#EF9C66"
    }
});
