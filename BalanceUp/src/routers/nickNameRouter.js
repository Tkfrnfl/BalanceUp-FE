import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NameScreen from '../screens/register/NameScreen';
import AgreeScreen from '../screens/register/AgreeScreen';
import UseInfoScreen from '../screens/register/UseInfoScreen';
import ServiceInfoScreen from '../screens/register/ServiceInfoScreen';
import MainScreen from '../screens/home/MainScreen';
const NickNameStack = createStackNavigator();

// const routeInfo = [
//   {
//     name: "Name",
//     component: NameScreen,
//   },
//   {
//     name: "Agree",
//     component:AgreeScreen,
//   },
//   {
//     name: "UseInfo",
//     component: UseInfoScreen,
//   },
//   {
//     name: "ServiceInfo",
//     component: ServiceInfoScreen,
//   },
// ];

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
        <NickNameStack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
      </NickNameStack.Navigator>
    </NavigationContainer>
  );
}
// const NickNameRouter=[];

// routeInfo.map(res=>{
//   NickNameRouter.push(
//     <NickNameStack.Screen
//       key={res.name}
//       name={res.name}
//       component={res.component}
//     />
//   )
// })

exports.defulat = NickNameRouter;
