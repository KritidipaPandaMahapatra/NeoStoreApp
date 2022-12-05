import React,{useEffect} from 'react'
// import { View, Text,StyleSheet } from 'react-native'
// import Dash from './Dash';
// import CustomDrawer from './CustomDrawer';
 import MyaccountScreen from './MyaccountScreen';
 import CartListScreen from './CartListScreen';
// import MyOrders from './MyOrders'; 

import MainstackScreen from './MainstackScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import CartListScreen from './CartListScreen';
// import {withBadge,Icon} from 'react-native-elements';
 import ProductlistScreen from './ProductlistScreen';
 import OrderHistoryScreen from './OrderHistoryScreen';
 import StorelocatorScreen from './StorelocatorScreen';
 import DashboardScreen from './DashboardScreen';
import { DrawerMenu } from './Drawermenu';
import { Drawercomponent } from './Drawercomponent';
const Drawer = createDrawerNavigator();

const DrawerNavigator=()=>{
  
return(
<Drawer.Navigator  initialRouteName="Dashboard"   drawerContent={props=><DrawerMenu {...props}/>} >
    <Drawer.Screen name="Dashboard" component={DashboardScreen}
      options={{
        drawerIcon:({color})=>(
          <Ionicons name="home-outline" size={25} color={'turquoise'}/>
         )
      }}/> 
      <Drawer.Screen name="My Account" component={MyaccountScreen}
      options={{
        drawerIcon:({color})=>(
          <MaterialCommunityIcons name="account" size={25} color={'turquoise'}/>
      )
      }}/>
       <Drawer.Screen name="All Products" component={ProductlistScreen}
      options={{
        drawerIcon:({color})=>(
          <MaterialCommunityIcons name="sofa" size={25} color={'turquoise'}/>
  )}}/> 
  <Drawer.Screen name="Cart" component={CartListScreen }
      options={{
        drawerIcon:({color})=>(
         <FontAwesome name="shopping-cart" size={25} color={'turquoise'}/>
          
  )}} /> 
  <Drawer.Screen name="Order History" component={OrderHistoryScreen}
      options={{
        drawerIcon:({color})=>(
          <Entypo name="menu" size={25} color={'turquoise'}/>
  )}}/> 
  <Drawer.Screen name="Store Locator" component={StorelocatorScreen }
      options={{
        drawerIcon:({color})=>(
          <Ionicons name="location" size={25} color={'turquoise'}/>
  )}}/> 
     <Drawer.Screen name="MainstackScreen" component={MainstackScreen}  
        options={{
        drawerIcon:({color})=>(
          <FontAwesome name="files-o" size={25} color={'turquoise'}/>
  )}}/>  
  
  
 </Drawer.Navigator>
 
 )
}
export default DrawerNavigator;