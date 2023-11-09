import { View, Text } from 'react-native'
import React from 'react'
import Login from '../components/Login'
import StartupSplash from '../splash/StartupSplash'
import Signup from '../components/Signup'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import ForgotPassword from '../components/ForgotPassword'


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="StartSplashScreen" options={{headerShown:false}} component={StartupSplash} />
        <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
        <Stack.Screen name="Signup" options={{headerShown:false}} component={Signup} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
    </Stack.Navigator>
  )
}