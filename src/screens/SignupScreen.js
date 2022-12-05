import React,{useState} from 'react';
import axios from "axios";
import {View , Text , StyleSheet, TextInput, TouchableOpacity,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
 function SignupScreen ({navigation})  {
    const [checkedradio, setCheckedradio] = useState('Male');
    const [email, setemail] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [phone,setphone] = useState('');
    const [pass,setpass] = useState('');
    const [cpass,setcpass] = useState('');
    const [emailError, setemailError] = useState('');
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [phoneError,setphoneError] = useState('');
    const [passError,setpassError] = useState('');
    const [cpassError,setcpassError] = useState('');
      const lnameValidator = () => {
        if (lname.length == 0) {
            setlnameError('This feild is required');
          return false;
        } else {
          setlnameError('');
          return true;
        }
      };
      const fnameValidator = () => {
        let nameRegex=/^[a-zA-Z]/;
        if(fname==''|| fname==null)
        {
            setfnameError('This feild is required');
            return false;
        }
        else if(fname.length<3){
           setfnameError('Name must contain atleast 3 chars');
           return false;
        }
        else{
          if(nameRegex.test(fname)){
            setfnameError('');
            return true;
        }else{
          setfnameError('Name should Contains Letter...');
          return false;
        }
      }
      };
      const phoneValidator = ()=>{
        if(phone==''|| phone==null)
        {
            setphoneError('Phone no is Required');
            return false;
        }
        else {
          if(phone.length==10){
          if(phone.substring(0,1)=='9'|| phone.substring(0,1)=='8'||phone.substring(0,1)=='7'||phone.substring(0,1)=='6'){
           setphoneError('');
            return true;
        }
        else{
            setphoneError('Invalid Mobile no');
           return false;
        }
      }
       else{
           setphoneError('Mobile no must contains 10 Digit');
           return false;
        }
      }
      };
      const emailValidator = () => {
        let emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email==''||email==null){
            setemailError('This feild is required');
            return false;
          }else{
            if(emailRegex.test(email)){
                setemailError('');
                return true;
            }else{
              setemailError('Invalid Email');
              return false;
            }
          }
      };
      const passValidator = ()=>{
        let passRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
          if(pass == '' || pass==null){
          setpassError('Password is Madatory');
           return false;
        }else{
        if(passRegex.test(pass)){
          setpassError('');
           return true; 
        }else{
            setpassError('Password Should contains Atleast One UpperCase,One LowerCase,One Digit,One Special Chars,Min 8 to Max 15 Chars Long');
            return false;
        }
      }
       };
       
       const cpassValidator = ()=>{
          let pass1 = pass;
          let pass2 = cpass;
          console.log(pass1);
          if(pass2 == '' || pass2 == null){
              setcpassError('Confirm Password is Required');
              return false; 
          }else{
              if(pass1 == pass2){
                setcpassError('');
                return true;
              } else{
                setcpassError('Password Mismatched.');
                return false;
              } 
          }
       };
    const onSubmit = () => {
         if (fnameValidator() && emailValidator() && lnameValidator() && phoneValidator()  && passValidator() && cpassValidator()) {
      //  const RegData = new FormData();
      //  RegData.append('firstname', fname);
      //  RegData.append('secondName', lname);
      //  RegData.append('contactNo', phone);
      //  RegData.append('email', email);
      //  RegData.append('password', pass);
      //  RegData.append('gender', checkedradio);
      //  console.log(RegData);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;',
        },
      };
    axios.post('https://nameless-savannah-21991.herokuapp.com/register',{
    firstName: fname,
    secondName: lname,
    contactNo: phone,
    email: email,
    password: pass,
    gender: checkedradio,
        config,
    })
      .then(function (response) {
        console.log(response);
        Alert.alert(
          "Alert",
          "Registration Successful",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK",  onPress: () =>navigation.navigate("Login") }
          ]);
        //alert("Registration Successfull");
      })
      .catch(function (error) {
        console.log(error);
      });
         }}
    return (
    <View style={styles.container}>
    <Text style={styles.title}>NeoStore</Text>
    <ScrollView style={styles.scrollView}>
    <View style={styles.formcontainer}>
    <Text style={styles.text}>First Name</Text>
    <TextInput placeholder='Kritidipa' style={styles.inputBox} value={fname} onChangeText={text => setfname(text)} onBlur={()=>fnameValidator()}/>
    <Text style={{color: 'red'}}>{fnameError}</Text>
    <Text style={styles.text}>Last Name</Text>
    <TextInput placeholder='Panda' style={styles.inputBox} value={lname} onChangeText={text => setlname(text)} onBlur={()=>lnameValidator()}/>
    <Text style={{color: 'red'}}>{lnameError}</Text>
    <Text style={styles.text} >Email</Text>
    <TextInput placeholder='test@gmail.com' style={styles.inputBox} value={email} onChangeText={text => setemail(text)} onBlur={()=>emailValidator()} />
    <Text style={{color: 'red'}}>{emailError}</Text>
    <Text style={styles.text}>Phone Number</Text>
    <TextInput placeholder='0123456789' style={styles.inputBox} value={phone} onChangeText={text => setphone(text)} onBlur={()=>phoneValidator()}/>
    <Text style={{color: 'red'}}>{phoneError}</Text>
    <Text style={styles.text}>Password</Text>
    <TextInput  secureTextEntry placeholder='********' style={styles.inputBox} value={pass} onChangeText={text => setpass(text)}  onBlur={()=>passValidator()}/>
    <Text style={{color: 'red'}}>{passError}</Text>
    <Text style={styles.text}>Confirm Password</Text>
    <TextInput  secureTextEntry placeholder='********' style={styles.inputBox} value={cpass} onChangeText={text => setcpass(text)} onBlur={()=>cpassValidator()} />
    <Text style={{color: 'red'}}>{cpassError}</Text>
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
        onPress={() => setCheckedradio('Female')}
      />
      <Text style={styles.text}>Female</Text>
      </View>
    <View style={styles.checkbox}>
   {/* <TouchableOpacity >
      <View style={styles.btn}>
      <Text style={{color:'black'}}  onPress={() => choosePhotoFromLibrary()}  >Choose File</Text> 
      </View>
      </TouchableOpacity> */}
    </View>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>onSubmit()}>Register</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </View>
    );
    }
    const styles = StyleSheet.create({
        container: {
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#ffffff',
        },
        title:{
            fontSize:40,
            fontWeight:'bold',
            color:'#9e0100',
            marginBottom:15
        },
        formcontainer:{
            alignItems:'flex-start',
        },
        // inputBox: {
        //     width: 300,
        //     backgroundColor: '#eeeeee', 
        //     borderRadius: 25,
        //     paddingHorizontal: 16,
        //     fontSize: 16,
        //     color: '#002f6c',
        //     marginVertical: 10
        // },
        inputBox:{
            height: 40,
            width: 300,
            margin: 8,
            borderBottomWidth: 1,
            //borderColor: `#c0c0c0`,
            //padding: 10,
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
        text:{
            color:'black',
            fontWeight:'500'
        },
        radiobtn:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },
        // checkbox:{
        //    //flexDirection:'row',
        //     justifyContent:'center',
        //     alignItems:'center',
        // },
        scrollView: {
          marginBottom: 70,
        },
        btn:{ 
        backgroundColor : '#808080',
        height:30,
        width:100,
        justifyContent:'center',
        alignItems:'center',
      },
    });
    export default SignupScreen;