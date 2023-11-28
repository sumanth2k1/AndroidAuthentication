import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { currUserData } from '../components/redux/action';

export default function StartupSplash({navigation}) {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const checkLogin = async()=>{
        const userData = await AsyncStorage.getItem("User")
        if (userData) {
          dispatch(currUserData(userData));
          navigation.navigate('Home')
        }
      }

      checkLogin();
    }, [])
  );


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
      <Image
        source={require('../assets/images/splashimage1.png')}
        style={{height: 300, width: 300}}
      />
      <Text
        style={{
          marginTop: 70,
          color: '#1F41BB',
          fontWeight: 600,
          fontSize: 35,
        }}>
        XpenS
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginHorizontal: 50,
          marginTop: 30,
          textDecorationLine: 'underline',
        }}>
        Keep notes of all untracked Expenditure's with XpenS tracker and be at
        ease.
      </Text>
      <View
        style={{justifyContent: 'center', flexDirection: 'row', marginTop: 50}}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Login')}
          style={{
            height: 50,
            width: 150,
            backgroundColor: '#1F41BB',
            justifyContent: 'center',
            borderRadius: 50,
            margin: 10,
          }}>
          <Text style={{color: 'white', alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Signup')}
          style={{
            height: 50,
            width: 150,
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 50,
            margin: 10,
          }}>
          <Text style={{color: '#1F41BB', alignSelf: 'center'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
