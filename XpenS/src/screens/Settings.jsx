import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}) {
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear().then(() => {
      showToast('Cleared');
      // navigation.navigate('Login');
    });
  };
  return (
    <View>
      <View>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{fontSize: 18}}>🌐 App Language</Text>
        </View>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{fontSize: 18}}>💲 Currency</Text>
        </View>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{fontSize: 18}}>🙍‍♂️ Manage Profile</Text>
        </View>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{fontSize: 18}}>🔑 Change password</Text>
        </View>
      </View>
      <View style={{alignItems:"center",height:"80%",justifyContent:"flex-end"}}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 90,
            borderRadius: 10,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 120,
            marginLeft: 20,
          }}>
          <Text
            style={{fontSize: 18, color: 'white'}}
            onPress={() => clearAsyncStorage()}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
