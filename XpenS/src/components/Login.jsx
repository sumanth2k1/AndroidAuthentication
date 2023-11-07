import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';

export default function Login({navigation}) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = ('');
  const [ auth, setAuth ] = useState(false)
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
  navigation.navigate('Home');
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
          height: 500,
          width: 300,
          padding: 15,
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
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TouchableOpacity>
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
          onPress={() => handleLogin()}
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
