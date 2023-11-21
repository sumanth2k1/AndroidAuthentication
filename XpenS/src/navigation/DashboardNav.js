import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../components/Login';
import AuthNavStack from './AuthNavStack';
const Stack = createNativeStackNavigator();

export default function DashboardNavStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="Auth" options={{headerShown:false}} component={AuthNavStack} />
    </Stack.Navigator>
  );
}
