import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Button,
  Image,
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <ScrollView>
        <View>
          <Text style={styles.backBtn}>
            <TouchableOpacity onPress={() => console.log('button pressed')}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </TouchableOpacity>
          </Text>
        </View>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../logo2.png')}
          />
          <Text style={styles.head}>E-Maintenance App</Text>

          <Text>Email: </Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            value={email}
            onChangeText={newValue => setEmail(newValue)}
          />
          <Text>Password: </Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={newValue => setPassword(newValue)}
          />
          <Button title="Submit" />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  head: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 1,
  },
  backBtn: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 20,
  },
});

export default Login;
