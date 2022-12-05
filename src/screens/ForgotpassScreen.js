import React,{useState} from 'react';
import axios from "axios";
import {View , Text , StyleSheet, TextInput, TouchableOpacity,Alert, ScrollView } from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';
function ForgotpassScreen({navigation}){
    const [emailval, setemailval] = useState('');
    const storeCode= async(code)=> {
        try {
           await AsyncStorage.setItem("Verification code",JSON.stringify(code));
           console.log(code);
        } catch (error) {
          console.log("Something went wrong while storing user token!", error);
        }
      }
    const onSubmit = () => {
        console.log('submitted');
        axios
          .post(
            'https://nameless-savannah-21991.herokuapp.com/forgotPassword',
            {
              email:emailval,
            }
          )
          .then((resp)=> {
            console.log('response', resp);
            console.log('response received');
            alert(resp.data.code);
           const code= response= {code:resp.data.code};
            storeCode(code);
           console.log(code);
           Alert.alert(
            "Alert",
            "Code" ,resp.data.code,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK",  onPress: () =>navigation.navigate('Reset Password')}
            ]);
          //alert("Registration Successfull");
          //  navigation.navigate('Reset Password');
            return true;
          })
          .catch(function (error) {
            console.log('error', error);
            return false;
          });
        }
    return (
      <ScrollView style={{ backgroundColor:'#ffffff'}}>
    <View style={styles.container}>
        <Text style={[styles.text,{fontWeight:'500',fontSize:20}]} >Forgot Password?</Text>
    <View style={styles.formcontainer}>
    <Text style={styles.text}>Email</Text>
    <TextInput placeholder='test@gmail.com' style={styles.inputBox}  value={emailval}  onChangeText={text => setemailval(text)}/>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>onSubmit()}>Submit</Text>
      </TouchableOpacity>
    </View>  
    </View>
    </ScrollView>
    );
    }
    const styles = StyleSheet.create({
        container: {
            //flex:1,
            //justifyContent:'center',
             alignItems:'center',
            marginTop:120
        },
        formcontainer:{
            alignItems:'flex-start',
            marginTop:50,
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
            fontWeight:'500',
            fontSize:15
        },
    });
    export default ForgotpassScreen;