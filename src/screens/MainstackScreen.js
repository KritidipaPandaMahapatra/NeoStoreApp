import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import ForgotpassScreen from './ForgotpassScreen';
import ResetpassScreen from './ResetpassScreen';
import CartListScreen from './CartListScreen';
import DashboardScreen from './DashboardScreen';
import MyaccountScreen from './MyaccountScreen';
import ProductDetailScreen from './ProductDetailScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import StorelocatorScreen from './StorelocatorScreen';
import EmptycartScreen from './EmptycartScreen';
import PlaceorderScreen from './PlaceorderScreen';
import ShippingaddressScreen from './ShippingaddressScreen';
import AddadressScreen from './AddadressScreen';
import EditaddressScreen from './EditaddressScreen';
import EditprofileScreen from './EditprofileScreen';
import ProductlistScreen from './ProductlistScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import OrderConfirm from './OrderConfirm';
import { useLogin } from './LoginProvider';
import LoginProvider from './LoginProvider';
const Stack = createStackNavigator();
 function MainstackScreen() {
  return (
       <Stack.Navigator initialRouteName="Home" screenOptions={{header:()=>null}}>
       {/* <Stack.Navigator >   */}
      {/* <Stack.Screen name="Login" component={LoginScreen} title="Login" />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotpassScreen} />
      <Stack.Screen name="Reset Password" component={ResetpassScreen} /> */}
      <Stack.Screen name="Dashboard" component={DashboardScreen}  />
      <Stack.Screen name="All Products" component={ProductlistScreen}/>
        <Stack.Screen name="My Account" component={MyaccountScreen} />
        <Stack.Screen name="Cart" component={CartListScreen}  />
        <Stack.Screen name="cart" component={EmptycartScreen} title="Cart" />  
        <Stack.Screen name="Product Detail" component={ProductDetailScreen}  />
        <Stack.Screen name="Store Locator" component={StorelocatorScreen}  />
        <Stack.Screen name="Place Order" component={PlaceorderScreen}/>
        <Stack.Screen name="Add Address" component={AddadressScreen}/>
        <Stack.Screen name="Shipping Address" component={ShippingaddressScreen}/>
        <Stack.Screen name="Edit Address" component={EditaddressScreen}/>
        <Stack.Screen name="Edit Profile" component={EditprofileScreen}/>
        <Stack.Screen name="Order History" component={OrderHistoryScreen}/>
        <Stack.Screen name="Order Details" component={OrderDetailsScreen}/>
        <Stack.Screen name="OrderConfirm" component={OrderConfirm}/>
      </Stack.Navigator>
  );
}
export default MainstackScreen;