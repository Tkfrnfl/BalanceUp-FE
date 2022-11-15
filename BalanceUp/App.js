import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import MainScreen from './src/components/MainScreen';

import {HomeStackScreen} from './src/routers';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <HomeStackScreen />
    </RecoilRoot>
  );
}
export default App;
