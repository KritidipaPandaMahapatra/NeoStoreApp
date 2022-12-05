import React,{useEffect,useState} from 'react';
import axios from "axios";
import {View ,Text,StyleSheet,TouchableOpacity,Image,FlatList,ScrollView,Alert} from 'react-native';
import { useSelector ,useDispatch} from 'react-redux'; 
import {goplaceOrder,confirmPlaceorder} from '../redux/action';
import PushNotification from 'react-native-push-notification';

function PlaceorderScreen({route,navigation}) {
    const [Address,setAddress]=useState([]);
    const data=useSelector((state) =>state);
    console.log(data.orderdata._id);
    const dispatch = useDispatch();
    const {items}=data;
   // console.log(id);
    //console.log(items);
     var token=items.token;
     const productData=data.cartItems;
     const cartItem=data.cartdata;
     console.log("CART",cartItem.totalPrice);
     var totalprice=cartItem.totalPrice;
     const { id } = route.params;  
    var orderId=data.orderdata._id;
     console.log("Place Order-->",orderId);
     const handleNotification=()=>{
       PushNotification.localNotification({
        channelId:"test-channel",
        title:"Order Confirmed",
        message:"Thanks for shopping from Neostore"
       })
     };

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
             'https://nameless-savannah-21991.herokuapp.com/proceedToBuy',config
           )
           .then((resp)=> {
             console.log('response', resp);
             console.log('response received');
             console.log((resp.data));
             const userAddress=resp.data.Addresses[0];
            // console.log(userAddress);
             setAddress(userAddress);
             submitAddress();
             return true;
           })
           .catch(function (error) {
             console.log('error', error);
             return false;
           });
     }
     const submitAddress = () => {
        console.log('submitted');
        // var objid=Address._id;
        // console.log(objid);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .post(
            `https://nameless-savannah-21991.herokuapp.com/proceedToCheckout/${id}`,
            {
                address: {
                    address:Address.address,
                    pincode:Address.pincode,
                    city:Address.city,
                    state:Address.state,
                    country:Address.country 
                  },
            },config
          )
          .then((resp)=> {
            console.log('response', resp);
            console.log('response received');
            console.log(("Submit Address--->",resp.data.data));
            var ordereddata=resp.data.data;
            dispatch(goplaceOrder(ordereddata));
            return true;
          })
          .catch(function (error) {
            console.log('error', error);
            return false;
          });
    }
    const placeOrder = () => {
        console.log('submitted');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .post(
            `https://nameless-savannah-21991.herokuapp.com/placeOrder/${orderId}`,
            {
                id:orderId,
            },
             config
          )
          .then((resp)=> {
            console.log('response', resp);
            console.log('response received from update address');
            console.log(("Ordered Placed--->",resp.data));
            var orderedItems=resp.data;
            dispatch(confirmPlaceorder(orderedItems));
            navigation.navigate('OrderConfirm');
            return true;
          })
          .catch(function (error) {
            console.log('error', error);
            return false;
          });
    }
    return (
        // <ScrollView style={{marginBottom:80}} >
        <View>
            <View style={styles.Container}>
            {/* <Text style={[styles.text,{fontSize:20}]}>Kritidipa Panda</Text> */}
            <Text style={styles.text}>{Address.address},</Text> 
            <Text style={styles.text}>{Address.city},{Address.pincode}</Text>
            <Text style={styles.text}>{Address.state},{Address.country}</Text>
            </View>
            <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate('Add Address')}>
              <Text style={styles.buttonText} >Change or Add Address</Text>
             </TouchableOpacity>
            </View>
            <FlatList  maxHeight='40%' data={productData} 
      renderItem={({item}) =><View style={styles.box}> 
                             <Image
                               style={{width: 80, height: 150,margin:10}}  
                                source={{
                          uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.productImage}`,
                                }}
                              />
                              <View style={{alignSelf:'flex-start',marginLeft:10}}>
                              <Text style={{fontSize:20,fontWeight:'bold',color:'black',marginTop:40,marginVertical:10}}>{item.productName}</Text>
                               <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text  style={{fontSize:20,fontWeight:'bold',color:'black',marginRight:50}}>Rs. {item.total}</Text>
                                <Text style={styles.boxtext}>Qty-{item.orderQuantity}</Text>
                              </View>
                             </View>
                             </View> 
                             }/>  
        <View>
            <Text style={styles.totalprice}>Price Details</Text>
            <FlatList  data={productData} 
              renderItem={({item}) =>
                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,}}>
            <Text style={styles.textprice}>{item.productName}</Text>
            <Text style={styles.text}>{item.total}</Text>
            </View>
             }/> 
            <View style={{flexDirection:'row',borderTopWidth:0.5}}>
                <Text style={[styles.text,{marginLeft:50,fontWeight:'bold'}]}>Total Amount</Text>
                <Text style={[styles.text,{marginLeft:120,fontWeight:'bold'}]}>{totalprice}</Text>
            </View>
        </View>
        <View style={{position:'relative',backgroundColor:"#ffffff",top:100,
      flexDirection:'row',justifyContent:'space-between',marginHorizontal:30,marginTop:90,marginBottom:10}}> 
    <Text  style={styles.price}>Rs.{totalprice} </Text>
          <TouchableOpacity >
         <Text style={styles.cfmorder}  onPress={()=>{placeOrder(); handleNotification()} } >ORDER NOW</Text>
     </TouchableOpacity>  
     </View>     
    </View>
        // </ScrollView>
        )
}
const styles = StyleSheet.create({
    Container:{
        // justifyContent:'flex-start',
        // alignItems:'flex-start',
        marginLeft:20,
        marginTop:10,
    },
    buttoncontainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'black',
        fontSize:15,
        fontWeight:'500'
    },
    button: {
        width: 200,
        backgroundColor: '#4f83cc',
        borderRadius: 20,
        marginVertical: 10,
        paddingVertical: 12,
        marginVertical:20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    box:{
        height:200,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        elevation:8,
        flexDirection:'row',
        // alignItems:'center',
        marginBottom:10
    },
    boxtext:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        marginVertical:10,
    },
    price:{
        alignSelf:'flex-end',
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:30,
        paddingVertical:10,
        fontSize:20,
        color:'black',
        fontWeight:'bold'
    },
    cfmorder:{
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
        fontSize:20,
        fontWeight:'500',
        color:'#ffffff',
        backgroundColor:'#f08080'
    },
    totalprice:{
            color:'black',
            fontSize:20,
            fontWeight:'bold',
            marginTop:10,
            marginLeft:20,
            borderBottomWidth:0.5,
    },
    textprice:{
        color:'black',
        fontSize:15,
        fontWeight:'500',
        marginBottom:10
    },
});
export default PlaceorderScreen;