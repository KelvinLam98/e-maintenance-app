/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
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
  RefreshControl,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {get, post, resource} from '../common/ServerApi';
import {DataTable, numberOfLines} from 'react-native-paper';
import Moment from 'moment';
import {setUserInfo, setWorkOrderId} from '../redux/actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Profile = props => {
  const {navigation, onSetUserInfo, userInfo, workOrderInfo, onSetWorkOrder} =
    props;
  const [init, setInit] = useState(false);
  const [profileDetail, setProfileDetail] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getProfileDetail() {
    let id = userInfo.id;
    console.log('work order id get from redux: ', id);
    let url;
    url = `api/profile/${id}`;
    try {
      const response = await get(url);
      const json = await response;
      console.log('json: ', json);
      setProfileDetail(json.data);
      console.log('profile detail: ', profileDetail);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProfileDetail();
    setInit(true);
  }, [init]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getProfileDetail();
      return () => {
        isActive = false;
      };
    }, []),
  );

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
        <Text style={styles.head}>
          Profile {'  '}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('UpdateProfile')}>
            <Text style={styles.textStyleBtn}>Edit</Text>
          </TouchableOpacity>
        </Text>
        {profileDetail.map(item => (
          <>
            <View style={styles.card}>
              <View style={styles.listRow}>
                <Text style={styles.textStyle}>Name: </Text>
                <Text style={styles.textStyle}>{item.name}</Text>
              </View>
              <View style={styles.listRow}>
                <Text style={styles.textStyle}>IC Number: </Text>
                <Text style={styles.textStyle}>{item.ic_number}</Text>
              </View>
              <View style={styles.listRow}>
                <Text style={styles.textStyle}>Contact Number: </Text>
                <Text style={styles.textStyle}>{item.contact_number}</Text>
              </View>
              <View style={styles.listRow}>
                <Text style={styles.textStyle}>Email: </Text>
                <Text style={styles.textStyle}>{item.email}</Text>
              </View>
              <View style={styles.listRow}>
                <Text style={styles.textStyle}>Address: </Text>
                <Text style={styles.textStyle}>{item.address}</Text>
              </View>
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
    backgroundColor: 'azure',
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

Profile.propTypes = {
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
)(withTranslation()(Profile));
