import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import * as React from 'react';
import { useEffect ,useContext} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import DashboardScreen from './src/screens/DashboardScreen';
//import LoginScreen from './src/screens/LoginScreen';
//import  SignupScreen from './src/screens/SignupScreen';
import MainstackScreen from './src/screens/MainstackScreen';
import { DrawerMenu } from './src/screens/Drawermenu';
import { Drawercomponent } from './src/screens/Drawercomponent';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useLogin } from './src/screens/LoginProvider';
import LoginProvider from './src/screens/LoginProvider';
import MainNavigator from './src/screens/MainNavigator';
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
//const Drawer = createDrawerNavigator();
export default function App() {
  useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 3000);
    }, [])
  
    //const isSignedIn=useLogin();
    //const isSignedIn=true;
   // const isLoggedIn=useLogin();
  return (
    <Provider store={store}>
       <LoginProvider>
    <NavigationContainer>
    <MainNavigator/>
      {/* <Drawer.Navigator initialRouteName="Home" 
      drawerContent={props=> isLoggedIn ? (<DrawerMenu {...props}/>) : (<Drawercomponent {...props}/>)}>
         <Drawer.Screen name="Home" component={MainstackScreen}  />
         <Drawer.Screen name="Signup" component={SignupScreen} />   
          <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
        </Drawer.Navigator> */}
    </NavigationContainer>
    </LoginProvider>
    </Provider>
  );
}
// import SplashScreen from 'react-native-splash-screen';
// import * as React from 'react';
// import { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import  SignupScreen from './src/screens/SignupScreen';
// //import LoginScreen from './src/screens/LoginScreen';
// import ForgotpassScreen from './src/screens/ForgotpassScreen';
// import ResetpassScreen from './src/screens/ResetpassScreen';
// import DashboardScreen from './src/screens/DashboardScreen';
// const Stack = createStackNavigator();
// export default function App() {
//   useEffect(() => {
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 5000);
//   }, [])
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home" screenOptions={{header:()=>null}}>
//       {/* <Stack.Screen name="Home" component={LoginScreen} title="Login" />
//         <Stack.Screen name="Dashboard" component={DashboardScreen}  /> */}
//         <Stack.Screen name="Home" component={DashboardScreen}  />
//         <Stack.Screen name="Forgot Password" component={ForgotpassScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="Reset Password" component={ResetpassScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
