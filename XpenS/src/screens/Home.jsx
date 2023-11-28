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
import {BottomSheet, ListItem, SpeedDial} from '@rneui/themed';
import TransactionDetails from '../components/TransactionDetails';
import NewTransaction from '../components/NewTransaction';
import {useFocusEffect} from '@react-navigation/native';
import {IconButton, Searchbar} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ProgressBarAndroidBase} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Icon} from 'react-native-paper';
import {PieChart} from 'react-native-gifted-charts';
import NewGoal from '../components/NewGoal';

// import * as Icons from "react-native-heroicons/solid";

export default function Home({navigation}) {
  const defaultVal = {
    Daily: true,
    Weekly: false,
    Monthly: false,
    Yearly: false,
  };
  const [isFocused, setIsFocused] = useState(defaultVal);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [currentDay, setCurrentDay] = useState({
    start: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  });

  // console.log(currentDay)

  let goalProgress ;

  const reduxData = useSelector(state => state.reducer);
  const loggedData = JSON.parse(reduxData);

  // const reduxCardData = useSelector(state => state.cardDataReducer);
  
  // let {balance,expense} = reduxCardData
  // console.log(reduxCardData)
  
  const pieData = [
    {value: 90, color: '#04cf0e'},
    {value: 10, color: '#fc5603'},
  ];

  const handleInputFocus = textinput => {
    setIsFocused(defaultVal);
    setIsFocused({
      [textinput]: true,
    });
    let start;
    let end;
    switch (textinput) { 
      case 'Daily':
        start = moment().format('YYYY-MM-DD');
        end = moment().format('YYYY-MM-DD');
        setCurrentDay({start: start, end: end});
        break;
      case 'Weekly':
        start = moment().startOf('week').format('YYYY-MM-DD');
        end = moment().format('YYYY-MM-DD');
        setCurrentDay({start: start, end: end});
        break;
      case 'Monthly':
        start = moment().startOf('month').format('YYYY-MM-DD');
        end = moment().format('YYYY-MM-DD');
        setCurrentDay({start: start, end: end});
        break; 
      case 'Yearly':
        start = moment().startOf('year').format('YYYY-MM-DD');
        end = moment().format('YYYY-MM-DD');
        setCurrentDay({start: start, end: end});
        break;

      default:
        start = moment().startOf('year').format('YYYY-MM-DD');
        end = moment().format('YYYY-MM-DD');
        setCurrentDay({start: start, end: end});
        break;
    }
  };

  function close() {
    setVisible(!visible);
    // if(message) console.log(message)
  }

  // console.log(reduxCardData)

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
            Welcome {loggedData?.name}
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
          <TransactionDetails navDetail={currentDay} />
        </View>

        {/* new transaction component */}
        <BottomSheet modalProps={{}} isVisible={visible}>
          <NewTransaction close={close} />
        </BottomSheet>


          {/* new Goal  */}
        {/* <BottomSheet modalProps={{}} isVisible={visible}>
          <NewGoal close={close} />
        </BottomSheet> */}




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
              progress={goalProgress?goalProgress:0.1}
              width={300}
              height={30}
              color="#ffe6fe"
              borderColor="gray"
            />
            <Text>Target ₹70,000</Text>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginTop: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 290,
                width: 350,
              }, 
              styles.shadowProp,
            ]}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>
              Report
            </Text>
            {/* <Progress.Bar progress={0.2} width={300} height={30} color='#ffe6fe' borderColor='gray' /> */}
            <PieChart
              data={pieData}
              showText
              textColor="black"
              radius={85}
              textSize={15}
              focusOnPress
              showValuesAsLabels
              showTextBackground
              textBackgroundRadius={26}
            />
            <TouchableOpacity onPress={()=>navigation.navigate('Reports')}><Text>View more...</Text></TouchableOpacity>
          </View>
        </View>
        <SpeedDial
          isOpen={open}
          icon={{name: 'edit', color: '#fff'}}
          openIcon={{name: 'close', color: '#fff'}}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          style={{elevation: 20}}>
          <SpeedDial.Action
            icon={{name: 'add', color: '#fff'}}
            title="New Log"
            onPress={() => setVisible(!visible)}
          />
          <SpeedDial.Action
            icon={{name: 'flag', color: '#fff'}}
            title="New Goal"
            onPress={() => setVisible1(!visible1)}
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
