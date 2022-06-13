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

const UpdateProfile = props => {
  const {navigation, onSetUserInfo, userInfo, workOrderInfo, onSetWorkOrder} =
    props;
  const [init, setInit] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  async function getUpdateProfileRequest(
    inputName,
    inputEmail,
    inputIcNumber,
    inputContactNumber,
    inputAddress,
  ) {
    let id = userInfo.id;
    try {
      const response = await post(`api/profile/edit/${id}`, {
        name: inputName,
        ic_number: inputIcNumber,
        contact_number: inputContactNumber,
        address: inputAddress,
        email: inputEmail,
      });
      Alert.alert(response);
      navigation.navigate('Profile');
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
            name="person"
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
          <Text>Work Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WorkOrderHistory')}>
          <Text>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.head}>Edit</Text>
        <Text>Name: </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Name"
          value={name}
          onChangeText={newValue => setName(newValue)}
        />
        <Text>Email: </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          value={email}
          onChangeText={newValue => setEmail(newValue)}
        />
        <Text>IC: </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="IC"
          value={icNumber}
          onChangeText={newValue => setIcNumber(newValue)}
        />
        <Text>Contact Number: </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={newValue => setContactNumber(newValue)}
        />
        <Text>Address: </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Address"
          value={address}
          onChangeText={newValue => setAddress(newValue)}
        />
        <Button
          title="Submit"
          onPress={newValue =>
            getUpdateProfileRequest(
              name,
              email,
              icNumber,
              contactNumber,
              address,
            )
          }
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
  },
  button: {
    width: '33.33%',
    flex: 1,
    alignItems: 'center',
    padding: 1,
    elevation: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: 'lightgrey',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 10,
    color: 'black',
    textAlign: 'left',
  },
  head: {
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    padding: 5,
    paddingBottom: 10,
    marginTop: -10,
  },
  buttonIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    paddingVertical: 5,
    marginBottom: 1,
  },
});

UpdateProfile.propTypes = {
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
)(withTranslation()(UpdateProfile));