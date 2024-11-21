import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default async function uploadImagem() {
     let resultado = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
          base64: true,
     });

     if (!resultado.canceled) {
          return resultado.assets[0].uri;
     } else {
          Alert.alert("Não foi selecionada nenhuma imagem!");
     }
}