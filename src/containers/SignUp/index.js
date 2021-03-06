import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import {COLORS, SIZES, icons, images, FONTS} from '../../constants';
import {Auth} from '../../../App';
import apiWorker from '../../services/api';
import styles from './styles';

const SignUpContainer = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [infoLogin, setInfoLogin] = useState({
    email: '',
    password: '',
  });
  
  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => props.navigation.navigate('SignIn')}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={styles.iconHeader}
        />

        <Text style={styles.textHeader}>Sign Up</Text>
      </TouchableOpacity>
    );
  };

  const renderLogo = () => {
    return (
      <View style={styles.viewLogo}>
        <Image
          source={images.wallieLogo}
          resizeMode="contain"
          style={styles.imageLogo}
        />
      </View>
    );
  };

  const renderForm = () => {
    return (
      <View style={styles.viewForm}>
        {/* Full Name */}
        <View style={styles.fullName}>
          <Text style={styles.textForm}>Email Address</Text>
          <TextInput
            style={styles.inputFullName}
            placeholder="Enter email address"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            onChangeText={(text) => setInfoLogin({...infoLogin, email: text})}
          />
        </View>

        {/* Phone Number */}
        <View style={styles.phoneNumber}>
          <Text style={styles.textForm}>Phone Number</Text>

          <View style={{flexDirection: 'row'}}>
            {/* Country Code */}
            <TouchableOpacity
              style={styles.buttonCountryCode}
              onPress={() => props.onSetModalVisible(true)}>
              <View style={{justifyContent: 'center'}}>
                <Image source={icons.down} style={styles.iconDown} />
              </View>
              <View style={styles.viewCountryCode}>
                <Image
                  source={{uri: props?.selectedArea?.flag}}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <View style={styles.viewCountryCode}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>
                  {props?.selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Phone Number */}
            <TextInput
              style={styles.inputPhoneNumber}
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={styles.textForm}>Password</Text>
          <TextInput
            style={styles.inputPassword}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setInfoLogin({...infoLogin, password: text})}
          />
          <TouchableOpacity
            style={styles.buttonShowPassword}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={styles.iconShowPassword}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={{margin: SIZES.padding * 3}}>
        <TouchableOpacity
          style={styles.buttonContinue}
          onPress={signUpUser}>
          <Text style={styles.textContinue}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const signUpUser = () => {
    // () => props.navigation.navigate('Home')
    apiWorker.signUpUser(infoLogin);
  };

  return (
    <ScrollView>
      {renderHeader()}
      {renderLogo()}
      {renderForm()}
      {renderButton()}
    </ScrollView>
  );
};

export default SignUpContainer;
