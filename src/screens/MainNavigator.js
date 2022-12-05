import React ,{useContext}from 'react'
// import { View, Text,StyleSheet } from 'react-native'
import LoginScreen from './LoginScreen';
//import DashboardScreen from './DashboardScreen';
 import SignupScreen from './SignupScreen';
 import ProductlistScreen from './ProductlistScreen';
import StorelocatorScreen from './StorelocatorScreen';
// import ForgetPassword from './ForgetPassword';
//  import ResetPassword from './ResetPassword';
//  import OrderHistory from './OrderHistory';
//  import ShippingAddress from './ShippingAddress';
//  import ProductDetails from './ProductDetails';

// import AddCustAddress from './AddCustAddress';
// import ChangePassword from './ChangePassword';
// import EditProfile from './EditProfile';
//import UpdateAddress from './UpdateAddress';  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DrawerNavigator from './DrawerNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Drawer = createDrawerNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useLogin } from './LoginProvider';
import DrawerSecond from './DrawerSecond';
import { Drawercomponent } from './Drawercomponent';
import { DrawerMenu } from './Drawermenu';
//import ProductlistScreen from './ProductlistScreen';
//const Stack = createNativeStackNavigator();
const StackNavigator=()=> {
    
    return (
       
        <Drawer.Navigator  drawerContent={props=><Drawercomponent {...props}/>}>
          
         {/* <Drawer.Screen name="Home" component={DashboardScreen}
         options={{
           drawerIcon:({color})=>(
          <Ionicons name="home-outline" size={25} color={'turquoise'}/>
         )
         }}/>  */}
        <Drawer.Screen name="Login" component={LoginScreen} 
         options={{
        drawerIcon:({color})=>(
          <Entypo name="login" size={25} color={'turquoise'}/>
         )}}/>
       <Drawer.Screen name="Signup" component={SignupScreen} 
         options={{
            drawerIcon:({color})=>(
              <Entypo name="add-user" size={25} color={'turquoise'}/>
         )}}/>
        {/* <Drawer.Screen name="All Products" component={ProductlistScreen}
         options={{
          drawerIcon:({color})=>(
          <MaterialCommunityIcons name="sofa" size={25} color={'turquoise'}/>
        )}}/>  */}

          <Drawer.Screen name="Store Locator" component={StorelocatorScreen}
          options={{
             drawerIcon:({color})=>(
          <Ionicons name="location" size={25} color={'turquoise'}/>
           )}}/>  
            </Drawer.Navigator>   
    )
};


const MainNavigator =()=>{
    const {isLoggedIn}=useLogin()
    return isLoggedIn ? <DrawerNavigator/>:<StackNavigator/>
}
export default MainNavigator;


