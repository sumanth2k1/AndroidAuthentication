import { View, Text } from 'react-native'
import React from 'react'
import AuthStack from './src/navigation/NavigationStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavStack from './src/navigation/AuthNavStack';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import NavStack from './src/navigation/NavigationStack';
registerTranslation('en-GB', enGB)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavStack/>
    </NavigationContainer>
  )
}