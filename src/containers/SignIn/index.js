import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {COLORS, SIZES, icons, images} from '../../constants';
import {actions} from '../../redux/UserRedux';
import styles from './styles';

const SignInContainer = (props) => {
  const dispatch = useDispatch();
  const loginAction = (payload) => dispatch(actions.login(payload));
  const [showPassword, setShowPassword] = useState(false);
  const [infoLogin, setInfoLogin] = useState({
    email: '',
    password: '',
  });

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

  const renderButtonLogin = () => {
    return (
      <View style={{margin: SIZES.padding * 3, marginBottom: 10}}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={Login}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderButtonSignUp = () => {
    return (
      <View style={{margin: SIZES.padding * 3, marginTop: 0}}>
        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={signUpUser}>
          <Text style={styles.textSignUp}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Login = () => {
    loginAction(infoLogin);
  };

  const signUpUser = () => {
    props.navigation.navigate('SignUp');
  };

  return (
    <ScrollView>
      <View style={styles.buttonHeader} />
      {renderLogo()}
      {renderForm()}
      {renderButtonLogin()}
      {renderButtonSignUp()}
    </ScrollView>
  );
};

export default SignInContainer;
