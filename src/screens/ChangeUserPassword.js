/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
//import type {Node} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Table,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {get, post, resource} from '../common/ServerApi';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';
import {setUserInfo, setWorkOrderId} from '../redux/actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

const ChangeUserPassword = props => {
  const {navigation, onSetUserInfo, userInfo, workOrderInfo, onSetWorkOrder} =
    props;
  const [init, setInit] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function getChangePasswordRequest(
    inputOldPassword,
    inputPassword,
    inputConfirmPassword,
  ) {
    let id = userInfo.id;
    try {
      const response = await post(`api/profile/changePassword/${id}`, {
        oldPassword: inputOldPassword,
        password: inputPassword,
        confirmPassword: inputConfirmPassword,
      });
      if (response.isChange === true) {
        Alert.alert(response.responseMessage);
        navigation.navigate('Profile');
      } else {
        Alert.alert(response.responseMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setInit(true);
  }, [init]);

  return (
    <>
      <View>
        <Text style={styles.head}>
          <Image
            source={require('../logo2.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 40, height: 40}}
          />
          {'  '}E-Maintenance App
        </Text>
        <Text style={styles.buttonIcon}>
          <Ionicons
            name="exit-outline"
            size={30}
            color="black"
            onPress={() => navigation.navigate('Login')}
          />
        </Text>
      </View>

      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MainPage')}>
          <Text style={styles.textStyle}>Work Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WorkOrderHistory')}>
          <Text style={styles.textStyle}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.textStyle}>Profile</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.head}>Edit</Text>
        <View style={styles.card}>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Old Password: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Old Password"
              value={password}
              onChangeText={newValue => setPassword(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>New Password: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Email"
              value={newPassword}
              onChangeText={newValue => setNewPassword(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Repeat New Password: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={newValue => setConfirmPassword(newValue)}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        title="Submit"
        color="royalblue"
        width="100%"
        onPress={newValue =>
          getChangePasswordRequest(password, newPassword, confirmPassword)
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'azure',
    borderColor: 'beige',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  button: {
    width: '33.33%',
    flex: 1,
    alignItems: 'center',
    padding: 1,
    elevation: 20,
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  editButton: {
    padding: 10,
    backgroundColor: 'royalblue',
  },
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'azure',
  },
  head: {
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    padding: 5,
    paddingBottom: 10,
    marginTop: -10,
    backgroundColor: 'azure',
  },
  buttonIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    paddingVertical: 5,
    marginBottom: 1,
  },
  card: {
    backgroundColor: 'beige',
    padding: 20,
  },
  listRow: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  textStyle: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
  },
  textStyleBtn: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
  },
});

ChangeUserPassword.propTypes = {
  navigation: PropTypes.object,
  onSetUserInfo: PropTypes.func,
  onSetWorkOrder: PropTypes.func,
  userInfo: PropTypes.object,
  workOrderInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  userInfo: state.app.userInfo,
  workOrderInfo: state.app.workOrderInfo,
});

const mapDispatchToProps = dispatch => ({
  onSetUserInfo: values => dispatch(setUserInfo(values)),
  onSetWorkOrder: values => dispatch(setWorkOrderId(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ChangeUserPassword));
