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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {get, post, resource} from '../common/ServerApi';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';
import {setUserInfo, setWorkOrderId} from '../redux/actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

const WorkOrderDetail = props => {
  const {navigation, onSetUserInfo, userInfo, workOrderInfo, onSetWorkOrder} =
    props;
  const [init, setInit] = useState(false);
  const [workOrderDetails, setWorkOrderDetail] = useState([]);

  async function getWorkOrder() {
    let id = workOrderInfo.id;
    console.log('work order id get from redux: ', id);
    let url;
    url = `api/workOrder/detail/${id}`;
    try {
      const response = await get(url);
      const json = await response;
      console.log('json: ', json);
      setWorkOrderDetail(json.data);
      console.log('work order: ', workOrderDetails);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWorkOrder();
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
        <Text style={styles.head}>
          Work Order {'  '}
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateWorkOrder')}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </Text>
        {workOrderDetails.map(item => (
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Maintenance Name</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.item_code}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Maintenance Date</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>
                  {Moment(item.maintenance_date).add(1, 'day').format('L')}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Maintenance Time</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.maintenance_time}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Status</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.status}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Technician Name</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.technician_name}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Technician Contact</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.technician_contact}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Item Code</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.item_code}</Text>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <Text>Item Name</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{item.item_name}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
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

WorkOrderDetail.propTypes = {
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
)(withTranslation()(WorkOrderDetail));
