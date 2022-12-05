import React,{useEffect,useState} from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import {withBadge,Icon} from 'react-native-elements';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Drawer, Title } from "react-native-paper";
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import CustomDrawer from "./CustomDrawer";
import { useLogin } from './LoginProvider';
//import { useNavigation } from '@react-navigation/native';
export function DrawerMenu(props){
 // const navigation = useNavigation(); 
 const  {navigation} = props; 
  const {setIsLoggedIn}=useLogin('');
   const data=useSelector((state) =>state);
   const cartItem=data.cartdata;
   console.log("cartItems",cartItem)
     const cartLength=cartItem.length;
    const BadgedIcon = withBadge(cartLength)(Icon);

  return(
    <View style={{flex:1}}>
     <DrawerContentScrollView {...props}>
       <View style={styles.drawerContent}>
         <View style={styles.userInfoSection}>
         <CustomDrawer/>
           {/* <View style={{padding:20,marginTop:30,borderBottomWidth:2, borderColor:'#c0c0c0'}}>
             <Avatar.Image source={require('../Image/img_avatar2.png')} size={90} style={{marginBottom:10}}/>
             <View>
               <Title style={styles.title}>{Profiledata.firstName}</Title>
             </View>
           </View> */}
         </View>
         <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <Icon name="home"
         color='#1e90ff' size={25}/>
       )}
       label="Home"
       onPress={() => navigation.navigate('Dashboard')}
       />
     </Drawer.Section>
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <MaterialCommunityIcons
           name="account"
         color='#1e90ff' size={25}/>
       )}
       label="My Account"
       onPress={() => navigation.navigate('My Account')}
       />
     </Drawer.Section>
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <MaterialCommunityIcons
           name="sofa"
         color='#1e90ff' size={25}/>
       )}
       label="All Products"
       onPress={()=> navigation.navigate('All Products')}
       />
     </Drawer.Section>
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
        //  <Icon name="cart"
        //  color='#1e90ff' size={size}/>
      //  )}
      //  label="cart"
      //  onPress={() => navigation.navigate('Cart')}/>
     // <TouchableOpacity style={{marginRight:15}} onPress={()=>navigation.navigate("Cart")}>
           
      <BadgedIcon
        type="FontAwesome"
        name="shopping-cart"
        size={25}  
        color="#1e90ff"/>
        )}
        label="Cart"
       onPress={() => navigation.navigate('Cart')}
      />
    {/* </TouchableOpacity>  */}
     </Drawer.Section>
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <Icon name="format-list-bulleted"
         color='#1e90ff'
         size={25}/>
       )}
       label="My Orders"
       onPress={()=> navigation.navigate('Order History')}/>
     </Drawer.Section>
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <MaterialCommunityIcons
           name="map-marker"
         color='#1e90ff' size={25}/>
       )}
       label="Store Locator"
       onPress={()=>navigation.navigate('Store Locator')}/>
     </Drawer.Section> 
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
        <FontAwesome name="files-o" size={25} color='#1e90ff'/>
       )}
       label="Auth Stack"
       onPress={()=> navigation.navigate('MainstackScreen')}/>
     </Drawer.Section>
       </View>
     </DrawerContentScrollView>
     <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <Icon name="exit-to-app"
         color='#1e90ff' size={25}/>
       )}
       label="Sign Out"
       onPress={()=>setIsLoggedIn(false)}/>
       {/* onPress={()=> navigation.navigate('Login')}/> */}
     </Drawer.Section>
    </View>
 );    
}
const styles = StyleSheet.create({
  drawerContent:{
    flex:1,
  },
  userInfoSection:{
   paddingLeft:20,
    // borderBottomWidth:2,
    // borderColor:'#c0c0c0',
  },
  title:{
    fontSize:16,
    marginTop:3,
    fontWeight:'bold',
  },
  // section:{
  //   flexDirection:'row',
  //   alignItems:'center',
  //   marginRight:15
  // },
  // drawerSection:{
  //   marginTop:50
  // },
  bottomDrawerSection:{
    marginBottom:5,
  },
});


