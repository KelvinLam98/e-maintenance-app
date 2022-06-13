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
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

const UpdateWorkOrder = props => {
  const {navigation, onSetUserInfo, userInfo, workOrderInfo, onSetWorkOrder} =
    props;
  const [init, setInit] = useState(false);
  const [status, setStatus] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();

  async function getUpdateWorkOrderRequest(inputDate, inputTime, inputStatus) {
    console.log(inputDate, inputTime, inputStatus);
    let id = workOrderInfo.id;
    try {
      const response = await post(`api/workOrder/detail/edit/${id}`, {
        maintenance_date: inputDate,
        maintenance_time: inputTime,
        status: inputStatus,
      });
      Alert.alert(response);
      navigation.navigate('WorkOrderDetail');
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
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.head}>Edit</Text>
          <Text>Date: {date.toDateString()}</Text>
          <Button title="Choose Date" onPress={() => setDatePicker(true)} />
          <DatePicker
            modal
            open={datePicker}
            date={date}
            mode="date"
            onConfirm={date => {
              setDatePicker(false);
              setDate(date);
            }}
            onCancel={() => {
              setDatePicker(false);
            }}
          />
          <Text>Time: </Text>
          <Picker
            selectedValue={time}
            onValueChange={(itemValue, itemIndex) => setTime(itemValue)}>
            <Picker.Item label="09:00" value="09:00" />
            <Picker.Item label="10:00" value="10:00" />
            <Picker.Item label="11:00" value="11:00" />
            <Picker.Item label="12:00" value="12:00" />
            <Picker.Item label="13:00" value="13:00" />
            <Picker.Item label="14:00" value="14:00" />
            <Picker.Item label="15:00" value="15:00" />
            <Picker.Item label="16:00" value="16:00" />
            <Picker.Item label="17:00" value="17:00" />
            <Picker.Item label="18:00" value="18:00" />
          </Picker>
          <Text>Status: </Text>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
            <Picker.Item label="Created" value="Created" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
          <Button
            title="Submit"
            onPress={newValue => getUpdateWorkOrderRequest(date, time, status)}
          />
        </ScrollView>
      </SafeAreaView>
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
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

UpdateWorkOrder.propTypes = {
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
)(withTranslation()(UpdateWorkOrder));
