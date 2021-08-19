import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS} from '../constants';
import HomeContainer from '../containers/Home';

const Home = ({navigation}) => {

  return (
    <HomeContainer navigation={navigation} />
  );
};

export default Home;
