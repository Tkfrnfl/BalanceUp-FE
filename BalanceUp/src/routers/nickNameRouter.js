import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NameScreen from '../screens/register/NameScreen';
import AgreeScreen from '../screens/register/AgreeScreen';
import UseInfoScreen from '../screens/register/UseInfoScreen';
import ServiceInfoScreen from '../screens/register/ServiceInfoScreen';

const NickNameStack = createStackNavigator();

export function NickNameRouter() {
  return (
    <NavigationContainer independent={true}>
      <NickNameStack.Navigator>
        <NickNameStack.Screen
          name="Name"
          component={NameScreen}
          options={{headerShown: false}}
        />
        <NickNameStack.Screen
          name="Agree"
          component={AgreeScreen}
          options={{headerShown: false}}
        />
        <NickNameStack.Screen
          name="UseInfo"
          component={UseInfoScreen}
          options={{headerShown: false}}
        />
        <NickNameStack.Screen
          name="ServiceInfo"
          component={ServiceInfoScreen}
          options={{headerShown: false}}
        />
      </NickNameStack.Navigator>
    </NavigationContainer>
  );
}
exports.default = NickNameRouter;
