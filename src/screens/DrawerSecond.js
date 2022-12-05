import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet ,Image} from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';



const DrawerSecond=(props) =>{
  return (
    <View style={{flex:1}} >
       <View style={{borderBottomColor:'black',borderBottomWidth:1}}>
    <Text style={styles.header}>Neostore</Text>
    </View>
   
    <DrawerContentScrollView {...props}>
     <DrawerItemList {...props}/>
    </DrawerContentScrollView>
   
    </View>
  );
}
const styles=StyleSheet.create({
    header:{
        color:'maroon',
        fontSize:40,
        fontWeight:'bold',
        marginLeft:50,
        marginTop:30,
        paddingBottom:20,

    }
})
export default DrawerSecond; 

