/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainPage from './src/MainPage';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import WorkOrderHistory from './src/screens/WorkOrderHistory';
import WorkOrderDetail from './src/screens/WorkOrderDetail';
import {Provider} from 'react-redux';
import stores from './src/redux/stores';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={stores}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="WorkOrderHistory" component={WorkOrderHistory} />
          <Stack.Screen name="WorkOrderDetail" component={WorkOrderDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
