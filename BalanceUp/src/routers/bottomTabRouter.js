import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LookAll from '../screens/home/LookAll';
import SetTodoScreen from '../screens/SetTodo/SetTodoScreen';
import MyPage from '../screens/myPage/MyPage';
import MainScreen from '../screens/home/MainScreen';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="작성"
        component={SetTodoScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="루틴"
        component={LookAll}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

exports.default = BottomTab;
