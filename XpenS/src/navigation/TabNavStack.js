import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Reports from '../screens/Reports';
import Settings from '../screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardNavStack from './DashboardNav';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function TabNavStack() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" options={{headerShown:false}} component={DashboardNavStack} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Reports" component={Reports} />
    </Tab.Navigator>
  );
}
