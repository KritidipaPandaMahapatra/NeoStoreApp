import React,{useEffect} from 'react';
import {View ,Text,StyleSheet} from 'react-native';
import axios from "axios";
import { useSelector } from 'react-redux'; 
function OrderListScreen() {
    const data=useSelector((state) =>state);
    const {items}=data;
    var token=items.token;
    useEffect(() => {
        onSubmit();
       }, [])
    const onSubmit = () => {
      console.log('submitted');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  } 
  axios
    .get(
        'https://nameless-savannah-21991.herokuapp.com/getOrders',
         config
          ).then((resp)=> {
          console.log('response', resp);
          console.log('response received',resp.data.ordersDetails);
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
            </View>

        </View>
        )
}
const styles = StyleSheet.create({
    container: {
        marginLeft:50,
    },
    Container:{
        paddingTop:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
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
export default  OrderListScreen;