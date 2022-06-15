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
  Alert,
  RefreshControl,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {get, post, resource} from './common/ServerApi';
import {DataTable, Searchbar} from 'react-native-paper';
import Moment from 'moment';
import {setUserInfo, setWorkOrderId} from './redux/actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MainPage = props => {
  const {navigation, onSetUserInfo, userInfo, workOrderInfo, onSetWorkOrder} =
    props;
  const [init, setInit] = useState(false);
  const [workOrder, setWorkOrder] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  async function getWorkOrder() {
    let id = userInfo.id;
    let url;
    if (searchQuery.length !== 0) {
      url = `api/workOrder/${id}?searchText=${searchQuery}`;
    } else {
      url = `api/workOrder/${id}`;
    }
    try {
      const response = await get(url);
      const json = await response;
      setWorkOrder(json.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWorkOrderById(id) {
    const woId = {id};
    onSetWorkOrder(woId);
    console.log('state: ', workOrderInfo);
    navigation.navigate('WorkOrderDetail');
  }

  useEffect(() => {
    getWorkOrder();
    setInit(true);
  }, [searchQuery, init]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getWorkOrder();
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
            source={require('./logo2.png')}
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
        <Text style={styles.head}>Work Order: TODO</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <DataTable>
          <DataTable.Header style={styles.table}>
            <DataTable.Title>
              <Text style={styles.title}>Date</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.title}>Code</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.title}>Status</Text>
            </DataTable.Title>
          </DataTable.Header>
          {workOrder.map(item => (
            <>
              <DataTable.Row
                style={styles.table}
                onPress={() => {
                  getWorkOrderById(item.id);
                }}>
                <DataTable.Cell>
                  {Moment(item.maintenance_date).format('L')}
                </DataTable.Cell>
                <DataTable.Cell>{item.item_code}</DataTable.Cell>
                <DataTable.Cell>{item.status}</DataTable.Cell>
              </DataTable.Row>
            </>
          ))}
        </DataTable>
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

MainPage.propTypes = {
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
)(withTranslation()(MainPage));
