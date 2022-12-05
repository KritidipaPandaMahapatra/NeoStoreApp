import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet ,Image} from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useLogin } from './LoginProvider';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from "react-native-paper";
import {profileImage} from './Image';



const CustomDrawer=(props)=> {
  const {setIsLoggedIn}=useLogin('');
  
    const[profilename,setProfilename]=useState('');
    const[secondname,setSecondname]=useState('');
    const[profilePic,setProfileimage]=useState('');
    const data = useSelector((state) => state);
  const {items}=data;
  var token = items.token;
  console.log("token is",token)
  
  const somefunction=(profile_name)=>{
    setProfilename(profile_name)
  }
  const somefunctionone=(second_name)=>{
    setSecondname(second_name)
  }
  const somefunctionfive=(user_image)=>{
    setProfileimage(user_image)
  }
  // const getImage=(async(allData)=>{
  //   try{
  //     let userImageData=await AsyncStorage.getItem("Data",allData);
  //     let data = JSON.parse(userImageData);
      
  //      console.log('data is',data)

  //      let profile=data.profile-pic;
  //      console.log('Image of this is',profile);
  //   }
  //   catch (error) {
  //     console.log("Something went wrong while storing user token!", error);
  //   }
  // })
  // useEffect(()=>{
  //   getImage();

  // },[]); 

  useEffect(() => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/profile', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('Account response=======>', response.data);
       /*  const authDataResponse = response={
          profile:response.data.profilePic,
      } 
        
        console.log('response of my account', authDataResponse);
        console.log('sucess response of my account');*/
        let profile_name=response.data.userData.firstName;
        somefunction(profile_name);
        let second_name=response.data.userData.secondName;
        somefunctionone(second_name);
        let user_image=response.data.userData.profilePic;
        somefunctionfive(user_image);
        return true;
    }) 
    .catch(function (error) {
      console.log('my account error', error);
      return false;
    });
}, []); 
    return (
        <View style={{flex:1}}>
          <View style={{padding:20,borderBottomWidth:2, borderColor:'#c0c0c0'}}>
          <Image 
            style={styles.CircleShape}    
                source={{uri: `${profileImage}${profilePic}`}} />
             {/* <Avatar.Image source={require('../Image/img_avatar2.png')} size={90} style={{marginBottom:10}}/> */}
            </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginRight:90}}>
        <Text style={styles.title}>{profilename}</Text>
        <Text style={styles.titlee}>{secondname}</Text>
        </View>
        {/* <DrawerContentScrollView>
            <View>
            <DrawerItemList{...props}/>
            </View>
            <View style={{flexDirection:'row'}}>
              <FontAwesome style={{marginTop:90,marginLeft:30}}
                name="sign-out"
                color="turquoise"
                size={20}
               
              
              />

              
            <TouchableOpacity
            onPress={()=>setIsLoggedIn(false)}>
              
              <Text style={{marginTop:90,marginLeft:30,color:'black'}}>SignOut</Text>
            </TouchableOpacity>
            </View>
        </DrawerContentScrollView> */}
        </View>
    )

}
const styles=StyleSheet.create({
    title:{
        
        fontSize:17,
        color:'black',
        paddingBottom:8,
        marginBottom:1,
        alignContent:'center',
        textAlign:'center',
        fontWeight:'bold',
       
       marginLeft:90,
        
    },
    titlee:{
        
      fontSize:17,
      color:'black',
      paddingBottom:8,
      marginBottom:1,
      alignContent:'center',
      textAlign:'center',
      fontWeight:'bold',
      
     marginLeft:8,
      
  },
    CircleShape: {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
        backgroundColor: '#FF9800',
        marginTop:15,
        // justifyContent:'center',
        // alignItems:'center',
      },
})
export default CustomDrawer;