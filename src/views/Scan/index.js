import React, { useState, useRef, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import { analiseDogClarifai } from "../../services/analiseDogScan";
import Loading from "../../components/Loading";

export default function CameraScreen({ navigation }) {
     const [loading, setLoading] = useState(false);
     const [type, setType] = useState(CameraType.back);
     const [permission, requestPermission] = Camera.useCameraPermissions();
     const [imagem, setImagem] = useState(null);
     const [imagemBase64, setImagemBase64] = useState(null);
     const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
     const [cameraReady, setCameraReady] = useState(false);
     const [isFocused, setIsFocused] = useState(false);
     const cameraRef = useRef(null);

     const resetStates = () => {
          setImagem(null);
          setImagemBase64(null);
     };

     useFocusEffect(
          React.useCallback(() => {
               setIsFocused(true);
               return () => {
                    setIsFocused(false);
                    setCameraReady(false);
                    resetStates();
               };
          }, [])
     );

     useEffect(() => {
          if (imagemBase64) {
               processarImagem(imagemBase64);
          }
     }, [imagemBase64]);

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

     const tirarFoto = async () => {
          if (cameraReady && cameraRef.current) {
               try {
                    const dadoFoto = await cameraRef.current.takePictureAsync({ base64: true });
                    const manipulado = await ImageManipulator.manipulateAsync(
                         dadoFoto.uri,
                         [],
                         { base64: true }
                    );

                    if (manipulado.base64) {
                         setImagem({ uri: manipulado.uri });
                         setImagemBase64(manipulado.base64);
                    } else {
                         console.error("Erro: Base64 não gerado");
                    }
               } catch (error) {
                    console.error("Erro ao tirar a foto: ", error);
               }
          } else {
               alert("Câmera não está pronta");
          }
     };

     const pegarFoto = async () => {
          let resultado = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.Images,
               allowsEditing: true,
               quality: 1,
               base64: true,
          });

          if (!resultado.canceled) {
               setImagem({ uri: resultado.assets[0].uri });
               setImagemBase64(resultado.assets[0].base64);
          } else {
               alert("Não foi selecionada nenhuma imagem!");
          }
     };

     const processarImagem = async (imagemBase64) => {
          if (imagemBase64) {
               setLoading(true);
               try {
                    const resultadoAnalise = await analiseDogClarifai(imagemBase64);
                    console.log("Resultado da análise: ", resultadoAnalise);

                    const outputs = resultadoAnalise.outputs;
                    if (outputs && outputs.length > 0) {
                         const data = outputs[0].data;
                         const classes = data.concepts;
                         const topClasses = classes.slice(0, 5).map(concept => ({
                              name: concept.name,
                              probability: (concept.value * 100).toFixed(2)
                         }));

                         navigation.navigate("Resultado", { imagemScan: imagem, resultados: topClasses });
                    }
               } catch (error) {
                    console.error("Erro durante a análise: ", error);
               } finally {
                    resetStates();
                    setLoading(false);
               }
          } else {
               alert("Por favor, selecione uma imagem primeiro");
          }
     };

     const toggleFlash = () => {
          setFlashMode(current =>
               current === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off
          );
     };

     return (
          <View style={estilos.container}>
               {loading && <Loading />}
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
                                        <Ionicons name={flashMode === Camera.Constants.FlashMode.off ? "flash-outline" : "flash-off-outline"} color={"#313131"} size={30} />
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
                                   <Text style={{ textAlign: "center" }}>Dicas para fotos</Text>
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
          paddingVertical: 72,
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
          flexDirection: "row",
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
          backgroundColor: "#EF9C66",
     }
});
