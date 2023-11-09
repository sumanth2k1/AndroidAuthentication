import {
    View,
    Text,
    ImageBackground,
    Linking,
    Image,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, { useState } from 'react';
  import { LoginApi, changePass, resetOtp, verifyOtp } from '../api/api';
  
  export default function ForgotPassword({navigation}) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cpass, setCpass ] = useState('');
    const [ otp, setOtp ] = useState('');
    const [ auth, setAuth ] = useState({});
    const [ resetId, setResetId ] = useState('');
    const [ verification, setVerification ] = useState(false)
    const [isFocused, setIsFocused] = useState({
      email:false,
      pass:false,
      cpass:false,
      cotp:false,
    })
  
    const handleInputFocus = (textinput) => {
      setIsFocused({
        [textinput]: true
      })
    }
    const handleInputBlur = (textinput) => {
      setIsFocused({
        [textinput]: false
      })
    }

    const getOtp=()=>{
      if(!email) return console.warn('Enter your Email address')
      resetOtp(email).then(res=> setResetId(res)).catch(err=>console.warn(err))
  }
  
  const verifyResetOtp = () => {
    if(!resetId) return console.warn("Enter a valid Email and get OTP")
    verifyOtp(resetId,otp).then(res => {if(res) setVerification(!verification)})
  .catch(err=>console.warn(err))
  }
  
   const handlePassChange = () =>{
    if(!password || !cpass) return console.warn("Enter New Password and Confirm Password")
    if(password !== cpass) return console.warn("Password Does not Match");
    changePass(resetId,password).then(navigation.navigate('Home')).catch(err=>console.log(err))
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
          Forgot Password ?
        </Text>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>
          Verify your email and Reset your password.
        </Text>
        <View style={{
            marginTop: 30,
            backgroundColor: 'white',
            height: "auto",
            width: 300,
            padding: 15,
            justifyContent: 'center',
            borderRadius: 30,
            padding:30
          }}>
        <View>
          <TextInput
          onFocus={()=>handleInputFocus('email')}
          onBlur={()=>handleInputBlur('email')}
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#1F41BB',
              borderBottomWidth: isFocused.email?2:1,
              alignSelf: 'center',
              width: 250,
              borderRadius: 5,
              margin: 5,
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
          />
          <TouchableOpacity onPress={()=>getOtp()} style={{alignSelf:'flex-end'}}><Text>get otp</Text></TouchableOpacity>

          

        <TextInput
        onFocus={()=>handleInputFocus('cotp')}
        onBlur={()=>handleInputBlur('cotp')}
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: isFocused.cotp?2:1,
            alignSelf: 'center',
            width: 250,
            borderRadius: 5,
          }}
          onChangeText={(text) => setOtp(text)}
          value={otp} 
          maxLength={4}
          placeholder="Enter OTP"
        />
          <TouchableOpacity
           onPress={()=>verifyResetOtp()}
          >
          <Text style={{alignSelf: 'flex-end'}}>verify otp</Text>
        </TouchableOpacity>


{ verification ? (
    <>
          <TextInput
          onFocus={()=>handleInputFocus('pass')}
          onBlur={()=>handleInputBlur('pass')}
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#1F41BB',
              borderBottomWidth: isFocused.pass?2:1,
              alignSelf: 'center',
              width: 250,
              borderRadius: 5,
              margin: 5,
              marginTop: 15,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="New Password"
          />
          
          <TextInput
          onFocus={()=>handleInputFocus('cpass')}
          onBlur={()=>handleInputBlur('cpass')}
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#1F41BB',
            borderBottomWidth: isFocused.cpass?2:1,
            alignSelf: 'center',
            width: 250,
            borderRadius: 5,
            margin: 5,
          }}
          onChangeText={(text) => setCpass(text)}
          value={cpass}
          placeholder="Confirm Password"
        />
          <TouchableOpacity
            onPress={()=>handlePassChange()}
            style={{
              backgroundColor: '#1F41BB',
              alignSelf: 'center',
              height: 40,
              width: 190,
              justifyContent: 'center',
              borderRadius: 5,
              marginTop: 15,
            }}>
            <Text style={{alignSelf: 'center', color: 'white'}}>Change Password</Text>
          </TouchableOpacity> 
          </>
          ) : null
        }
        </View>
        </View>
      </View>
    );
  }
  