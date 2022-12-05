import React,{useEffect,useState} from 'react';
import {View ,Text,StyleSheet,Image,FlatList} from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Counticon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector ,useDispatch } from 'react-redux'; 
import {cartDetails,cartProduct} from '../redux/action';
function CartListScreen({navigation}) {
    //const [productData,setProductData]=useState([]);
    const data=useSelector((state) =>state);
    const dispatch = useDispatch();
    const {items}=data;
    var token=items.token;
    const cartItem=data.cartdata;
    console.log("cartItems",cartItem)
     console.log("CART",cartItem.totalPrice);
     var totalprice=cartItem.totalPrice;
    
     const productData=data.cartItems;
    //console.log("Products",productData);
    var objId=cartItem._id;
    console.log(objId);
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
             'https://nameless-savannah-21991.herokuapp.com/getCart',config
           )
           .then((resp)=> {
             console.log('response', resp);
             console.log('response received');
             console.log((resp.data));
             var cartData=resp.data.cart;
          //  console.log('Products',resp.data.cart.productDetails);
           // console.log("object",cartData)
             var data=resp.data.cart.productDetails;
             var length = data.length;
             var cart = {
              ...cartData,
              length,
            };
            //console.log(cart);
            console.log("Product length",length);
             dispatch(cartProduct(data));
            // setProductData(data);
             dispatch(cartDetails(cart));
             return true;
           })
           .catch(function (error) {
             console.log('error', error);
             return false;
           });
     }
    return (
        <View style={styles.container}>  
          <FlatList data={productData} 
      renderItem={({item}) =><View style={styles.box}> 
                             <Image
                               style={{width: 100, height: 230,margin:15}}  
                                source={{
                          uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.productImage}`,
                                }}
                              />
                              <View style={{alignSelf:'flex-start',marginLeft:10}}>
                              <Text style={{fontSize:20,fontWeight:'bold',color:'black',marginTop:40,marginVertical:10}}>{item.productName}</Text>
                              <View style={{flexDirection:"row",marginVertical:10}}>
                               <Counticon name="minuscircle" size={20} color="black" style={{paddingHorizontal:5}}/>
                                <Text style={{paddingHorizontal:5}}>{item.orderQuantity}</Text>
                               <Counticon style={{paddingHorizontal:5}} name="pluscircle" size={20} color="black"/>
                              </View>           
                               <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text  style={{fontSize:20,fontWeight:'bold',color:'black',marginRight:50}}>Rs. {item.productPrice}</Text>
                                <Icon name="delete" size={25} color="black" />
                              </View>
                             </View>
                             </View> 
                             }/> 
             <View style={{position:'relative',backgroundColor:"#ffffff",marginTop:20}}> 
     <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:30,marginTop:10,marginBottom:10}}>
         <Text  style={styles.price}>Rs. {totalprice}</Text>
         <Text style={styles.button} onPress={()=>{navigation.navigate('Place Order',{id:objId})}}>ORDER NOW</Text>
     </TouchableOpacity>
     </View>                  
     {/* <View style={styles.box}>
     <Image source={require('../Image/table.jpg')} style={{height:125,width:140,marginHorizontal:10,marginTop:30}}/>
     <View style={{alignItems:'flex-start'}}>
     <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginTop:40,marginVertical:10}}>Dinning Table 6 Seater</Text>
     <View style={{flexDirection:"row",marginVertical:10}}>
     <Counticon name="minuscircle" size={20} color="black" style={{paddingHorizontal:5}}/>
     <Text style={{paddingHorizontal:5}}>1</Text>
     <Counticon style={{paddingHorizontal:5}} name="pluscircle" size={20} color="black"/>
     </View>
     <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
     <Text  style={{fontSize:15,fontWeight:'bold',color:'black',marginVertical:10,}}>$1200</Text>
     <Icon name="delete" size={25} color="black" style={{marginLeft:90}}/>
     </View>
     </View>
     </View> */}
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
       // backgroundColor:'#fffafa',
    },
   text:{
        color:'black',
        fontWeight:'500',
        fontSize:20,
        padding:20
    },
    box:{
        height:250,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        elevation:8,
        flexDirection:'row',
        marginTop:10,
        // alignItems:'center'
    },
    price:{
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:10,
        fontSize:20,
        color:'black',
        fontWeight:'bold'
    },
    button:{
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:10,
        fontSize:20,
        fontWeight:'500',
        color:'#ffffff',
        backgroundColor:'#f08080'
    },
});
export default CartListScreen;