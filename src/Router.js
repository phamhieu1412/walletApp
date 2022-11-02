import React, {PureComponent} from 'react';
import {View, NativeModules, NativeEventEmitter, Button} from 'react-native';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';

import apiWorker from './services/api';
// import { MyToast } from './containers/index';
import AppNavigator from './navigation/index';
import {fcmService} from './services/FCMService';
import {Auth} from '../App';

const {DynamicIslandModule} = NativeModules;

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
        text: 'You are overdue payment on one or more of your accounts! You are overdue payment on one or more of your accounts!',
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
    console.log('NativeModules', NativeModules);
    // const { ZaloPayBridge } = NativeModules;
    // const payZaloBridgeEmitter = new NativeEventEmitter(ZaloPayBridge); // android
    // console.log('xxx 112', NativeModules?.ZaloPayBridge, ZaloPayBridge);
    // const { ZaloPayBridge } = NativeModules;
    // reactotron.log!(NativeModules?.ZaloPayBridge, 'br');
    // const payZaloBridgeEmitter = new NativeEventEmitter(ZaloPayBridge);

    // const [dialogLoading, setDialogLoading] = useState(false);
    // const payOrder = (token: string) => {
    //   const payZP = NativeModules.ZaloPayBridge;
    //   payZP.payOrder(token);
    // };
    // useEffect(() => {
    //   const subscription = payZaloBridgeEmitter.addListener(
    //     'EventPayZalo',
    //     (data: any) => {
    //       if (data.returnCode == 1) {
    //         onNavigate();
    //       } else if (data.returnCode == -1) {
    //         ZaloPayBridge.installApp();
    //         Alert.alert('Pay errror! ' + data.returnCode);
    //       }
    //     },
    //   );
    //   return () => subscription?.remove();
    // }, []);
    // const createOrder = async () => {
    //   try {
    //     setDialogLoading(true);
    //     const res: ZaloPaymentRoot = await requestCreateOrder(
    //       bookingDetail?.booking?.id,
    //     );
    //     payOrder(res.data.data.zp_trans_token);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    Auth().onAuthStateChanged(info => {
      this.props.getInfoUser(info);
    });
    this.fetchCommonData();
    fcmService.registerAppWithFCM();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
  }

  componentWillUnmount() {
    fcmService.unRegister();
  }

  onRegister = token => {
    console.log('xxx onRegister', token);
  };
  onNotification = notify => {
    console.log('xxx onRegister', notify);
  };
  onOpenNotification = notify => {
    console.log('xxx route', notify);
  };

  fetchCommonData() {}

  render() {
    return (
      <View style={{flex: 1, marginTop: 50}}>
        {/* <MyToast /> */}
        {/* <AppNavigator /> */}
        <Button
          title="Start Activity"
          onPress={() => DynamicIslandModule.startNotificationActivity('title T', 'msg T')}
        />
        <Button
          title="Update Activity"
          onPress={() => DynamicIslandModule.updateNotificationActivity('msg U')}
        />
        <Button
          title="End Activity"
          onPress={() => DynamicIslandModule.endNotificationActivity()}
        />
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
