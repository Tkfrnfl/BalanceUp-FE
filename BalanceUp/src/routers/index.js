import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OnBoarding from '../screens/Login/OnBoarding';
import Login from '../screens/Login/Login';

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen 
        name="OnBoarding" 
        component={OnBoarding} 
        options={{headerShown: false}}
        />
        <HomeStack.Screen name="Login" component={Login} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
exports.default = HomeStackScreen;
