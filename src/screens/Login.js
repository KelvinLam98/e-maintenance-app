import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import {post} from '../common/ServerApi';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {setUserInfo} from '../redux/actions';
import stores from '../redux/stores';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';

const Login = props => {
  const {navigation, onSetUserInfo} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, [init]);

  async function registerPushToken(token) {
    var resp = await post('api/register-firebase-token', token);
    console.log('resp: ', resp);
    await post('api/register-firebase-token', token);
    console.log('done push token');
  }

  // eslint-disable-next-line no-shadow
  async function getLoginRequest(email, password) {
    try {
      const response = await post('api/login', {
        loginEmail: email,
        loginPassword: password,
      });
      if (response.loginIsAuthenticated === true) {
        const login = {
          ...response.user,
          token: response.jwtToken,
          readOnlyToken: response.readOnlyJwtToken,
        };
        onSetUserInfo(login);
        const state = stores.getState().app;
        console.log('done login');
        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister(token) {
            // Call register token
            console.log(token);
            registerPushToken(token);
          },

          // (required) Called when a remote is received or opened, or local notification is opened
          onNotification(notification) {
            //onSetWorkOrderId(notification.data.article_id);
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
              navigation.navigate('WorkOrderDetail');
            }
            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
          onRegistrationError(err) {
            console.error(err.message, err);
          },
          senderID: '638443305888',
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
        navigation.navigate('MainPage');
      } else {
        Alert.alert('Wrong email or password');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              margin: 30,
              width: 100,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../logo2.png')}
          />
          <Text style={styles.head}>E-Maintenance App</Text>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Email: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              value={email}
              onChangeText={newValue => setEmail(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Password: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={newValue => setPassword(newValue)}
            />
          </View>
          <Button
            title="Submit"
            color="royalblue"
            onPress={newValue => getLoginRequest(email, password)}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'azure',
  },
  listRow: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  textInput: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
  },
  head: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 1,
  },
  backBtn: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
  onSetUserInfo: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSetUserInfo: values => dispatch(setUserInfo(values)),
});

export default connect(null, mapDispatchToProps)(withTranslation()(Login));
