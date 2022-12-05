import React,{useEffect,useState} from 'react';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View ,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList,Image,PermissionsAndroid,Platform} from 'react-native';
import { useSelector } from 'react-redux';
//import RNFetchBlob from 'rn-fetch-blob';
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob;
function OrderDetailsScreen() {
    const [OrderHistory, setOrderHistory]=useState([]);
  console.log("OrderHistory-->",OrderHistory);
    const data=useSelector((state) =>state);
    //console.log(data);
    const {items}=data;
     var token=items.token;
     var [orderhistory]=OrderHistory;
     console.log(orderhistory);
    useEffect(() => {
        onSubmit();
       }, [])
      const checkPermision = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage permission Required',
              message: 'App needs access to your storage to dwonload Pdf',
            },
          );
          if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission Granted');
            downloadPdf();
          } else {
            Alert.alert('Storage Permission Not Granted');
          }
        } catch (error) {
          console.warn(error);
        }
      };
      const downloadPdf = () => {
        console.log('arrive in downloadpdf');
        // console.log(route.params.productInvoice);
        // const downloadInvoiceUrl = `${invoiceUrl}${route.params.productInvoice}`;
      //  console.log(downloadInvoiceUrl);
        const { config, fs } = RNFetchBlob;
        let downloads =
          Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
        const configfb = {
          fileCache: true,
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `${getRandomFileName()}.pdf`,
          path: `${downloads}/${getRandomFileName()}.pdf`,
          appendExt: `${getRandomFileName()}.pdf`,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mime: 'application/pdf',
            mediaScannable: true,
            title: `${getRandomFileName()}.pdf`,
            path: `${downloads}/${getRandomFileName()}.pdf`,
          },
        };
        let iosOptions = {
          fileCache: configfb.fileCache,
          title: configfb.title,
          path: configfb.path,
          appendExt: 'pdf',
          mime: 'application/pdf',
        };
        let androidOptions = configfb;
        RNFetchBlob.config(Platform.OS === 'ios' ? iosOptions : androidOptions)
          .fetch('GET', `http://www.africau.edu/images/default/sample.pdf`, {})
          .then(res => {
            if (Platform.OS === 'ios') {
              RNFetchBlob.fs
                .writeFile(configfb.path, res.data, 'base64')
                .then(() => {
                  RNFetchBlob.ios.previewDocument(configfb.path);
                })
                .catch(e => { });
            }
            if (Platform.OS == 'android') {
            }
          })
          .catch(e => { });
      };
    
      function getRandomFileName() {
        var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        var random = ('' + Math.random()).substring(2, 8);
        var random_number = timestamp + random;
        return random_number;
      }
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
                         <View  key={index}>
                        <View style={styles.box}> 
                        <Image
                              style={{width: 100, height: 230,marginTop:10}} 
                               source={{
                         uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`,
                               }}
                             />
                         <View style={{alignSelf:'flex-start',marginLeft:10}}>
                         <Text style={{fontSize:20,fontWeight:'bold',color:'black',marginTop:40,marginVertical:10}}>{item.product}</Text>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Text  style={{fontSize:20,fontWeight:'bold',color:'black',marginRight:50}}>Rs. {item.price}</Text>
                           <Text style={styles.boxtext}>Qty-{item.quantity}</Text>
                         </View>
                        </View>
                        </View>
      
                         {OrderHistory && 
                          OrderHistory.length &&
                            OrderHistory.map((item, index) => {
                              return (
                                    <View  key={index}>
                                       <Text  style={styles.text}>{item.invoice}</Text>
                                    </View>
                                      );
                          })} 
                        
                       </View>
                           );
                          })}
                      </View>  
                     
                      </ScrollView>
        <View style={{position:'relative',backgroundColor:"#1e90ff",top:0}}> 
     <TouchableOpacity 
     style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:15}}
     onPress={checkPermision}>
     <Icon name="file-invoice" size={30} color="#f8f8ff"/>
         <Text  style={styles.txt}>Download Invoice</Text>
     </TouchableOpacity>
     </View>
      </View>  
    )}
const styles = StyleSheet.create({
    Container:{
        flex:1,
    },
    text:{
      color:'black',
      fontSize:15,
      padding:10,
      fontWeight:'500'
  },
  txt:{
    color:'#f8f8ff',
    fontSize:20,
    fontWeight:'bold',
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
   boxtext:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginVertical:10,
},
   box:{
     flexDirection:'row',
    height:250,
    borderRadius:10,
    backgroundColor:'#ffffff',
    marginHorizontal:20,
    borderRadius:15,
    elevation:8,
    marginTop:10,
    justifyContent:'center'
   },
   scrollView:{
     marginBottom:60,
   },
   footer:{
      // height:50,
       position:'absolute',
      top:150,
       //bottom:20,
       width:'100%',
       backgroundColor:'#1e90ff',
   },

});
export default  OrderDetailsScreen;