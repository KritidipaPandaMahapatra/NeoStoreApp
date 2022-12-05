import React,{useContext, useState} from 'react';
//import { createContext } from 'react';
import axios from "axios";
import {View , Text , StyleSheet, TextInput, TouchableOpacity,ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import { goData } from "../redux/action";
import { useLogin } from '../screens/LoginProvider';
//import { useNavigation } from '@react-navigation/native'
// const LoginContext=createContext();
function LoginScreen ({navigation}) {
  const dispatch = useDispatch();
    const [emailVal, setemailVal] = useState('');
    const [passwordVal, setpasswordVal] = useState('');
    //const navigation = useNavigation(); 
  //  const  {setIsLoggedIn}=useLogin('');
    const {setIsLoggedIn}=useLogin('');
   // const setIsLoggedIn=useLogin();
    const onSubmit = () => {
          console.log('submitted');
          axios
            .post(
              'https://nameless-savannah-21991.herokuapp.com/login',
              {
                email:emailVal,
                password:passwordVal
              }
            )
            .then((resp)=> {
              console.log('response', resp);
              console.log('response received');
              const allData = response = {
                token: resp.data.token
              }
              console.log(allData);
              dispatch(goData(allData));
            navigation.navigate('Dashboard');
            setIsLoggedIn(true);
             // navigation.navigate('Shipping Address');
              //navigation.navigate('Order History');
              return true;
            })
            .catch(function (error) {
              console.log('error', error);
              alert('Unable to Login');
              return false;
            });  
          }
    return (
      // <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      <ScrollView style={{ backgroundColor:'#ffffff'}}>
    <View style={styles.container}>
    <Text style={styles.title}>NeoStore</Text>
    <View style={styles.formcontainer}>
    <Text style={styles.text}>Username</Text>
    <TextInput placeholder='Kritidipa' style={styles.inputBox} value={emailVal}  onChangeText={text => setemailVal(text)}/>
    <Text style={styles.text}>Password</Text>
    <TextInput secureTextEntry placeholder='********' style={styles.inputBox}  value={passwordVal}  onChangeText={text => setpasswordVal(text)} />
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>onSubmit()}>Login</Text>
      </TouchableOpacity>
    </View>  
      <TouchableOpacity>
      <Text style={[styles.text,{marginBottom:20}]} onPress={() => navigation.navigate('Forgot Password')}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}} >
        <Text style={styles.text}>Don't have an account?</Text>
        <Text  style={[styles.text,{color:'blue'}]} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    // </LoginContext.Provider>
    );
    }
    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            marginTop:50 
        },
        title:{
            fontSize:40,
            fontWeight:'bold',
            color:'#9e0100',
        },
        formcontainer:{
            alignItems:'flex-start',
            marginTop:50
        },
        inputBox: {
            width: 300,
            backgroundColor: '#eeeeee', 
            borderRadius: 25,
            paddingHorizontal: 16,
            fontSize: 16,
            color: '#002f6c',
            marginVertical: 10
        },
        button: {
            width: 300,
            backgroundColor: '#4f83cc',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 12
        },
        buttonText: {
            fontSize: 16,
            fontWeight: '500',
            color: '#ffffff',
            textAlign: 'center'
        },
        text:{
            color:'black',
            fontWeight:'bold'
        },
    });
  
    export default LoginScreen;