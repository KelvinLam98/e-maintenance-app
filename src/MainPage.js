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
import {get, post, resource} from './common/ServerApi';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

const MainPage = ({navigation}) => {
  const [init, setInit] = useState(false);
  const [workOrder, setWorkOrder] = useState([]);
  const [page, setPage] = React.useState<number>(1);
  async function getWorkOrder() {
    try {
      const response = await get('api/workOrder');
      console.log('debug1===', response);
      const json = await response;
      setWorkOrder(json.data);
      console.log('debug2===', json.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    setInit(true);
    getWorkOrder();
  }, [init]);

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
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={{flex: 2}}>Date</DataTable.Title>
            <DataTable.Title style={{flex: 2}}>
              Maintenance Name
            </DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
          {workOrder.map(item => (
            <>
              <DataTable.Row
                style={styles.header}
                onPress={() => console.log('pressed row')}>
                <DataTable.Cell style={{flex: 2}}>
                  {Moment(item.maintenance_date).format('LL')}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 2}}>
                  {item.maintenance_name}
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

export default MainPage;
