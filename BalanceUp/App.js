import * as React from 'react';

import {HomeStackScreen} from './src/routers';
import {RecoilRoot} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <HomeStackScreen />
    </RecoilRoot>
  );
}
export default App;
