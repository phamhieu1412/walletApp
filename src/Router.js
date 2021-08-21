import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';

import apiWorker from './services/api';
// import { MyToast } from './containers/index';
import AppNavigator from './navigation/index';
import { fcmService } from './services/FCMService';
import {Auth} from '../App';

async function onMessageReceived(message) {
  const channelId = await notifee.createChannel({
    id: 'importanNotification',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'notification1',
    vibration: true,
    vibrationPattern: [300, 500],
  });
  console.log('mes:', message);

  // Display a notification
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    subtitle: 'Thông báo',
    data: message.data,
    android: {
      channelId,
      color: 'red',
      largeIcon: require('../assets/images/wallie-logo.png'),
      // smallIcon: 'ic_ubo_logo_small',
      timestamp: Date.now(),
      sound: 'notification1',
      vibrationPattern: [300, 500],
      showTimestamp: true,
      style: {
        type: AndroidStyle.BIGTEXT,
        text: 'You are overdue payment on one or more of your accounts! You are overdue payment on one or more of your accounts!'
      },
      importance: AndroidImportance.HIGH,
    },
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

class Router extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (!prevState.initialized) {
      const {token} = nextProps;
      if (token) {
        apiWorker.init({
          token,
        });
      }

      newState.initialized = true;
    }

    return Object.keys(newState).length ? newState : null;
  }

  componentDidMount() {
    Auth().onAuthStateChanged(info => {
      this.props.getInfoUser(info);
    });
    this.fetchCommonData();
    fcmService.registerAppWithFCM();
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
  }

  componentWillUnmount() {
    fcmService.unRegister();
  }

  onRegister = (token) => {
    console.log('xxx onRegister', token)
  }
  onNotification = (notify) => {
    console.log('xxx onRegister', notify)
  }
  onOpenNotification = (notify) => {
    console.log('xxx route', notify)
  }

  fetchCommonData() {}

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <MyToast /> */}
        <AppNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // userInfo: state && state.user && state.user.user,
  // token: state && state.user && state.user.token,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {actions: UserActions} = require('./redux/UserRedux');

  const {token} = stateProps;
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getInfoUser: payload => {
      dispatch(UserActions.getInfoUser(payload));
    },
    // findAndSetReferral: () => dispatch(UserActions.findAndSetReferral()),
    // getFirebaseRegistrationToken: () => UserActions.getFirebaseRegistrationToken(dispatch),
    // registerFirebaseDevice: () => dispatch(UserActions.registerFirebaseDevice()),
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Router);
