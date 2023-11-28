import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Goals() {
  return (
    <KeyboardAwareScrollView
    keyboardShouldPersistTaps={'always'}
    contentContainerStyle={{flexGrow: 1}}
    showsVerticalScrollIndicator={false}>
    <View
        style={{
          flex: 1,
          position: 'relative',
          height: '100%',
        }}>
        <Image
          source={require('../assets/images/bg.png')}
          style={{height: '100%', width: '100%', position: 'absolute'}}
          blurRadius={7}
        />
      <View>
      <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 130,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{marginBottom: 20}}>
              Current Goal...
              <Icon source="flag-triangle" size={20} />
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Playstation 5
            </Text>
            <Progress.Bar
              progress={0.9}
              width={300}
              height={30}
              color="#ffe6fe"
              borderColor="gray"
            />
            <Text>Target ₹70,000</Text>
        </View>

        <Text style={{alignSelf:"center",marginTop:20,fontSize:20,fontWeight:"bold"}}>Previous Goals 🎉</Text>
        <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 110,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Samsung S23 Ultra
            </Text>
            <Progress.Bar progress={1} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
            <Text>Target ₹70,000</Text>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 110,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Apple 13 Pro Max
            </Text>
            <Progress.Bar progress={1} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
            <Text>Target ₹70,000</Text>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 110,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Skybags backpack
            </Text>
            <Progress.Bar progress={1} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
            <Text>Target ₹70,000</Text>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 110,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Playstation 3
            </Text>
            <Progress.Bar progress={1} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
            <Text>Target ₹70,000</Text>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 110,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Study Table
            </Text>
            <Progress.Bar progress={1} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
            <Text>Target ₹70,000</Text>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 110,
                width: 350,
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Laptop
            </Text>
            <Progress.Bar progress={1} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
            <Text>Target ₹70,000</Text>
          </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 10,
      shadowColor: '#52006A',
    },
  });