import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from '../screens/home/MainScreen';
import LookAll from '../screens/home/LookAll';
import SetTodoScreen from '../screens/SetTodo/SetTodoScreen';
import SetPlanScreen from '../screens/SetTodo/SetPlanScreen';

const MainStack = createStackNavigator();

export function MainRouter() {
  return (
    <NavigationContainer independent={true}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="LookAll"
          component={LookAll}
          options={{headerShown: false}}
          />
        <MainStack.Screen
          name="Set"
          component={SetTodoScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Plan"
          component={SetPlanScreen}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

exports.default = MainRouter;
