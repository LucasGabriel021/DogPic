import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';

export default async function fazerLogout({navigation}) {
     try {
          await signOut(auth);
          Alert.alert("Você saiu da conta!");
          navigation.navigate("Autenticacao");
     } catch (error) {
          console.error("Erro ao sair da conta: ", error);
          Alert.alert("Não foi possível sair. Tente novamente.");
     }
}