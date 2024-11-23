import { CommonActions } from "@react-navigation/native";

function redefinirStackAutenticacao(navigation) {
     navigation.dispatch(
          CommonActions.reset({
               index: 1,
               routes: [
                    { name: "HomeScreen" },
                    { name: "Perfil" }
               ]
          })
     );
}

function redefinirStackSair(navigation) {
     navigation.dispatch(
          CommonActions.reset({
               index: 1,
               routes: [
                    { name: "HomeScreen" },
                    { name: "Autenticacao" }
               ]
          })
     )
}

export { redefinirStackAutenticacao, redefinirStackSair };