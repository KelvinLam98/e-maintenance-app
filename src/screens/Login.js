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

const Login = props => {
  const {navigation, onSetUserInfo} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, [init]);

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
        console.log('login: ', login);
        console.log('initial state: ', stores.getState().app);
        onSetUserInfo(login);
        const state = stores.getState().app;
        console.log('login success state: ', state);
        navigation.navigate('MainPage');
      } else {
        Alert.alert('Cannot login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ScrollView>
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

          <Text>Email: </Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            value={email}
            onChangeText={newValue => setEmail(newValue)}
          />
          <Text>Password: </Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={newValue => setPassword(newValue)}
          />
          <Button
            title="Submit"
            onPress={newValue => getLoginRequest(email, password)}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
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
