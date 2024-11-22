import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../../config/firebase";

export default function Perfil() {
     const user = auth.currentUser;

     return (
          <View>
               {user.photoURL ? (
                    <Image source={{ uri: user.photoURL }} style={{ width: 100, height: 100, borderRadius: 50 }}/>
               ) : (
                    <Text>Sem foto de perfil</Text>
               )}
               <Text>{user.displayName}</Text>
               <Text>{user.email}</Text>
          </View>
     )
}