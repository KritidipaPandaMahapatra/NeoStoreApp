import React,{useEffect, useState} from 'react';
import axios from "axios";
import {View ,Text,StyleSheet, TouchableOpacity,ScrollView, Alert,Modal} from 'react-native';
import { Card ,Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartIcon from 'react-native-vector-icons/FontAwesome';
import CrossIcon from 'react-native-vector-icons/Entypo';
import BuyIcon from 'react-native-vector-icons/MaterialIcons';
import Counticon from 'react-native-vector-icons/AntDesign';
import { useSelector ,useDispatch} from 'react-redux'; 
import { Rating } from 'react-native-ratings';
//import {productDetails} from "../redux/action";
function ProductDetailScreen({route,navigation}) {
   const [productData,setProductData]=useState([]);
   // const dispatch = useDispatch();
    const data=useSelector((state) =>state);
    const {items}=data;
     var token=items.token;
     console.log(token);
     var productId=productData.id;
    //  console.log(productId);
    const { id } = route.params;
  const { image } = route.params;
    // var productColor=productData.colors[0];
    // const ratingCompleted=(rating) =>{
    //   console.log("Rating is: " + rating)
    // }
    
    const [modalVisible, setModalVisible] = useState(false);
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
             `https://nameless-savannah-21991.herokuapp.com/getProductDetails/${id}&${'red'}`,config
           )
           .then((resp)=> {
             console.log('response', resp);
             console.log('response received');
            console.log((resp.data));
            var data=resp.data;
            setProductData(data);
            //  // console.log((resp.data.topRatedProducts));
            //   var productItem=resp.data;
            //  dispatch(productDetails(productItem));
           //  console.log('Products',products);
             return true;
           })
           .catch(function (error) {
             console.log('error', error);
             return false;
           });
     }
     const submitRating = () => {
      console.log('submitted');
      setModalVisible(!modalVisible);
      var rating=productData.rating;
      console.log(rating);
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      }
      axios
        .post(
          `https://nameless-savannah-21991.herokuapp.com/addRating/${id}&${rating}`,
          {
            id: id,
            rating: rating,
          },
          config
        )
        .then((resp)=> {
          console.log('response', resp);
          console.log('response received');
         console.log((resp.data));
         Alert.alert(resp.data.message);
        //  Alert.alert(
        //   "Alert",
        //   "Rating Completed",resp.data.message,
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel"
        //     },
        //     { text: "OK",  onPress: () =>console.log("Ok") }
        //   ]);
          return true;
        })
        .catch(function (error) {
          console.log('error', error);
          return false;
        });
   }
  const addCart = () => {
    var productColor=productData.colors[1];
        console.log('submitted');
        console.log("submit",productId);
        console.log("submit",productColor);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .post(
            `https://nameless-savannah-21991.herokuapp.com/addToCart/${productId}&${productColor}`,
            {
              id: productId,
              color:productColor,
            },
            config
          )
          .then((resp)=> {
            console.log('response', resp);
            console.log('response received');
           console.log((resp.data));
           console.log((resp.data.productDetails));
           Alert.alert(
            "Product Added Sucessfully");
            navigation.navigate('Cart');
            return true;
          })
          .catch(function (error) {
            console.log('error', error);
            return false;
          });
    }
    return (
        <View style={styles.Container}>
            <Modal transparent={true}   visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible)}} >
          <View style={{
          flex: 1,
          backgroundColor: '#00000080',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
           <View style={{backgroundColor: '#fff', padding: 20,marginTop:90,alignItems:'center',
            width: 350,
            height: 350}}>
               <View style={{flexDirection:'row',borderBottomWidth:1}}>
                   {/* <CrossIcon name="circle-with-cross" size={25} color="black" /> */}
                   <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginLeft:10}}>{productData.name}</Text>
                   </View>
                   <Card.Cover
                     source={{
                      uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${image}`,
                    }}
                    resizeMode="contain"  style={{height:150,width:250,alignSelf:'center',padding:10}}
                  />
                <Rating showRating  ratingCount={5}
                        jumpValue={1} style={{ paddingVertical: 10 }}/>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginLeft:10}} onPress={() => submitRating()}>Rate Now</Text>
               </View>
               </View>
                   </Modal>
                <ScrollView
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{height:'40%',width:'100%',marginTop:10}} >
              { productData && 
                productData.images &&
                productData.images.length &&
               productData.images.map((images, index) => (
                  <Card.Cover
                    key={index}
                    source={{
                      uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${images}`,
                    }}
                    resizeMode="contain"  style={{height:250,width:350}}
                  />
                 ))
                 } 
            </ScrollView>
                <View style={styles.container}>
                 <Text style={styles.text}>{productData.name}</Text>
                    <View style={{ flexDirection: 'row', height: 26 }}>
              {productData &&
                productData.colors &&
                productData.colors.length &&
                productData.colors.map((item, index) => {
                  return (
                    <Chip textStyle={{ color: item }} key={index} style={{ color: 'black' }}>
                      {item.toString()}
                    </Chip>
                  );
                })}
            </View>
                   <Text style={styles.color}>{productData.description}</Text>
                   <Text style={styles.color}>{productData.features}</Text>
                   <Text style={styles.Text}>Rs. {productData.price}</Text>
                   <Text style={styles.color}>inclusive of all taxes</Text>
                   <View style={{flexDirection:"row",marginVertical:10}}>
                  <Counticon name="minuscircle" size={20} color="black" style={{paddingHorizontal:5}}/>
                    <Text style={{paddingHorizontal:5,color:'black'}}>1</Text>
                    <Counticon style={{paddingHorizontal:5}} name="pluscircle" size={20} color="black"/>
                    <TouchableOpacity  style={styles.cart} onPress={()=>addCart()} >
                   <View style={styles.addWrapper}>
                   <CartIcon name="shopping-cart" size={25} color="#ffffff" />
                   </View>
                  </TouchableOpacity>
                  </View>
                   <Text  style={{fontWeight:"500",fontSize:20}}>Easy 30 Days return and exchange</Text>
                   <Text style={styles.color}>Choose to return or exchange a different(if available) within 30 days</Text>
                   <View style={styles.footer}> 
                  <TouchableOpacity  style={styles.price}  
                    onPress={() => setModalVisible(true)}>
                   {/*  onPress={()=>submitRating()}> */}
                    <Icon name="star" size={30} color={'#e47911'}/>
                    <Text style={styles.rating}>Rate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>addCart()}>
                    <BuyIcon name="shopping-bag" size={30} color={'#ffffff'}/>
                     <Text style={styles.buytxt}>BUY NOW</Text>
                  </TouchableOpacity>
            </View>
             </View>           
        </View>
        )
}
const styles = StyleSheet.create({
    container: {
        marginLeft:20,
    },
    Container:{
      // justifyContent:'center',
      // alignItems:'center',
      backgroundColor:'#ffffff'
    },
    text:{
        fontSize:25,
        color:'black',
        fontWeight:'bold',
    },
    color:{
        color:'black',
        fontSize:15,
        fontWeight:'bold',
        margin:5
    },
    Text:{
        color:'black',
        fontSize:20,
        fontWeight:'500',
    },
    // colorbox:{
    //     borderWidth:1,
    //     borderRadius:15,
    //     paddingVertical:5,
    //     color:'#ffffff',
    //     fontWeight:'bold',
    //     marginRight:5
    // },
    clrbox:{
        borderWidth:1,
        borderRadius:15,
        paddingVertical:5,
        backgroundColor:'#dcdcdc',
        marginLeft:10
    },
    price:{
        borderWidth:1,
        borderRadius:10,
        padding:10,
        flexDirection:'row'
        // paddingHorizontal:10,
        // paddingVertical:10,
    },
    button:{
        flexDirection:'row',
        padding:10,
        borderRadius:10,
        // paddingHorizontal:10,
        // paddingVertical:10,
        backgroundColor:'#f08080'
    },
    rating:{
        fontSize:20,
        color:'black',
        fontWeight:'bold'
    },
    buytxt:{
        fontSize:20,
        fontWeight:'500',
        color:'#ffffff',
    },
    footer:{
        flexDirection:'row',
        position:'relative',
        justifyContent:'space-around',
        marginTop:8  
    },
    cart:{
        position: 'absolute',
        top: 0,
        color: 'white',
        width: '100%',
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    addWrapper:{
        width: 50,
        height: 50,
        backgroundColor: '#f08080',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:8
      },
});
export default ProductDetailScreen;