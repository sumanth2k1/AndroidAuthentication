import React from 'react';
import Login from '../components/Login';
import StartupSplash from '../splash/StartupSplash';
import Signup from '../components/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../components/ForgotPassword';
import TabNavStack from './TabNavStack';


const Stack = createNativeStackNavigator();

export default function AuthNavStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="startsplashScreen"
        options={{headerShown: false}}
        component={StartupSplash}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={TabNavStack}
      />
    </Stack.Navigator>
  );
}
