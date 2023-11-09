import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { RegisterApi, VerificationApi } from '../api/api';

export default function Signup({navigation}) {
  const [ fname, setFname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ cpass, setCpass ] = useState('');
  const [ otpcheck, setOtpcheck ] = useState(false)
  const [ otp, setOtp ] = useState('')
  const [ auth, setAuth ] = useState()
  // const [isFocused, setIsFocused] = useState({
  //   email:false,
  //   pass:false
  // })

  // const handleInputFocus = (textinput) => {
  //   setIsFocused({
  //     [textinput]: true
  //   })
  // }
  // const handleInputBlur = (textinput) => {
  //   setIsFocused({
  //     [textinput]: false
  //   })
  // }

 const handleOTP = () =>{
   if(!fname) return console.warn("Enter your Full Name")
   if(!email) return console.warn("Enter Email")
   if(!password || !cpass) return console.warn('Empty password')
   if(password !== cpass) return console.warn("password does not Match")
  RegisterApi(fname,email,password)
  .then((res)=>{
    setOtpcheck(true)
    setAuth(res)
  })
}

console.log(auth)

 const handleRegister = () =>{
  if(!otp) return console.warn('Enter OTP')
 if(!auth) return console.warn('Verify your Account !!!')
 VerificationApi(auth._id,otp).then(()=>
  navigation.navigate('Login')
)
}

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/images/bg.png')}
        style={{height: '100%', width: '100%', position: 'absolute'}}
        blurRadius={7}
      />
      <Text style={{fontSize: 30, color: '#1F41BB', fontWeight: 'bold'}}>
        Register Here
      </Text>
      <Text style={{fontWeight: 'bold', marginTop: 20}}>
        Welcome, Happy Saving
      </Text>
      <View
        style={{
          marginTop: 30,
          backgroundColor: 'white',
          height: 500,
          width: 300,
          padding: 15,
          justifyContent: 'center',
          borderRadius: 30,
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: 250,
            borderRadius: 5,
            margin: 5,
          }}
          onChangeText={(text) => setFname(text)}
          value={fname}
          placeholder="Full Name"
        />
        <TextInput
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: 250,
            borderRadius: 5,
            margin: 5,
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: 250,
            borderRadius: 5,
            margin: 5,
            marginTop: 15,
          }}onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
        />
        <TextInput
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: 250,
            borderRadius: 5,
            margin: 5,
            marginTop: 15,
          }}
          onChangeText={(text) => setCpass(text)}
          value={cpass}
          placeholder="Confirm Password"
        />
        <View style={{flex:1, flexDirection:'row',justifyContent:'center'}}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: 100,
            borderRadius: 5,
            marginRight: 15,
          }}
          onChangeText={(text) => setOtp(text)}
          value={otp} 
          maxLength={4}
          placeholder="Enter OTP"
        />
          <TouchableOpacity
          onPress={() => handleOTP()}
          style={{
            backgroundColor: '#1F41BB',
            alignSelf: "flex-end",
            height: 25,
            width: 45,
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 25,
          }}>
          <Text style={{alignSelf: 'center', color: 'white', fontSize:10}}>Get OTP</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleRegister()}
          style={{
            backgroundColor: '#1F41BB',
            alignSelf: 'center',
            height: 40,
            width: 150,
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 25,
          }}>
          <Text style={{alignSelf: 'center', color: 'white'}}>Verify & Sign Up</Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center', color: 'black', marginTop: 20}}>
          Already have an account ?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 25,
          }}>
          <Text style={{alignSelf: 'center', color: '#1F41BB'}}>Login</Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            color: 'black',
            marginTop: 5,
            fontSize: 11,
          }}>
          Or continue with
        </Text>
      </View>
    </View>
  );
}
