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
 
 const CreateBySample = props => {
   const {navigation, onSetUserInfo, userInfo, workOrderSampleInfo, onSetWorkOrder} =
     props;
   const [init, setInit] = useState(false);
   const [status, setStatus] = useState('');
   const [datePicker, setDatePicker] = useState(false);
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState('09:00');
 
   async function getUpdateWorkOrderRequest(inputDate, inputTime, inputStatus) {
     let id = workOrderSampleInfo.id;
     try {
       const response = await post(`api/workOrderSample/detail/create/${id}`, {
         maintenance_date: inputDate,
         maintenance_time: inputTime,
       });
       Alert.alert(response);
       navigation.navigate('WorkOrderSampleDetail');
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
           <Text style={styles.textStyle}>Work Order</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.button}
           onPress={() => navigation.navigate('WorkOrderSample')}>
           <Text style={styles.textStyle}>Request</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.button}
           onPress={() => navigation.navigate('Profile')}>
           <Text style={styles.textStyle}>Profile</Text>
         </TouchableOpacity>
       </View>
       <SafeAreaView style={{flex: 1}}>
         <ScrollView style={styles.container}>
           <Text style={styles.head}>Edit</Text>
           <View style={styles.card}>
             <View style={styles.listRow}>
               <Text style={styles.textStyle}>Date: {Moment(date).format('L')} {'   '}<Ionicons
                 name="calendar-sharp"
                 size={30}
                 color="black"
                 onPress={() => setDatePicker(true)}
               /></Text>
               
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
             </View>
             <View style={styles.listRow}>
               <Text style={styles.textStyle}>Time: </Text>
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
             </View> 
             <Button
               title="Submit"
               color="royalblue"
               onPress={newValue =>
                 getUpdateWorkOrderRequest(date, time)
               }
             />
           </View>
         </ScrollView>
       </SafeAreaView>
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
     backgroundColor: 'lightblue',
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
 
 CreateBySample.propTypes = {
   navigation: PropTypes.object,
   onSetUserInfo: PropTypes.func,
   onSetWorkOrder: PropTypes.func,
   userInfo: PropTypes.object,
   workOrderSampleInfo: PropTypes.object,
 };
 
 const mapStateToProps = state => ({
   userInfo: state.app.userInfo,
   workOrderSampleInfo: state.app.workOrderSampleInfo,
 });
 
 const mapDispatchToProps = dispatch => ({
   onSetUserInfo: values => dispatch(setUserInfo(values)),
 });
 
 export default connect(
   mapStateToProps,
   mapDispatchToProps,
 )(withTranslation()(CreateBySample));
 