import { View, Text } from 'react-native'
import React from 'react'
import Login from '../components/Login'
import StartupSplash from '../splash/StartupSplash'
import Signup from '../components/Signup'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="StartSplashScreen" component={StartupSplash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}