import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import MainScreen from './src/components/MainScreen';
// import NameScreen from './src/components/NameScreen';
// import AgreeScreen from './src/components/AgreeScreen';
import { HomeStackScreen } from './src/routers';
// const Stack = createStackNavigator();
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Main"
//           component={MainScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Name"
//           component={NameScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Agree"
//           component={AgreeScreen}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
function App() {
  return (
    <RecoilRoot>
      <HomeStackScreen />
    </RecoilRoot>
  );
}
export default App;
