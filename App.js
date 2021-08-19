import React from 'react';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';

import Navigation from './src/navigation';
import {firebaseConfig} from './src/constants/const';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, Auth};

const App = () => {
  return <Navigation />;
};

export default App;
