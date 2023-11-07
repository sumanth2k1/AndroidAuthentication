import { View, Text } from 'react-native'
import React from 'react'
import AuthStack from './src/navigation/AuthStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  )
}