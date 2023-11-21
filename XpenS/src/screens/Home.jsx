import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomSheet, Icon, ListItem, SpeedDial} from '@rneui/themed';
import TransactionDetails from '../components/TransactionDetails';
import NewTransaction from '../components/NewTransaction';
import {useFocusEffect} from '@react-navigation/native';
import {IconButton, Searchbar} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ProgressBarAndroidBase} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import * as Progress from 'react-native-progress';
// import * as Icons from "react-native-heroicons/solid";

export default function Home({navigation}) {
  const defaultVal = {
    Daily: false,
    Weekly: false,
    Monthly: false,
    Yearly: false,
  };
  const [isFocused, setIsFocused] = useState(defaultVal);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currUser, setUser] = useState({});
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleInputFocus = textinput => {
    setIsFocused(defaultVal);
    setIsFocused({
      [textinput]: true,
    });
  };

  // const getData = async()=>{
  //   const userdata = await AsyncStorage.getItem("User")
  //   setUser(JSON.parse(userdata))
  // }

  // useEffect(()=>{
  //   getData()
  // },[])

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const userdata = await AsyncStorage.getItem('User').then(val=>JSON.parse(val))
        setUser(userdata);
      };
      
      getData();
    }, []),
    );
    
    function close() {
      setVisible(!visible);
    }

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 23, marginTop: 20, fontWeight: 'bold'}}>
            Welcome {currUser?.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <TouchableOpacity
            onPress={() => handleInputFocus('Daily')}
            style={{
              borderColor: 'white',
              borderBottomWidth: isFocused.Daily ? 1 : null,
            }}>
            <Text
              style={{
                margin: 15,
                fontSize: 18,
                color: isFocused.Daily ? 'white' : 'gray',
                fontWeight: 'bold',
              }}>
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: 'white',
              borderBottomWidth: isFocused.Weekly ? 1 : null,
            }}
            onPress={() => handleInputFocus('Weekly')}>
            <Text
              style={{
                margin: 15,
                fontSize: 18,
                color: isFocused.Weekly ? 'white' : 'gray',
                fontWeight: 'bold',
              }}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: 'white',
              borderBottomWidth: isFocused.Monthly ? 1 : null,
            }}
            onPress={() => handleInputFocus('Monthly')}>
            <Text
              style={{
                margin: 15,
                fontSize: 18,
                color: isFocused.Monthly ? 'white' : 'gray',
                fontWeight: 'bold',
              }}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: 'white',
              borderBottomWidth: isFocused.Yearly ? 1 : null,
            }}
            onPress={() => handleInputFocus('Yearly')}>
            <Text
              style={{
                margin: 15,
                fontSize: 18,
                color: isFocused.Yearly ? 'white' : 'gray',
                fontWeight: 'bold',
              }}>
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[{margin:10,marginHorizontal:20},styles.shadowProp]}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>

        {/* Transaction details component */}
        <View
          style={[
            {
              backgroundColor: 'white',
              width: 350,
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 3,
            },
          ]}>
          <TransactionDetails user={currUser}/>
        </View>

        {/* new transaction component */}
        <BottomSheet modalProps={{}} isVisible={visible}>
          <NewTransaction close={close} />
        </BottomSheet>


        <View style={{}}>
          <View
            style={[
              {
                backgroundColor: '#dff5f0',
                height: 40,
                width: 80,
                justifyContent: 'center',
                borderBottomEndRadius: 50,
                borderBottomStartRadius: 50,
                alignSelf: 'center',
              },
              styles.shadowProp,
            ]}>
            <Text style={{fontSize: 18, alignSelf: 'center'}}>Day25</Text>
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
              Playstation 5
            </Text>
            <Progress.Bar progress={0.9} width={300} height={30} color='#ffe6fe' borderColor='gray'/>
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
              Samsung S23 Ultra
            </Text>
            <Progress.Bar progress={0.2} width={300} height={30} color='#ffe6fe' borderColor='gray' />
            <Text>Target ₹1,02,000</Text>
          </View>
        </View>
        <SpeedDial
          isOpen={open}
          icon={{name: 'edit', color: '#fff'}}
          openIcon={{name: 'close', color: '#fff'}}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          style={{elevation:20}}>
          <SpeedDial.Action
            icon={{name: 'add', color: '#fff'}}
            title="New Log"
            onPress={() => setVisible(!visible)}
          />
          <SpeedDial.Action
            icon={{name: 'flag', color: '#fff'}}
            title="New Goal"
            onPress={() => setVisible(!visible)}
          />
        </SpeedDial>
      </View>
    </KeyboardAwareScrollView>
  );
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
