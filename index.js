/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import stores from './src/redux/stores';
import {setPushToken, setWorkOrderId} from './src/redux/actions';
import Toast from 'react-native-toast-message';
import * as RootNavigation from './src/RootNavigation';

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister(token) {
    stores.dispatch(setPushToken(token));
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification(notification) {
    stores.dispatch(setWorkOrderId(notification.data.workOrderId));
    // process the notification
    if (notification.foreground) {
      Toast.show({
        text1: 'You have received a new notification.',
        visibilityTime: 3000,
        position: 'bottom',
        type: 'success',
        autoHide: true,
      });
    }

    if (notification.userInteraction) {
      RootNavigation.navigate('Login');
    }
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.error(err.message, err);
  },

  senderID: '113591474815445370425',
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
