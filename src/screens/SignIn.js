import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '../constants';
import SignInContainer from '../containers/SignIn';

const SignIn = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]} style={{flex: 1}}>
        <SignInContainer navigation={navigation} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
