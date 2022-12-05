import React,{useState,useEffect} from 'react';
import axios from "axios";
import {View ,Text,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native';
import { useSelector } from 'react-redux'; 
function  EditaddressScreen({route,navigation}) {
 //const {address,city,pincode,state,country}=route.params;
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Pincode, setPincode] = useState('');
    const [State,setStat] = useState('');
    const [Country,setCountry] = useState('');
    const data=useSelector((state) =>state);
    const {items}=data;
    var token=items.token;
    const  userid = route.params;
    const onSubmit = () => {
      console.log('submitted');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  } 
  axios
    .post(
        'https://nameless-savannah-21991.herokuapp.com/updateAddress',
        { addressId: userid,
           updatedAddress: {
            address: Address,
            pincode: Pincode,
            city: City,
            state: State,
            country: Country,
             }
        },
    config
).then((resp)=> {
          console.log('response', resp);
          console.log('response received',resp.data);
          navigation.navigate('Shipping Address');
        //   Alert.alert(
        //     "Alert",
        //     "message",resp.data.message,
        //     [
        //       {
        //         text: "Cancel",
        //         onPress: () => console.log("Cancel Pressed"),
        //         style: "cancel"
        //       },
        //       { text: "OK",  onPress: () =>navigation.navigate('Shipping Address') }
        //     ]);
          return true;
        })
        .catch(function (error) {
          console.log('error', error);
          return false;
        });
      }
    return (
        <View style={styles.maincontainer}>
            <View style={styles.container}>
            <Text style={styles.text}>Address</Text>
               <TextInput placeholder='Enter Address' style={styles.inputBox} value={Address} onChangeText={text => setAddress(text)} />
            <Text style={styles.text}>City</Text>
               <TextInput placeholder='Enter City' style={styles.inputBox} value={City} onChangeText={text => setCity(text)} />
            <Text style={styles.text} >PIN Code</Text>
               <TextInput placeholder='Enter Pin Code' style={styles.inputBox} value={Pincode} onChangeText={text => setPincode(text)} />
            <Text style={styles.text}>State</Text>
               <TextInput placeholder='Enter State'  style={styles.inputBox} value={State} onChangeText={text => setStat(text)} />
               <Text style={styles.text}>Country</Text>
               <TextInput placeholder='Enter Country' style={styles.inputBox} value={Country} onChangeText={text => setCountry(text)} />   
               </View>
               <TouchableOpacity style={styles.button} onPress={()=>onSubmit()}>
                 <Text style={styles.buttonText} >Register</Text>
                </TouchableOpacity>
            </View>
           )
}
const styles = StyleSheet.create({
    maincontainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    container: {
        alignItems:'flex-start', 
    },
    inputBox:{
        height: 40,
        width: 350,
        margin: 8,
        borderBottomWidth: 1,
    },
    text:{
        color:'black',
        fontWeight:'500',
        padding:10,
        fontSize:20
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 20,
        marginVertical: 10,
       paddingVertical: 12,
        marginVertical:20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
});
export default  EditaddressScreen;