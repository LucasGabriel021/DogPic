import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from "../views/Home/Home";
import Instrucao from '../views/Instrucao';

export default function() {
     return <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
               <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
               <Stack.Screen name="Instrucao" component={Instrucao} options={{title: "Instrução"}}/>
          </Stack.Navigator>
   </NavigationContainer>
}