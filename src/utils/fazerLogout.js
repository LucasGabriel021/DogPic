import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert } from 'react-native';

export default function fazerLogout(navigation) {
     Alert.alert(
          "Logout",
          "Tem certeza que deseja sair da aplicação?",
          [
               { text: "Cancelar", style: "cancel" },
               { 
                    text: "Fazer logout", 
                    style: "destructive",
                    onPress: async () => {
                         try {
                              await signOut(auth);
                              navigation.navigate("Autenticacao");
                         } catch (error) {
                              console.error("Erro ao sair da conta: ", error);
                              Alert.alert("Não foi possível sair. Tente novamente.");
                         }
                    }
               }
          ]
     );
}