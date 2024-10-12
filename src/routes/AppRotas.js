import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import HomeStack from "./HomeStack";
import DogLocScreen from "../views/DogLoc/index";
import ScanScreen from '../views/Scan';

import BotaoScanner from '../components/BotaoScanner';

export default function AppRotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "ScanScreen") {
              iconName = "camera";
            } else if (route.name === "DogLocScreen") {
              iconName = "map-marker";
            }

            return (
              <FontAwesome
                name={iconName}
                size={focused ? 24 : 22}
                color={color}
                style={{ marginBottom: -16 }}
              />
            );
          },
          tabBarActiveTintColor: '#EF9C66',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 16, 
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ tabBarLabel: 'Home', headerShown: false }}
        />
        <Tab.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{
            tabBarLabel: '',
            headerShown: false,
            tabBarButton: (props) => (
              <BotaoScanner {...props}>
                <FontAwesome name="camera" size={28} color="white" />
              </BotaoScanner>
            ),
          }}
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
