import React,{useEffect,useState} from 'react';
import {View ,Text,StyleSheet,Image} from 'react-native';
import axios from "axios";
import { Avatar } from 'react-native-paper';
import Ordericon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux'; 
import { useDispatch } from 'react-redux';
import { profileData } from "../redux/action";  
import { useIsFocused } from '@react-navigation/native';
import {profileImage} from './Image';
function MyaccountScreen({navigation}) {
  //const [Profiledata,setProfiledata] = useState('');
  const [ProfileName,setProfileName] = useState('');
  const [ProfileSName,setProfileSName] = useState('');
  const [ProfileEmail,setProfileEmail] = useState('');
  const [contactNo,setcontactNo] = useState('');
  const[profilePic,setProfileimage]=useState('');
 const dispatch = useDispatch();
  const data=useSelector((state) =>state);
  const isFocused = useIsFocused();
    const {items}=data;
   // console.log(data);
    var token=items.token;
    //  const {userdata}=data;
    // console.log(userdata);
    // console.log(token);
        // useEffect(() => {
        //    onSubmit();
        //   }, [])
        // let user_image=Profiledata.profilePic;
      // console.log(profilePic);
     console.log(ProfileName);
        const somefunctionfive=(user_image)=>{
          console.log(user_image);
          setProfileimage(user_image);
        }
        //console.log(profilePic);
          React.useEffect(() => {
            onSubmit();
          //  somefunctionfive();
          }, [isFocused]);
        const onSubmit = () => {
            console.log('submitted');
            const config = {
              headers: { Authorization: `Bearer ${token}` }
          }
            axios
            .get('https://nameless-savannah-21991.herokuapp.com/profile',
            config
              )
              .then((resp)=> {
                console.log('response', resp.data);
                console.log('response received');
              //   const userData = response = {
              //     firstName: resp.data.userData.firstName,
              //     email:resp.data.userData.email,
              //     mobile:resp.data.userData.mobile,
              //  }
              var userData=resp.data.userData;
              //setProfiledata(userData);
               // console.log(userData);
               setProfileEmail(resp.data.userData.email);
               setProfileName(resp.data.userData.firstName);
               setcontactNo(resp.data.userData.mobile);
               setProfileSName(resp.data.userData.secondName);
                var user_image=resp.data.userData.profilePic;
                //setProfileimage(user_image)
                console.log(user_image);
                somefunctionfive(user_image);
               // dispatch(profileData(userData));
                return true;
              })
              .catch(function (error) {
                console.log('error', error);
                return false;
              });
            }
    return (
        <View>
            <View style={styles.Container}>
            <Image 
            //style={{height:60,width:40,borderRadius:20,  marginHorizontal:5,marginTop:10,}}
            //size={90}
            style={styles.CircleShape}    
                source={{uri: `${profileImage}${profilePic}`}}
                        //      // style={{width: 100, height: 230}} 
                        //         source={{
                        //  uri: `https://nameless-savannah-21991.herokuapp.com/images/user/${Profiledata.profilePic}`
                        //        }}
                             />
            {/* <Avatar.Image source={require('../Image/img_avatar2.png')} size={90} /> */}
            <View style={styles.container}>
            {/* <Text style={{color:'black'}}>{ProfileName}</Text> */}
                <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>{ProfileName} {ProfileSName}</Text>
                <Text style={{color:'black'}}>{contactNo}</Text>
                <Text style={{color:'black'}}>{ProfileEmail}</Text>
            </View> 
            </View>  
            <View style={styles.box}>
            <Ordericon name="clipboard-notes" size={30} color="black"/>
            <Text style={styles.text} onPress={()=>navigation.navigate("Order Details")}>Order History</Text>
            <Icon name="arrow-right" size={30} color="black"/>
            </View>
            <View style={styles.box}>
            <Icon name="cart" size={30} color="black"/>
            <Text style={styles.text}  onPress={()=>navigation.navigate("Cart")}>Cart</Text>
            <Icon name="arrow-right" size={30} color="black"/>
            </View>
            <View style={styles.box}>
            <Icon name="map-marker" size={30} color="black"/>
            <Text style={styles.text} onPress={()=>navigation.navigate("Shipping Address")}>Shipping Address</Text>
            <Icon name="arrow-right" size={30} color="black"/>
            </View>
            <View style={styles.box}>
            <Icon name="account-edit" size={30} color="black"/>
            <Text style={styles.text} onPress={()=>navigation.navigate("Edit Profile",{ProfileName,ProfileSName,ProfileEmail,contactNo})}>Edit Profile</Text>
            <Icon name="arrow-right" size={30} color="black"/>
            </View>
            <View style={styles.box}>
            <Icon name="lock" size={30} color="black"/>
            <Text style={styles.text} onPress={()=>navigation.navigate("Reset Password")}>Reset Password</Text>
            <Icon name="arrow-right" size={30} color="black"/>
            </View>

        </View>
        )
}
const styles = StyleSheet.create({
    container: {
        marginLeft:50,
       // justifyContent:'flex-end',
        alignItems:'flex-start'
    },
    Container:{
        paddingTop:50,
        flexDirection:'row',
       justifyContent:'center',
       // alignItems:'center'
    },
    CircleShape: {
      width: 100,
      height: 100,
      borderRadius: 150 / 2,
      backgroundColor: '#FF9800',
      //marginTop:4,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:25,
        //marginBottom:500,
      },
    box:{
        margin:15,
        height:50,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        elevation:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    text:{
        fontSize:15,
        color:'black'
    },
});
export default MyaccountScreen;


// import React ,{useState,useEffect}from 'react'
// import { View, Text ,Image,StyleSheet,TouchableOpacity} from 'react-native'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {profileImage} from './Constraint'
// import {hp, wp} from './Style';
// import {useDispatch} from 'react-redux';
// import {useSelector} from 'react-redux';
// import { get_profile } from '../Redux/Auth Folder/AuthAction';
// import axios from 'axios';
// import {Avatar, Appbar, Title, Card} from 'react-native-paper';
// export default function MyaccountScreen({navigation}) {
  
//  const data = useSelector((state) => state);
 
//  const Dispatch = useDispatch();
 
//   const {authData}=data;
//   var token = authData.token;
//   console.log("token is",token)
//   const[profilename,setProfilename]=useState('');
//   const[lastname,setLastname]=useState(''); 
//   const [mobileno,setMobileno]=useState('');
//   const[useremail,setUseremail]=useState('');
//   const[profilePic,setProfileimage]=useState('');
//   const somefunction=(profile_name)=>{
//     setProfilename(profile_name)
//   }
//   const somefunctiontwo=(phoneno)=>{
//     setMobileno(phoneno)
//   }
//    const somefunctionthree=(last_name)=>{
//     setLastname(last_name)
//   } 
//   const somefunctionfourth=(user_email)=>{
//     setUseremail(user_email)
//   }
//   const somefunctionfive=(user_image)=>{
//     setProfileimage(user_image)
//   }
//      useEffect(() => {
//       axios
//         .get('https://nameless-savannah-21991.herokuapp.com/profile', {
//           headers: {Authorization: `Bearer ${token}`},
//         })
//         .then(function (response) {
//           console.log('Account response=======>', response.data);
//           let profile_name=response.data.userData.firstName;
//           somefunction(profile_name);
//           let phoneno=response.data.userData.mobile;
//           somefunctiontwo(phoneno);
//            let last_name=response.data.userData.secondName;
//           somefunctionthree(last_name); 
//           let user_email=response.data.userData.email;
//           somefunctionfourth(user_email);
//           let user_image=response.data.userData.profilePic;
//           somefunctionfive(user_image);
//           var resultdata=response.data.userData;
//           Dispatch(get_profile(resultdata))
//           console.log("dispatch success");
          
//           return true;
//         }) 
//         .catch(function (error) {
//           console.log('my account error', error);
//           return false;
//         });
//     }, []); 
//     return (
//         <View>
//         <View style={{flexDirection: 'row'}}>
           
//            <Image style={styles.CircleShape}  
//               source={{uri: `${profileImage}${profilePic}`}}
//               //resizeMode="contain"
//               //style={EditProfileStyl.image}
//               //size={150}
//           />
//           <View style={{flexDirection: 'column'}}>
//             <View style={{flexDirection:'row'}}>
//            <Text style={styles.name}>{profilename}</Text>
//            <Text style={styles.namem}>{lastname}</Text>
//           </View>
           
//            <Text style={styles.namee}>{mobileno}</Text>
//            <Text style={styles.namee}>{useremail}</Text>
//            </View>
          
//         </View>
//         <TouchableOpacity onPress={() => {navigation.navigate('OrderHistory');
//         }}>
//         <View style={styles.card}>
//           <FontAwesome
//             name="first-order"
//             color="black"
//             size={30}
//             style={styles.leftIcon}
//           />
//           <Text style={styles.text}>Order History</Text>
//           <AntDesign
//             name="arrowright"
//             color="black"
//             size={30}
//             style={styles.rightIcon}
//           />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {
//           navigation.navigate('CartListScreen');
//         }}>
//         <View style={styles.card}>
//           <FontAwesome
//             name="shopping-cart"
//             color="black"
//             size={30}
//             style={styles.leftIcon}
//           />
//           <Text style={styles.text}>Cart</Text>
//           <AntDesign
//             name="arrowright"
//             color="black"
//             size={30}
//             style={styles.rightIcon}
//           />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {navigation.navigate('ShippingAddress'); }}>
//         <View style={styles.card}>
//           <Ionicons
//             name="location-sharp"
//             color="black"
//             size={30}
//             style={styles.leftIcon}
//           />
//           <Text style={styles.text}>Shipping Address</Text>
//           <AntDesign
//             name="arrowright"
//             color="black"
//             size={30}
//             style={styles.rightIcon}
//           />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity  onPress={() => {
//           navigation.navigate('EditProfile');
//         }}>
//         <View style={styles.card}>
//           <MaterialIcons
//             name="edit"
//             color="black"
//             size={30}
//             style={styles.leftIcon}
//           />
//           <Text style={styles.text}>Edit Profile</Text>
//           <AntDesign
//             name="arrowright"
//             color="black"
//             size={30}
//             style={styles.rightIcon}
//           />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('ChangePassword');
//         }}>
//         <View style={styles.card}>
//           <MaterialCommunityIcons
//             name="lock-reset"
//             color="black"
//             size={30}
//             style={styles.leftIcon}
//           />
//           <Text style={styles.text}>Reset Password</Text>
//           <AntDesign
//             name="arrowright"
//             color="black"
//             size={30}
//             style={styles.rightIcon}
//           />
//         </View>
//       </TouchableOpacity>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     CircleShape: {
//       width: 100,
//       height: 100,
//       borderRadius: 150 / 2,
//       backgroundColor: '#FF9800',
//       marginTop:5,
//       justifyContent:'center',
//       alignItems:'center',
//       marginLeft:25,
//         //marginBottom:500,
//       },
//       name:{

//           fontSize:17,
//           fontWeight:'bold',
//           color:'black',
//           marginTop:15,
//           marginLeft:30,
//       },
//       namem:{

//         fontSize:18,
//         fontWeight:'bold',
//         color:'black',
//         marginTop:15,
//         marginLeft:10,
//     },
//       namee:{

//         fontSize:18,
//         fontWeight:'500',
//         color:'black',
//         marginTop:1,
//         marginLeft:30,
//     },
//     card: {
//         marginHorizontal: wp('5%'),
//         marginVertical: wp('4%'),
//         width: wp('90%'),
//         height: hp('10%'),
//         backgroundColor: 'white',
//         borderRadius: wp('5%'),
//         alignItems: 'center',
//         display: 'flex',
//         flexDirection: 'row',
//       },
//       text: {
//         paddingLeft: wp('3%'),
//         fontSize: 15,
//         color: 'black',
//         fontWeight: 'bold',
//         width: wp('60%'),
//       },
      

//       leftIcon: {
//         paddingTop: wp('6%'),
//         paddingLeft: wp('6%'),
//         alignSelf: 'flex-start',
//       },
// })