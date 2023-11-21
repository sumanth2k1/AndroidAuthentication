import React, {useEffect, useState} from 'react';
import Login from '../components/Login';
import StartupSplash from '../splash/StartupSplash';
import Signup from '../components/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../components/ForgotPassword';
import TabNavStack from './TabNavStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavStack from './AuthNavStack';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavStack from './DashboardNav';
import Settings from '../screens/Settings';
import Reports from '../screens/Reports';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function NavStack() {
  const [isLogin, setLogin] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const userdata = await AsyncStorage.getItem('User').then(val=>JSON.parse(val));
        console.log(userdata)
        if(userdata) setLogin(true)
      };

      getData();
    }, []),
  );
  console.log(isLogin)

  return isLogin ? (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={DashboardNavStack}
      />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Reports" component={Reports} />
    </Tab.Navigator>
  ) : (
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
