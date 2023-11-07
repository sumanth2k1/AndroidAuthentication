import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

export default function Signup({navigation}) {
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
    <Text style={{fontSize:30, color:'#1F41BB', fontWeight:'bold'}}>Register Here</Text>
    <Text style={{fontWeight:'bold', marginTop:20}}>Welcome, Happy Saving</Text>
    <View style={{marginTop:30, backgroundColor:'white', height:500,width:300, padding:15,justifyContent:'center',borderRadius:30}}>
        <TextInput style={{backgroundColor:"white", borderBottomColor:'#1F41BB', borderBottomWidth:1,alignSelf:"center", width:250, borderRadius:5, margin:5}} placeholder='Email'/>
        <TextInput style={{backgroundColor:"white", borderBottomColor:'#1F41BB', borderBottomWidth:1,alignSelf:"center", width:250, borderRadius:5,margin:5, marginTop:15}} placeholder='Password'/>
        <TextInput style={{backgroundColor:"white", borderBottomColor:'#1F41BB', borderBottomWidth:1,alignSelf:"center", width:250, borderRadius:5,margin:5, marginTop:15}} placeholder='Confirm Password'/>        
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{backgroundColor:'#1F41BB',alignSelf:'center', height:40,width:90,justifyContent:'center', borderRadius:5, marginTop:25}}><Text style={{alignSelf:'center',color:'white'}}>Sign Up</Text></TouchableOpacity>
        <Text style={{alignSelf:'center',color:'black',marginTop:20}}>Already have an account ?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf:'center',justifyContent:'center', borderRadius:5, marginTop:25}}><Text style={{alignSelf:'center',color:'#1F41BB'}}>Login</Text></TouchableOpacity>
        <Text style={{alignSelf:'center',color:'black',marginTop:5,fontSize:11}}>Or continue with</Text>
        {/* <View
        style={{
            alignItems: 'center',
            paddingVertical: 5,
            flexGrow: 1,
        }}
        >
        <Icon
        name='heartbeat'
        color='#1F41BB' />
    </View> */}
    </View>
    </View>
  )
}