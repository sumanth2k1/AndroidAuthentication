import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {newTransactionDetail} from '../api/api';
import {Avatar, Icon, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

export default function NewTransaction(Close) {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [mode, setMode] = useState(null);
  const [desc, setDesc] = useState('');
  const [val1, setVal1] = useState(null);
  const [val2, setVal2] = useState(null);
  const [val3, setVal3] = useState(null);
  const [currUser, setUser] = useState({});

  const data = [
    {label: 'Goal', value: '1'},
    {label: 'Medical', value: '2'},
    {label: 'Food', value: '3'},
    {label: 'Party', value: '4'},
    {label: 'Gifts', value: '5'},
    {label: 'Salary', value: '6'},
    {label: 'Bills', value: '7'},
    {label: 'Fuel', value: '8'},
    {label: 'travel', value: '9'},
    {label: 'Outings', value: '10'},
    {label: 'Other', value: '11'},
  ];
  const data1 = [
    {label: 'Cash', value: '1'},
    {label: 'UPI', value: '2'},
    {label: 'Bank Transfer', value: '3'},
    {label: 'Credit Card', value: '4'},
    {label: 'Debit Card', value: '5'},
  ];
  const typeData = [
    {label: 'Credit', value: '1'},
    {label: 'Debit', value: '2'},
  ];

  const reduxData = useSelector((state)=>state.reducer)
  const loggedData = JSON.parse(reduxData)


  
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getData = async () => {
  //       const userdata = await AsyncStorage.getItem('User').then(val=>JSON.parse(val))
  //       setUser(userdata);
  //     };
       
  //     getData();
  //   }, []),
  //   );

  // const showToast = message => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };

  const showToast = (mtype,message,desc) => {
    Toast.show({
      type: mtype,
      text1: message,
      text2: desc
    });
  }



  const handleNew = async () => {
    // newTransactionDetail(user.userId,amount,title,category,mode,desc).then(res.send("Transaction added successfully"))
  };

  const addNew = async () => {
    if (!amount) return showToast('error','Enter all fields !!!');
    if (!title) return showToast('error','Enter all fields !!!');
    if (!type) return showToast('error','Enter all fields !!!');
    if (!category) return showToast('error','Enter all fields !!!');
    if (!mode) return showToast('error','Enter all fields !!!');
    if (!desc) return showToast('error','Enter all fields !!!');
    await newTransactionDetail(
      loggedData.id,
      amount,
      title,
      type,
      category,
      mode,
      desc,
    ).then(
    showToast('success','Transaction added successfully'),
    setAmount(''),
    setTitle(''),
    setVal1(null),
    setVal2(null),
    setVal3(null),
    setDesc(''),
    Close.close()
    )
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginHorizontal: 10,
        marginTop: 20,
      }}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <TouchableOpacity
        onPress={() => Close.close()}
        style={{
          margin: 20,
          borderRadius: 100,
        }}>
        {/* <Icon color="#a8326b" source="arrow-left" size={30} /> */}
        <Text>{"< Exit"}</Text>
      </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={text => setAmount(text)}
          value={amount}
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            width: 250,
            height: 45,
            margin: 5,
          }}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Amount"
        />
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            width: 250,
            height: 45,
            margin: 5,
          }}
          placeholder="Title"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={typeData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Transaction Type"
          value={val1}
          onChange={item => {
            setType(item.label);
            setVal1(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Transaction category"
          searchPlaceholder="Search..."
          value={val2}
          onChange={item => {
            setCategory(item.label);
            setVal2(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Mode of transaction"
          searchPlaceholder="Search..."
          value={val3}
          onChange={item => {
            setMode(item.label);
            setVal3(item.value);
          }}
        />
        <TextInput
          value={desc}
          onChangeText={text => setDesc(text)}
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            width: 250,
            height: 45,
            margin: 5,
          }}
          placeholder="desc"
        />
        <TouchableOpacity
          onPress={() => addNew()}
          style={{
            height: 35,
            width: 55,
            margin: 15,
            borderRadius: 5,
            backgroundColor: '#65BCBF',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 17}}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 45,
    width: 250,
    alignSelf: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 15,
  },
  inputSearchStyle: {
    height: 45,
    fontSize: 16,
  },
});
