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
import {NativeBaseProvider, SectionList} from 'native-base';

const MainPage = ({navigation}) => {
  const [init, setInit] = useState(false);
  const [workOrder, setWorkOrder] = useState([]);
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
        <TouchableOpacity style={styles.button} onPress={() => getWorkOrder()}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
      {workOrder.map(item => (
        <Table>
          <tbody>
            <td>{item.id}</td>
            <td>{item.maintenanceDate}</td>
            <td>{item.maintenanceName}</td>
            <td>{item.status}</td>
            <td>{item.person_in_charge}</td>
          </tbody>
        </Table>
      ))}
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
