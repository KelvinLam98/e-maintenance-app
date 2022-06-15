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
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import stores from './src/redux/stores';
import MainPage from './src/MainPage';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import WorkOrderHistory from './src/screens/WorkOrderHistory';
import WorkOrderDetail from './src/screens/WorkOrderDetail';
import UpdateProfile from './src/screens/UpdateProfile';
import UpdateWorkOrder from './src/screens/UpdateWorkOrder';
import ChangeUserPassword from './src/screens/ChangeUserPassword';
import {navigationRef} from './src/RootNavigation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={stores}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen
              name="ChangeUserPassword"
              component={ChangeUserPassword}
            />
            <Stack.Screen
              name="WorkOrderHistory"
              component={WorkOrderHistory}
            />
            <Stack.Screen name="WorkOrderDetail" component={WorkOrderDetail} />
            <Stack.Screen name="UpdateWorkOrder" component={UpdateWorkOrder} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
