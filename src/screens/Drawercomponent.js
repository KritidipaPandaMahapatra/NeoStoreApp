import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Drawer, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawer from "./CustomDrawer";
export function Drawercomponent(props){
  const  {navigation} = props; 
  return(
    <View style={{flex:1}}>
     <DrawerContentScrollView {...props}>
       <View style={styles.drawerContent}>
         <View style={styles.userInfoSection}>
          
           <View style={{padding:20,marginTop:30,borderBottomWidth:2, borderColor:'#c0c0c0'}}>
             <Avatar.Image source={require('../Image/img_avatar2.png')} size={90} style={{marginBottom:10}}/>
             <View>
               <Title style={styles.title}>Kritidipa Panda</Title>
             </View>
           </View>
         </View>
         <Drawer.Section style={styles.bottomDrawerSection} >
       <DrawerItem
       icon={({color,size})=>(
         <Icon name="home"
         color='#1e90ff' size={size}/>
       )}
       label="Home"
       onPress={() => navigation.navigate('Dashboard')}/>
     </Drawer.Section>
     <Drawer.Section style={styles.bottomDrawerSection} >
<DrawerItem
icon={({color,size})=>(
  <Icon name="login"
  color='#1e90ff' size={size}/>
)}
label="Login"
onPress={() => navigation.navigate('Login')}/>
</Drawer.Section>
<Drawer.Section style={styles.bottomDrawerSection} >
<DrawerItem
icon={({color,size})=>(
  <Icon name="account-plus"
  color='#1e90ff' size={size}/>
)}
label="Signup"
onPress={()=>navigation.navigate('Signup')}/>
 </Drawer.Section>
 <Drawer.Section style={styles.bottomDrawerSection} >
<DrawerItem
icon={({color,size})=>(
  <Icon name="sofa"
  color='#1e90ff' size={size}/>
)}
label="All Products"
onPress={()=>navigation.navigate("All Products")}/>
</Drawer.Section>  
<Drawer.Section style={styles.bottomDrawerSection} >
<DrawerItem
icon={({color,size})=>(
  <Icon name="map-marker"
  color='#1e90ff' size={size}/>
)}
label="Store Locator"
onPress={()=>navigation.navigate("Store Locator")}/>
</Drawer.Section> 
       </View>
     </DrawerContentScrollView>
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
  bottomDrawerSection:{
    marginBottom:5,
  },
});


