import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import HomeStack from "./HomeStack";
import DogLocScreen from "../views/DogLoc/index";

export default function AppRotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size}) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "DogLocScreen") {
              iconName = "map-marker";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#EF9C66', // Cor quando o ícone está ativo
          tabBarInactiveTintColor: 'gray', // Cor quando o ícone está inativo
          tabBarIconSize: 20, // Tamanho do ícone
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ tabBarLabel: 'Home', headerShown: false }}
        />
        <Tab.Screen
          name="DogLocScreen"
          component={DogLocScreen}
          options={{ tabBarLabel: 'DogLoc', headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
