import React ,{useEffect,useState} from 'react';
import axios from "axios";
import {View ,Text,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux'; 
//import { useIsFocused } from '@react-navigation/native';
//import { goAddress } from '../redux/action';
function  ShippingaddressScreen({navigation}) {
  const [AddressData,setAddressData]=useState([]);
  //const isFocused = useIsFocused();
  //  const dispatch = useDispatch();
    const data=useSelector((state) =>state);  
    const {items}=data;
    var token=items.token;
    // const {useraddress}=data;
    // console.log('useraddress',AddressData);
    //  const deleteTask = (index) => {
    //   const filteredData = AddressData.filter(item => item.index !== index);
    //   // let itemsCopy = [...AddressData];
    //   // itemsCopy.splice(id,1);
    //   setAddressData(filteredData);
    // }
    // React.useEffect(() => {
    //   onSubmit();
    // }, [isFocused]);
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
        'https://nameless-savannah-21991.herokuapp.com/getCustAddress',
    config
).then((resp)=> {
          console.log('response', resp);
          console.log('response received',resp.data);
          var data=resp.data.Addresses;
          setAddressData(data);
        //   var userAddress=resp.data.Addresses;
        //   dispatch(goAddress(userAddress));
        //    console.log('Address',userAddress);
         // navigation.navigate('Shipping Address');
          return true;
        })
        .catch(function (error) {
          console.log('error', error);
          return false;
        });
      }
    return (
        <View >
          
             <FlatList data={AddressData}  
             //keyExtractor={({item}) => item}           
                              renderItem={({item,index}) =><View style={styles.box} key={index}>
                              <View style={styles.Container}>
                                 <Text style={styles.text}>{item.address},{item.city}</Text>
                                 <Text style={styles.text}>{item.pincode},{item.state}</Text>
                                 <Text style={styles.txt}>{item.country}</Text>
                                 <View>
                                 <TouchableOpacity style={{flexDirection:'row',padding:10}}
                                 onPress={()=>{navigation.navigate('Edit Address',{id:item._id,address:item.address,city:item.city,pincode:item.pincode,state:item.state,country:item.country})}}>
                                     <View  style={styles.icon}>
                                     <Icon name="pencil" color='black' size={25} />
                                     <Text style={styles.icontxt}>EDIT</Text>
                                     </View>
                                     <View  style={styles.icon}>
                                     <Icon name="delete" color='black' size={25} />
                                     <Text style={styles.icontxt} onPress={() => deleteTask(item.index)}>REMOVE</Text>
                                     </View>
                                 </TouchableOpacity>
                                 </View>
                              </View>
                             </View> 
                             }/>
                              <View  style={styles.footer}> 
                                 <TouchableOpacity  >
                                   <View style={styles.addWrapper}>
                                   <Text style={styles.addText}>+</Text>
                                   </View>
                                 </TouchableOpacity>
                             </View>
         </View>
        )
}
const styles = StyleSheet.create({
    container: {
        marginLeft:50,
    },
    Container:{
        justifyContent:'center',
        alignItems:'center',
         },
    box:{
        margin:15,
        height:180,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        alignItems:'center',
    },
    text:{
        fontSize:15,
        color:'black',
        fontWeight:'500',
        marginTop:10
    },
    txt:{
        fontSize:20,
        color:'black',
        marginTop:8,
        borderBottomWidth:1,
    },
    icon:{
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:8,
        fontSize:20,
        color:'black',
        fontWeight:'bold',
        flexDirection:'row',
        marginRight:10
       // justifyContent:'space-around'
    },
    icontxt:{
        fontSize:15,
        color:'black',
        fontWeight:'500',
    },
    footer:{
        position: 'absolute',
        //top:5,
        bottom:0,
        color: 'white',
        width: '100%',
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    addWrapper:{
        width: 60,
        height: 60,
        backgroundColor: '#4f83cc',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:8
      },
    addText:{
          fontSize: 25,
          color:'white',
    },
});
export default  ShippingaddressScreen;