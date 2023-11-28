import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../components/Login';
import AuthNavStack from './AuthNavStack';
// import TransDesc from '../components/TransDesc';
const Stack = createNativeStackNavigator();

export default function DashboardNavStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        {/* <Stack.Screen name="TransDetail" options={{headerShown:false}} component={TransDesc} /> */}
        {/* <Stack.Screen name="Auth" options={{headerShown:false}} component={AuthNavStack} /> */}
    </Stack.Navigator>
  );
}
