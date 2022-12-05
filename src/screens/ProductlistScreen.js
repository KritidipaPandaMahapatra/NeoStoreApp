import React,{useEffect,useState} from 'react';
import axios from "axios";
import {StyleSheet, View, Text,TouchableOpacity,Image, Modal,FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import FilterIcon from 'react-native-vector-icons/MaterialIcons';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector ,useDispatch} from 'react-redux'; 
import { Chip } from 'react-native-paper';
import {allproductData } from "../redux/action";
 function ProductlistScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalvisible, setmodalvisible] = useState(false);
    const [modalvisibility, setmodalvisibility] = useState(false);
    const [modalVisibility, setmodalVisibility] = useState(false);
    const [ProductDetails, setProductDetails] = useState({});
    console.log("Products details",ProductDetails);
    console.log(ProductDetails.allCategories);
    const data=useSelector((state) =>state);
    const dispatch = useDispatch();
    console.log('data',data); 
    const {items}=data;
   // console.log(items);
     var token=items.token;
   //  console.log(token);
     const {products}=data;
     //var [products]=obj;
     console.log('obj',products);
    // console.log('product',products);
    
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
            'https://nameless-savannah-21991.herokuapp.com/commonProducts',config
          )
          .then((resp)=> {
            console.log('response', resp);
            console.log('response received',resp.data);
            var details=resp.data;
            setProductDetails(details);
            console.log((resp.data.commonProducts));
            // console.log((resp.data.topRatedProducts)); 
            var allproducts=resp.data.commonProducts;
           dispatch(allproductData(allproducts));
          //  console.log('Products',products);
            return true;
          })
          .catch(function (error) {
            console.log('error', error);
            return false;
          });
    }
    return (
        
        // <ScrollView>
        // <View>
        //     <TouchableOpacity style={styles.container}>
        //     <MaterialIcons style={styles.icon}
        //                 name="auto-delete"
        //                 color="#1e90ff"
        //                 size={30}
        //             />
        //        <Text style={styles.title}>Remove Filter</Text>
        //     </TouchableOpacity>
        // </View>
        // <TouchableOpacity style={styles.root}>
        // {/* <Image
       
        // style={styles.image}
        // source={require('./Dining.jpg')}/> */}
        // <View style={styles.rightContainer}>
        //  <Text style={styles.firstline}>4-Seater Dining Table</Text>
        //  <Text style={styles.secondline}>Dining Table Set</Text>
        //  <Text style={styles.price}>$1200</Text>
        //  <View style={styles.ratingcontainer}>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star-half-full" size={18} color={'#e47911'}/>

        //  </View>
        //  </View>
        //  </TouchableOpacity>
        //  {/* <TouchableOpacity style={styles.root}>
        // <Image
       
        // style={styles.image}
        // source={require('./Image/table.jpg')}/>
        // <View style={styles.rightContainer}>
        //  <Text style={styles.firstline} >4-Seater Dining Table</Text>
        //  <Text style={styles.secondline}>4 chairs and 1 table</Text>
        //  <Text style={styles.price}>$2000</Text>
        //  <View style={styles.ratingcontainer}>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star-half-full" size={18} color={'#e47911'}/>

        //  </View>
        //  </View>
        //  </TouchableOpacity> */}
        //  <TouchableOpacity style={styles.root}>
        // {/* <Image
       
        // style={styles.image}
        // source={require('./DiningTwo.jpg')}/> */}
        // <View style={styles.rightContainer}>
        //  <Text style={styles.firstline}>4-Seater Dining Table</Text>
        //  <Text style={styles.secondline}>2 chairs and 1 Bench</Text>
        //  <Text style={styles.price}>$1400</Text>
        //  <View style={styles.ratingcontainer}>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
        //  <FontAwesome style={styles.star} name="star-half-full" size={18} color={'#e47911'}/>

        //  </View>
        //  </View>
        //  </TouchableOpacity>
         // </ScrollView>
        <View>
          <View>
            <Modal transparent={true}   visible={modalvisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setmodalvisible(!modalvisible)}} >
          <View style={{
          flex: 1,
          backgroundColor: '#00000080',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
           <View style={{backgroundColor: '#fff', padding: 20,marginTop:90,alignItems:'center',borderRadius: 20,
            width: 350,
            height: 350}}>
               <View style={{flexDirection:'row',borderBottomWidth:1}}>
                   <CrossIcon name="circle-with-cross" size={25} color="black"  onPress={() => setmodalvisible(!modalvisible)}/>
                   <Text style={{color:'black',fontSize:20,fontWeight:'500',marginLeft:15, marginBottom: 15,
                    textAlign: "center"}}>Sort By Category</Text>
                   </View>
                  
                   { ProductDetails &&
                ProductDetails.allCategories &&
                ProductDetails.allCategories.length  &&
                ProductDetails.allCategories.map((item, index) => {
                  return (
                   < TouchableOpacity key={index} 
                   style={styles.button}> 
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginLeft:10}}>{item.toString()}</Text>
                </TouchableOpacity>
                 );  
                })}
               </View>
               </View>
                   </Modal>
            </View>
            <View>
            <Modal transparent={true}   visible={modalvisibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setmodalvisibility(!modalvisibility)}} >
          <View style={{
          flex: 1,
          backgroundColor: '#00000080',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
           <View style={{backgroundColor: '#fff', padding: 20,marginTop:90,alignItems:'center',borderRadius: 20,
            width: 350,
            height: 450}}>
               <View style={{flexDirection:'row',borderBottomWidth:1}}>
                   <CrossIcon name="circle-with-cross" size={25} color="black"  onPress={() => setmodalvisibility(!modalvisibility)}/>
                   <Text style={{color:'black',fontSize:20,fontWeight:'500',marginLeft:15, marginBottom: 15,
                    textAlign: "center"}}>Sort By Colors</Text>
                   </View>
                
                   { ProductDetails &&
                ProductDetails.allColors &&
                ProductDetails.allColors.length  &&
                ProductDetails.allColors.map((items, index) => {
                  return (
                   < TouchableOpacity key={index} 
                  style={styles.buton}>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',marginLeft:10}}>{items.toString()}</Text>
                </TouchableOpacity>
                 );
                })}
               </View>
               </View>
                   </Modal> 
            </View>
            <Modal
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setmodalVisibility(!modalVisibility);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={{flexDirection:'row',borderBottomWidth:1}}>
              <CrossIcon name="circle-with-cross" size={25} color="black"  onPress={() => setmodalVisibility(!modalVisibility)}/>
            <Text style={styles.modalText}>Sort By Price</Text>
            </View>
            <View >
            < TouchableOpacity 
             style={styles.button}
              onPress={() => setmodalVisibility(!modalVisibility)}
            >
              <Text style={styles.textStyle}>High to Low</Text> 
            </TouchableOpacity>
            < TouchableOpacity
              style={styles.button}
              onPress={() => setmodalVisibility(!modalVisibility)}
            >
              <Text style={styles.textStyle}>Low to High</Text> 
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
           <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={{flexDirection:'row',borderBottomWidth:1}}>
              <CrossIcon name="circle-with-cross" size={25} color="black"  onPress={() => setModalVisible(!modalVisible)}/>
            <Text style={styles.modalText}>Sort By Rating</Text>
            </View>
            <View >
            < TouchableOpacity 
             style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>High to Low</Text> 
            </TouchableOpacity>
            < TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Low to High</Text> 
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* </View>}/> */}
      {/* <View>
          <TouchableOpacity style={styles.container}>
          <FilterIcon style={styles.icon}
                        name="auto-delete"
                        color="#1e90ff"
                        size={30}
                    />
               <Text style={styles.title}>Remove Filter</Text>
            </TouchableOpacity>
        </View> */}
        <FlatList data={products} 
        renderItem={({item}) =><TouchableOpacity onPress={()=>navigation.navigate('Product Detail',{id:item.id})}>
                                <View style={styles.box}> 
                              <Image
                                style={{width: 100, height: 230}} 
                                 source={{
                           uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`,
                                 }}
                               />
                                <View style={{alignItems:'flex-start',marginLeft:10}}>
                                <Text style={styles.txtname}>{item.name}</Text>
                                <Text  style={styles.txtname}>Rs. {item.price}</Text>
                                <View style={styles.ratingcontainer}>
                                 <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
                                 <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
                                 <FontAwesome style={styles.star} name="star" size={18} color={'#e47911'}/>
                                 <FontAwesome style={styles.star} name="star-half-full" size={18} color={'#e47911'}/>
                                </View>
                               <Text  style={styles.rating}>{item.rating}</Text>
                               </View>
                               </View> 
                               </TouchableOpacity> }/>
         <View  style={{flexDirection:'row',position:'absolute', top: 670,backgroundColor:'skyblue',height:70,width:'100%',alignItems:'center'}}>
         <TouchableOpacity style={styles.filter}  onPress={() => setmodalvisible(true)}>
         <AntDesign 
                        name="filter"
                        color="#1e90ff"
                        size={25}
                    />
             <Text style={styles.filterone}>Category</Text>
             
         </TouchableOpacity>
         <TouchableOpacity style={styles.filter} onPress={() => setmodalvisibility(true)}>
         <DropIcon
                        name="blood-drop"
                        color="#1e90ff"
                        size={25}
                    />
             <Text style={styles.filterone}>Color</Text>
             
         </TouchableOpacity>
         <TouchableOpacity style={styles.filter} onPress={() => setmodalVisibility(true)}>
         <Icon
                        name="tag"
                        color="#1e90ff"
                        size={25}
                    />
             <Text style={styles.filterone}>Price</Text>
             
         </TouchableOpacity>
         <TouchableOpacity style={styles.filter}   onPress={() => setModalVisible(true)}>
         <Icon
                        name="chart-line-variant"
                        color="#1e90ff"
                        size={25}
                    />
             <Text style={styles.filterone}>Rating</Text>
             
         </TouchableOpacity>
         
        
         </View>
         </View> 
        
       

    )
}
const styles =StyleSheet.create({
    // container:{
    //     flexDirection:'row',
    //     margin:5,
    //     borderWidth:1,
    //     borderColor:'black',
    //     borderRadius:600,
    //     backgroundColor:'#fff',
    // },
//    rightContainer:{
//         padding:10,
//     },
//     price:{

//         fontWeight:'bold',
//         fontSize:20,
//         color:'black',
//         marginTop:7,
//     },
    ratingcontainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:7,
    },
    star:{
     margin:2,
    },
    filter:{
        height:40,
        flexDirection:'row',
        marginRight:8,
        marginLeft:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    filterone:{

       fontSize:15,
       fontWeight:'bold',
       color:'black',
       marginTop:5,
       marginBottom:5,
       marginRight:5,
    },
    txtname:{
      padding:10,
      fontSize:20,
      fontWeight:'bold',
      color:'black',
    },
    rating:{
      padding:10,
      fontSize:15,
      fontWeight:'500',
      color:'black',  
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000080',
      },
      modalView: {
        //margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 65,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:15,
        fontWeight:'500',
        marginLeft:10
      },
      button:{
        borderRadius:10,
        paddingHorizontal:30,
        paddingVertical:10,
        fontSize:20,
        fontWeight:'500',
        color:'#ffffff',
        borderRadius: 2,
        elevation: 1,
         margin:5
    },
    buton:{
      borderRadius:5,
      paddingHorizontal:5,
      paddingVertical:2,
      fontSize:7,
      fontWeight:'500',
      color:'#ffffff',
      borderRadius: 2,
      elevation: 1,
       margin:2
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
    justifyContent:'center',
     alignItems:'center',
     marginBottom:10,
    },
    container:{

      flexDirection:'row',
      margin:5,
      borderWidth:1,
      borderColor:'black',
      borderRadius:600,
      backgroundColor:'#fff',
  },
  title:{

      fontSize:20,
      fontWeight:'bold',
      marginLeft:10,
      marginTop:5,
      marginBottom:5,
     
  },
  icon:{

      marginLeft:100,
      marginTop:5,
  },
})
export default ProductlistScreen;