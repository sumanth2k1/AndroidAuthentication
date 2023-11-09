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
import { LoginApi } from '../api/api';

export default function Login({navigation}) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ auth, setAuth ] = useState({})
  const [isFocused, setIsFocused] = useState({
    email:false,
    pass:false
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

 const handleLogin = () =>{
  LoginApi(email,password).then((res)=>{
    setAuth(res)
    console.log(typeof(res))
    if(typeof(res)==typeof({})){
      navigation.navigate('Home');
    }else{
      console.warn("invalid Email / Password")
    }
  })
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
        Login Here
      </Text>
      <Text style={{fontWeight: 'bold', marginTop: 20}}>
        Welcome, Happy Saving
      </Text>
      <View
        style={{
          marginTop: 30,
          backgroundColor: 'white',
          height: 'auto',
          width: 300,
          padding: 45,
          justifyContent: 'center',
          borderRadius: 30,
        }}>
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
          placeholder="Password"
        />
        <TouchableOpacity onPress={()=>navigation.navigate('Forgot')}>
          <Text
            style={{
              color: '#1F41BB',
              fontSize: 11,
              alignSelf: 'flex-end',
              margin: 5,
              marginRight: 13,
            }}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>handleLogin()}
          style={{
            backgroundColor: '#1F41BB',
            alignSelf: 'center',
            height: 40,
            width: 90,
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 25,
          }}>
          <Text style={{alignSelf: 'center', color: 'white'}}>Log In</Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center', color: 'black', marginTop: 20}}>
          Create new account
        </Text>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 25,
          }}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={{alignSelf: 'center', color: '#1F41BB'}}>Register</Text>
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
