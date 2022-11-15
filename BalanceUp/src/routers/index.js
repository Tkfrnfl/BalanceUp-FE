import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OnBoarding from '../screens/Login/OnBoarding';
import Login from '../screens/Login/Login';
import {NickNameRouter} from './nickNameRouter';

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="NickName"
          options={{headerShown: false}}
          component={NickNameRouter}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
exports.default = HomeStackScreen;
