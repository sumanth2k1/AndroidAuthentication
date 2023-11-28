import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Reports from '../screens/Reports';
import Settings from '../screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardNavStack from './DashboardNav';
import Goals from '../screens/Goals';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function TabNavStack() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" options={{headerShown:false}} component={DashboardNavStack} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
