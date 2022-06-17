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
  const [profileDetail, setProfileDetail] = useState([]);

  async function getProfileDetail() {
    let id = userInfo.id;
    console.log('profile id get from redux: ', id);
    let url;
    url = `api/profile/${id}`;
    try {
      const response = await get(url);
      const json = await response;
      console.log('json: ', json);
      setProfileDetail(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log('profileDetail', profileDetail)

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
    getProfileDetail();
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
          <Text style={styles.textStyle}>Work Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WorkOrderSample')}>
          <Text style={styles.textStyle}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.textStyle}>Profile</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.head}>Edit</Text>
        {profileDetail.map(detail => (
          <>
          <View style={styles.card}>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Name: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Name"
              value={name}
              defaultValue={userInfo.id}
              onChangeText={newValue => setName(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Email: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              value={email}
              defaultValue={detail.email}
              onChangeText={newValue => setEmail(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>IC: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="IC"
              value={icNumber}
              defaultValue={detail.ic_number}
              onChangeText={newValue => setIcNumber(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Contact Number: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Contact Number"
              value={contactNumber}
              defaultValue={detail.contact_number}
              onChangeText={newValue => setContactNumber(newValue)}
            />
          </View>
          <View style={styles.listRow}>
            <Text style={styles.textStyle}>Address: </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Address"
              value={address}
              defaultValue={detail.address}
              onChangeText={newValue => setAddress(newValue)}
            />
          </View>
          <Button
            title="Submit"
            color="royalblue"
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
          </View>
          </>
        ))} 
      </ScrollView>
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
