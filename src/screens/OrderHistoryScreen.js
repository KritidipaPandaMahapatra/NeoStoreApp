import React,{useEffect,useState} from 'react';
import axios from "axios";
import {View ,Text,StyleSheet,FlatList,ScrollView} from 'react-native';
import { useSelector} from 'react-redux'; 
function OrderHistoryScreen() {
  const [OrderHistory, setOrderHistory]=useState([]);
  console.log("OrderHistory-->",OrderHistory);
  // const [Order, setOrder]=useState([]);
    const data=useSelector((state) =>state);
    //console.log(data);
    const {items}=data;
     var token=items.token;
     var [orderhistory]=OrderHistory;
     console.log(orderhistory);
    //  var productsOrder=orderhistory.productsInOrder;
    //  console.log(productsOrder);
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
             `https://nameless-savannah-21991.herokuapp.com/getOrders`,config
           )
           .then((resp)=> {
             console.log('response', resp);
             console.log('response received');
             console.log((resp.data));
            //  var products=resp.data.ordersDetails.productsInOrder;
            //  console.log(products);
             var orderData=resp.data.ordersDetails;
             setOrderHistory(orderData);
             return true;
           })
           .catch(function (error) {
             console.log('error', error);
             return false;
           });
     }
    return (
      <View style={styles.Container}>
        <ScrollView style={styles.scrollView}>
          <View> 
              {orderhistory &&
                orderhistory.productsInOrder &&
                  orderhistory.productsInOrder.length &&
                    orderhistory.productsInOrder.map((item, index) => {
                       return (
                       <View  style={styles.box} key={index}>
                         <Text style={styles.textprice}>{item.product} qty-{item.quantity} {item.price}</Text>
                       {OrderHistory &&
                           OrderHistory.length &&
                             OrderHistory.map((item, index) => {
                               return (
                                     <View  key={index}>
                                        <Text  style={styles.text}>{item.orderPlacedOn}</Text>
                                     </View>
                                       );
                           })}
            </View>
            );
            })}
        </View>  
        </ScrollView>
        </View>  
    )}
const styles = StyleSheet.create({
    Container:{
        flex:1,
    },
    text:{
      color:'black',
      fontSize:15,
      padding:10
  },
   textprice:{
   color:'black',
   fontSize:20,
   fontWeight:'bold',
   margin:15,
   borderBottomWidth:2,
   borderColor:'#dcdcdc',
   },
   box:{
    height:120,
    borderRadius:10,
    backgroundColor:'#ffffff',
    marginHorizontal:20,
    borderRadius:15,
    elevation:8,
    marginTop:10,
   },
   scrollView:{
     marginBottom:70,
   },

});
export default  OrderHistoryScreen;