/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {store} from './store/configStore';
const MainApp = () => {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
