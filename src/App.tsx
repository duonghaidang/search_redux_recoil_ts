import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store';
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <NavigationContainer>
          <StatusBar backgroundColor="#ef4a6b" />
          <AppNavigation />
        </NavigationContainer>
      </RecoilRoot>
    </Provider>
  );
};

export default App;
