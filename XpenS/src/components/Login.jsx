import {
  View,
  Text,
  ImageBackground,
  Linking,
  Image,
  TouchableOpacity,
  ToastAndroid,
  // TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LoginApi} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Checkbox, Icon, TextInput} from 'react-native-paper';
import {currUserData} from './redux/action';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

// import {AsyncStorage} from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    pass: false,
  });
  const dispatch = useDispatch();

  const userData = {
    id: '',
    email: '',
    name: '',
  };

  // const showToast = message => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };

  const showToast = (mtype, message, desc) => {
    Toast.show({
      type: mtype,
      text1: message,
      text2: desc,
    });
  };

  // storing data in AsyncStorage and redux
  const storeData = async () => {
    try {
      dispatch(currUserData(JSON.stringify(userData)));
      await AsyncStorage.setItem('User', JSON.stringify(userData)).then(
        showToast('success', 'welcome', 'Logged in Successfully 👋'),
      );
    } catch (e) {
      console.log(e);
    }
  }; 

  const checkLogin = async () => {
    const userData = await AsyncStorage.getItem('User');
    if (userData) {
      dispatch(currUserData(userData));
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogin = async () => {
    const response = await LoginApi(email, password);
    if (typeof response == typeof {}) {
      await setAuth(() => response.user);
      userData.id = response.user.id;
      userData.email = response.user.email;
      userData.name = response.user.name;
      storeData();
      navigation.navigate('Home');
    } else {
      showToast('error', 'Failed', 'invalid Email / Password ❌');
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
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
            // onFocus={() => handleInputFocus('email')}
            // onBlur={() => handleInputBlur('email')}
            style={{
              backgroundColor: 'white',
              // borderBottomColor: '#1F41BB',
              // borderBottomWidth: isFocused.email ? 2 : 1,
              alignSelf: 'center',
              width: 250,
              borderRadius: 5,
              margin: 5,
            }}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email"
          />
          <TextInput
            // onFocus={() => handleInputFocus('pass')}
            // onBlur={() => handleInputBlur('pass')}
            style={{
              backgroundColor: 'white',
              // borderBottomColor: '#1F41BB',
              // borderBottomWidth: isFocused.pass ? 2 : 1,
              alignSelf: 'center',
              width: 250,
              borderRadius: 5,
              margin: 5,
              marginTop: 15,
            }}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={checked}
            placeholder="Password"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Checkbox
              status={checked ? 'unchecked' : 'checked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>Show Password</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
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
            <Text style={{alignSelf: 'center', color: '#1F41BB'}}>
              Register
            </Text>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Icon source="twitter" size={25} />
            <Icon source="google" size={25} />
            <Icon source="google-plus" size={25} />
            <Icon source="facebook" size={25} />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
