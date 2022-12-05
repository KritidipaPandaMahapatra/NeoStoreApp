import React,{useState,useEffect} from 'react';
import axios from "axios";
import {withBadge,Icon} from 'react-native-elements';
import {View ,Text,StyleSheet,Image,FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper'; 
import { useSelector ,useDispatch} from 'react-redux'; 
import {dashboardData } from "../redux/action";
function DashboardScreen({navigation}) {
  const dispatch = useDispatch();
   const [searchQuery, setSearchQuery] = useState('');
   const [results, setResults] = useState([]);
   const [searchTimer, setSearchTimer] = useState(null);
    //const onChangeSearch = query => setSearchQuery(query);
    
    const data=useSelector((state) =>state);
    console.log('data',data); 
    const {items}=data;
    console.log(items);
     var token=items.token;
     console.log(token);
     const {obj}=data;
     console.log('obj',obj);
    // console.log('product',products);
    
    console.log(data);
    const cartItem=data.cartdata;
    console.log("cartItems",cartItem)
      const cartLength=cartItem.length;
     const BadgedIcon = withBadge(cartLength)(Icon);

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
            'https://nameless-savannah-21991.herokuapp.com/getDashboard',config
          )
          .then((resp)=> {
            console.log('response', resp);
            console.log('response received');
            console.log((resp.data.topRatedProducts));
            var products=resp.data.topRatedProducts;
           dispatch(dashboardData(products));
            //console.log('Products',products);
            return true;
          })
          .catch(function (error) {
            console.log('error', error);
            return false;
          });
    }
    const fetchData=(text) => {
      console.log('submitted');
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      }
      axios
        .post(
          `https://nameless-savannah-21991.herokuapp.com/find/${text}`,
          {
            keyword:text,
          },config
        )
        .then((resp)=> {
          console.log('response', resp.data);
          console.log('response received from Search');
          console.log(resp.data.searchResult);
          setResults(resp.data.searchResult);
          return true;
        })
        .catch(function (error) {
          console.log('error', error);
          return false;
        });
  }
    return (
        <View style={styles.container}>
    <View style={styles.header}>
        <SimpleIcon name="menu"  size={30} color="#1e90ff" onPress={() => navigation.toggleDrawer()}/>
        <Text style={styles.title}>NeoSTORE</Text>
        {/* <Icon name="shopping-cart" size={30} color="#1e90ff"  onPress={() => navigation.navigate('Cart')}/> */}
        <TouchableOpacity style={{marginRight:15}} onPress={()=>navigation.navigate("Cart")}>
           
            <BadgedIcon
              type="FontAwesome"
              name="shopping-cart"
              size={30}
              color="#1e90ff"
            />
          </TouchableOpacity> 
    </View>
    <View style={{backgroundColor:'#ffffff',borderBottomWidth:0.3}}>
    <Searchbar
      placeholder="Search for products"
      style={styles.searchbar} 
      //onChangeText={onChangeSearch}
      onChangeText={(text) => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        setSearchQuery(text);
        setSearchTimer(
            setTimeout(() => {
                fetchData(text);
            }, 2000),
        );
    }}
      value={searchQuery}
    />
    </View>
    <Text style={styles.text}>Top products for you </Text>
    <FlatList 
    data={obj} 
   // data={results}   keyExtractor={(item) => "" + item.id}
      renderItem={({item}) =><TouchableOpacity onPress={()=>{navigation.navigate('Product Detail',{id:item.id,image:item.image})}}>
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
                             <Text  style={styles.txtname}>{item.rating}</Text>
                             </View>
                             </View> 
                             </TouchableOpacity>}/>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
       // backgroundColor:'#fffafa',
    },
    header:{
        height:80,
        paddingTop:30,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'center',
        borderBottomWidth:0.5,
       // alignItems:'center'
    },
    title:{
        textAlign:'center',
        color:'#4f4f4f',
        fontSize:20,
        fontWeight: 'bold',
        paddingHorizontal:90
    },
    searchbar:{
        backgroundColor:'#c0c0c0',
        borderRadius:10,
        marginHorizontal:30,
        marginVertical:10,
        marginTop:10,
        height:50,
    },
   text:{
        color:'black',
        fontWeight:'500',
        fontSize:20,
        padding:10
    },
    box:{
        height:300,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        elevation:8,
        flexDirection:'row',
        marginBottom:10,
        justifyContent:'center',
         alignItems:'center'
    },
    txtname:{
      padding:10,
      fontSize:20,
      fontWeight:'bold',
      color:'black',
    },
});
export default DashboardScreen;