// import React,{useState} from 'react'
// import { View, Text,ScrollView ,StyleSheet,TouchableOpacity,Alert} from 'react-native'
// import { TextInput } from 'react-native-paper';
// import {useSelector} from 'react-redux';
// import axios from "axios";
// const ResetpassScreen= ({navigation}) => {
//     const data = useSelector((state) => state);
//     const {authData}=data;
//     console.log(authData);
//     const [oldPassword, setoldPassword] = useState('');
//   const [newpassword, setNewpassword] = useState('');
//   const [cpassword, setCpassword] = useState('');
//   var token = data.token;
//     console.log('Token in changepassword is',token);
//     const currentPassword = oldPassword => {
//         setoldPassword(oldPassword);
//       };
//       const handlePassword = newpassword => {
//         setNewpassword(newpassword);
//       };
//       const handlecPassword = cpassword => {
//         setCpassword(cpassword);
//       };
//       const config = {
//         headers: {Authorization: `Bearer ${token}`},
//       };
//       const Reset = () => {
//         console.log('reset');
//         if (newpassword == cpassword) {
//           axios
//             .post(
//               'https://nameless-savannah-21991.herokuapp.com/changePassword',
//               {
//                 currentPassword: oldPassword,
//                 newPassword: newpassword,
//               },
    
//               config,
//             )
//             .then(function (response) {
//               console.log('response from Change Pass', response);
//               //navigation.navigate('UpdateAddress');
//               //Alert.alert('password changed successfully');
//             })
//             .catch(function (error) {
//               console.log('error', error);
//               //Alert.alert('Wrong Current Password');
//             });
//         } else {
//           //Alert.alert('Both password are not same');
//         }
//       };
//     return (
//         <ScrollView>
//             <Text style={styles.title}>Change Password</Text>
//            <TextInput style={styles.input}
//         label="Enter Current Password"
//         value={oldPassword}
//         onChangeText={oldPassword => {
//           currentPassword(oldPassword);
//         }}/>
//         <TextInput style={styles.input}
//         label="Enter New Password"
//         value={newpassword}
//         onChangeText={newpassword => {
//             handlePassword(newpassword);
//           }}/>
//         <TextInput style={styles.input}
//         label="Confirm New Password"
//         value={cpassword}
//         onChangeText={cpassword => {
//             handlecPassword(cpassword);
//           }}/>
//         <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           Reset();
//         }}>
//         <Text style={styles.btntext}>Submit</Text>
//       </TouchableOpacity>
//         </ScrollView>
//     )
// }
// const styles =StyleSheet.create({
// button:{

//     alignSelf:'stretch',
//     alignItems:'center',
//     paddingTop:17,
//     paddingBottom:15,
//     marginTop:13,
//     backgroundColor:'#00BCD4',
//     marginTop:10,
//     paddingTop:15,
//     marginLeft:60,
//     marginRight:60,
//     borderRadius:10,
//     borderWidth:1,
//     },
// btntext:{

//     color:'#fff',
//     fontWeight:'bold',
//     fontSize:20,

// },
// title:{

//     fontSize:30,
//     color:'maroon',
//     paddingBottom:10,
//     marginBottom:40,
//     alignContent:'center',
//     textAlign:'center',
//     fontWeight:'bold',
//     marginTop:50,
// },
// input:{

//    fontSize:15,

// },
// })
// export default ResetpassScreen;

import React,{useEffect,useState} from 'react';
import axios from "axios";
import {View , Text , StyleSheet, TextInput, TouchableOpacity,Alert, ScrollView} from 'react-native';
import  AsyncStorage  from "@react-native-community/async-storage";
import { useSelector} from 'react-redux'; 
function ResetpassScreen({navigation}){
    const [Newpassword, setNewpassword] = useState('');
    const [CNewpassword, setCNewpassword] = useState('');
    const [Oldpassword, setOldpassword] = useState('');
    const data=useSelector((state) =>state);
    const {items}=data;
     var token=items.token;
    const getCode=(async(code)=> {
         console.log('getcode',code);
          try {
            let verificationcode = await AsyncStorage.getItem("usercode",code);
            let data =JSON.parse(verificationcode);
            console.log('getasyccode',data);
            // console.log('getAsycEmail',data.email);
             onSubmit(data);
          } catch (error) {
            console.log("Something went wrong while retrieving user token!", error);
          }
        })
        // useEffect(() => {
        //     getCode();
        //   }, []);
          const onSubmit = (data) => {
            console.log('submitted');
            //console.log(token);
            const config = {
              headers: {Authorization: `Bearer ${token}`},
            };
            axios
              .post(
               'https://nameless-savannah-21991.herokuapp.com/recoverPassword',
                {
                verificationCode:data,
                password:Newpassword,
                },
               config,
              )
              .then((resp)=> {
                console.log('response', resp.data);
                console.log('response received');
                Alert.alert(
                  "Alert",
                  "Code" ,resp.data.message,  
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK",  onPress: () =>navigation.navigate('Login')}
                  ]);
                // alert(resp.data.message);
                // navigation.navigate('Login');
                return true;
              })
              .catch(function (error) {
                console.log('error', error);
                return false;
              });
            }
            const Reset = () => {
              const config = {
                headers: {Authorization: `Bearer ${token}`},
              };
                      console.log('reset');
                      if (Newpassword == CNewpassword) {
                        axios
                          .post(
                            'https://nameless-savannah-21991.herokuapp.com/changePassword',
                            {
                              currentPassword: Oldpassword,
                              newPassword: Newpassword,
                            },
                  
                            config,
                          )
                          .then(function (response) {
                            console.log('response from Change Pass', response);
                            //navigation.navigate('UpdateAddress');
                            Alert.alert('Password changed successfully');
                             navigation.navigate('My Account');
                          })
                          .catch(function (error) {
                            console.log('error', error);
                            Alert.alert('Wrong Current Password');
                          });
                      } else {
                        Alert.alert('Both password are not same');
                      }
                    };
    return (
      <ScrollView style={{ backgroundColor:'#ffffff'}}>
    <View style={styles.container}>
    <View style={styles.formcontainer}>
    <Text style={styles.text}>Enter current Password</Text>
    <TextInput secureTextEntry placeholder='********' style={styles.inputBox} value={Oldpassword}  onChangeText={text => setOldpassword(text)}/>
     <Text style={styles.text}>Enter New Password</Text>
    <TextInput secureTextEntry placeholder='********' style={styles.inputBox} value={Newpassword}  onChangeText={text => setNewpassword(text)}/>
    <Text style={styles.text}>Confirm New Password</Text>
    <TextInput secureTextEntry placeholder='********' style={styles.inputBox} value={CNewpassword}  onChangeText={text => setCNewpassword(text)}/>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>getCode()} onPress={()=>Reset()}>Submit</Text>
      </TouchableOpacity>
    </View>  
    </View>
    </ScrollView>
    );
    }
    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            marginTop:120
        },
        formcontainer:{
            alignItems:'flex-start',
            marginTop:50,
        },
        inputBox:{
            height: 40,
            width: 300,
            margin: 8,
            borderBottomWidth: 1,
            //borderColor: `#c0c0c0`,
            padding: 10,
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
            fontSize:20
        },
    });
    export default ResetpassScreen;