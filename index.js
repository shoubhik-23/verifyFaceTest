/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configStore from './store/configStore';
import {PersistGate} from 'redux-persist/integration/react';

const MainApp = () => {
  let {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>loading</Text>} persistor={persistor}>
        <App></App>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
