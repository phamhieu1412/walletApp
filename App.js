import React, { Component } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';

import store from './src/store/configureStore';
import Router from './src/Router';
import {firebaseConfig} from './src/constants/const';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase, Auth};

class App extends Component {
  componentDidMount() {
    LogBox.ignoreLogs([
      // 'VirtualizedLists should never be nested', // turn off the warning because the Parallax layout need it.
      'componentWillMount has been renamed', // turn off untill we upgrade/replace tcomb-form-native and react-native-fluid-slider.
      'componentWillReceiveProps has been renamed', // turn off untill we upgrade/replace tcomb-form-native and react-native-fluid-slider.
    ]);
  }

  render() {
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;