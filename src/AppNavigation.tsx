import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Search from './components/screens/Search';
import {ROUTE_KEYS} from './utils/route_key';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROUTE_KEYS.SEARCH}>
      <Tab.Screen name={ROUTE_KEYS.SEARCH} component={Search} />
    </Stack.Navigator>
  );
}
