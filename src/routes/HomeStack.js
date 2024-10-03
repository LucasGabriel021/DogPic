import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from "../views/Home/index";
import Instrucao from '../views/Instrucao';

export default function HomeStack() {
     return <Stack.Navigator initialRouteName="Home">
               <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
               <Stack.Screen name="Instrucao" component={Instrucao} options={{title: "Instrução"}}/>
          </Stack.Navigator>
}