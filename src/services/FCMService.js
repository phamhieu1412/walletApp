import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('permission rejected', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('user does not have a device token');
        }
      })
      .catch(error => {
        console.log('get token rejected', error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('request permission rejected', error);
      });
  };

  deleteToken = () => {
    console.log('delete token');
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('delete token rejected', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // when the application is running, but in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'onNotificationOpenedApp Notification caused app to open',
        remoteMessage,
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    //when the application is opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'getInitialNotification Notification caused app to open',
          remoteMessage,
        );
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    // foreground state messages
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // triggered when have new token and
    messaging().onTokenRefresh(fcmToken => {
      console.log('New token refresh', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
