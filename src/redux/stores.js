/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {createStore} from 'redux';
import reducers from './reducers';

const appStore = createStore(reducers);

export default appStore;
