import React,{useState,useEffect} from 'react';
import {View ,Text,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native';
import axios from "axios";
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/Fontisto';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
function EditprofileScreen({navigation,route}) {
  const {ProfileName,ProfileSName,ProfileEmail,contactNo}=route.params;
    const [checkedradio, setCheckedradio] = useState('Male');
    const [email, setemail] = useState(ProfileEmail);
    const [fname, setfname] = useState(ProfileName);
    const [lname, setlname] = useState(ProfileSName);
    const [phone,setphone] = useState(contactNo);
    const [profileImage,  setprofileImage] = useState({});
    const data=useSelector((state) =>state);
    const {items}=data;
    var token=items.token;
   // console.log(token);
    // useEffect(() => {
    //   onSubmit();
    //  }, [])
    const imageData = new FormData();
      imageData.append('profile-pic', {
       uri: profileImage.path,
       type: profileImage.mime,
       name: 'image.jpg',
       filename: '5quhhz.jpg',
     });
     //console.log(imageData);
    const onSubmit = () => {
      console.log('submitted');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  } 
  axios
  .post(
    'https://nameless-savannah-21991.herokuapp.com/updateprofile',
    {
        profileDetails: {
            firstName: fname,
            secondName: lname,
            gender: checkedradio,
            mobile: phone
        },
    },
    config
)
        .then((resp)=> {
          console.log('response', resp);
          console.log('response received from Edit Profile');
          Alert.alert(
            "Alert",
            "Update Successful",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK",  onPress: () =>navigation.navigate('My Account') }
            ]);
          return true;
        })
        .catch(function (error) {
          console.log('error', error);
          return false;
        });
    //  }
    //   const imageData = new FormData();
    //   imageData.append('profile-pic', {
    //    uri: profileImage.path,
    //    type: profileImage.mime,
    //    name: 'image.jpg',
    //    filename: '5quhhz.jpg',
    //  });
    //  console.log(imageData);
      // const updatePhoto= () => {
      //   console.log("Submitphoto");
      //  const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };
      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/updateProfilePic',
          imageData,
         config,
        )
        .then((resp)=> {
          console.log('response', resp);
          console.log("Response for the profile pic is", resp.data.profilePic);
          console.log('response received');
          return true;
        })
        .catch(function (error) {
          console.log('error', error);  
          return false;
        });
     };
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => { 
           console.log(image);
          setprofileImage(image);
         // updatePhoto();
        })
      };
    return (
        <View>
            <View style={styles.Container}>
            <Avatar.Image source={require('../Image/img_avatar2.png')} size={100} />
            </View>
            <View style={styles.container}>
            <Text style={styles.text}>First Name</Text>
    <TextInput  style={styles.inputBox} value={fname} onChangeText={text => setfname(text)}/>
    <Text style={styles.text}>Last Name</Text>
    <TextInput style={styles.inputBox} value={lname} onChangeText={text => setlname(text)} />
    <Text style={styles.text} >Email</Text>
    <TextInput  style={styles.inputBox} value={email} onChangeText={text => setemail(text)} />
    <Text style={styles.text}>Phone Number</Text>
    <TextInput  style={styles.inputBox} value={phone.toString()} onChangeText={text => setphone(text)}/>
    <View style={styles.radiobtn}>
   <Text style={styles.text}>Select Gender</Text>
    <RadioButton
        value="Male"
        status={ checkedradio === 'Male' ? 'checked' : 'unchecked' }
        onPress={() => setCheckedradio('Male')}
      />
      <Text style={styles.text}>Male</Text>
      <RadioButton
        value="Female"
        status={ checkedradio === 'Female' ? 'checked' : 'unchecked' }
        onPress={() => setCheckedradio('Female')}/>
      <Text style={styles.text}>Female</Text>
      </View>
      </View>
                <View style={styles.Container}>
                <TouchableOpacity >
      <View style={styles.btn}>
      <Text style={{color:'black'}}  onPress={() => choosePhotoFromLibrary()}  >Choose File</Text> 
      </View>
      </TouchableOpacity>
                    {/* <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>Enter Date Of Birth</Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Icon name="date" size={30} color="red"/>
                         <Text style={{borderWidth:1,marginLeft:20,padding:10,color:'black'}}>29-12-2021</Text>
                    </View> */}
                    <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={()=>onSubmit()}>Submit</Text>
                </TouchableOpacity>
                </View>
            </View>

    
       
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems:'flex-start', 
    },
    inputBox:{
        height: 40,
        width: 350,
        margin: 8,
        borderBottomWidth: 1,
    },
    text:{
        color:'black',
        fontWeight:'500',
        padding:10
    },
    Container:{
        paddingTop:20,
        // padding:20,
        justifyContent:'center',
        alignItems:'center'
    },
    options:{
        height:60,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginHorizontal:20,
        borderRadius:15,
        flexDirection:'row',
         padding:15,
        marginLeft:10,
        alignItems:'center',
        fontSize: 20,
       // justifyContent:'space-evenly',
        marginBottom:10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 20,
        marginVertical: 10,
       paddingVertical: 12,
        marginVertical:20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    radiobtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{ 
      backgroundColor : '#808080',
      height:30,
      width:100,
      justifyContent:'center',
      alignItems:'center',
    },
});
export default  EditprofileScreen;