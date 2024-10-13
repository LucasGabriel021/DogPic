import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from "../views/Home/index";
import Instrucao from '../views/Instrucao/index';
import Raca from "../views/Raca/index";
import Scan from "../views/Scan/index";

export default function HomeStack() {
     return <Stack.Navigator initialRouteName="Home">
               <Stack.Screen name="HomeStack" component={Home} options={{headerShown: false}}/>
               <Stack.Screen name="Instrucao" component={Instrucao} options={{title: "Instrução"}}/>
               <Stack.Screen name="Raca" component={Raca} options={{title: "Raça"}}/>
               <Stack.Screen name="Scanner" component={Scan} options={{title: "Raça"}}/>
          </Stack.Navigator>
}