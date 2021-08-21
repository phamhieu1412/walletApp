import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {navigationRef} from './RootNavigation';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import Tabs from './tabBottom';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  const userRedux = useSelector(state => state.user);
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      {/* {userRedux?.user?.uid?.length > 0 ? (
        <Stack.Navigator screenOptions={{headerShown: false}}> */}
          {/* Tab Screen */}
          {/* <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}> */}
          {/* Sign Up + Sign In */}
          {/* <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )} */}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Tab Screen */}
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
