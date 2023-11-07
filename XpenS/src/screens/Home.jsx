import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf:'center',justifyContent:'center', borderRadius:5, marginTop:25}}><Text style={{alignSelf:'center',color:'#1F41BB'}}>Logout</Text></TouchableOpacity>
    </View>
  )
}