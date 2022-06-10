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
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {get, post, resource} from './common/ServerApi';
import {DataTable, Searchbar} from 'react-native-paper';
import Moment from 'moment';

const MainPage = ({navigation}) => {
  const [init, setInit] = useState(false);
  const [workOrder, setWorkOrder] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  async function getWorkOrder() {
    let url;
    if (searchQuery.length !== 0) {
      url = `api/workOrder?searchText=${searchQuery}`;
    } else {
      url = 'api/workOrder';
    }
    try {
      const response = await get(url);
      const json = await response;
      setWorkOrder(json.data);
    } catch (error) {
      Alert.alert('error');
    }
  }

  useEffect(() => {
    getWorkOrder();
    setInit(true);
  }, [searchQuery, init]);

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
        <Text style={styles.head}>Work Order: TODO</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <DataTable>
          <DataTable.Header style={styles.table}>
            <DataTable.Title style={{flex: 2}}>
              <Text style={styles.title}>Date</Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 2}}>
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
                onPress={() => console.log('pressed row')}>
                <DataTable.Cell style={{flex: 2}}>
                  {Moment(item.maintenance_date).add(1, 'day').format('L')}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 2}}>
                  {item.item_code}
                </DataTable.Cell>
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
  table: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
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
  title: {
    fontSize: 18,
    color: 'black',
  },
  buttonIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    paddingVertical: 5,
    marginBottom: 1,
  },
});

export default MainPage;
