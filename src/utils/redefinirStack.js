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

export { redefinirStackAutenticacao };