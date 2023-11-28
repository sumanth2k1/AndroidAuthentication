import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BottomSheet, ListItem} from '@rneui/themed';
import {
  Button,
  Icon,
  PaperProvider,
  Portal,
  Searchbar,
  TextInput,
} from 'react-native-paper';
import {loadTransData} from '../api/api';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {cardData} from './redux/action';
import Modal from 'react-native-modal';

export default function TransactionDetails(currentDay) {
  const [isVisible, setIsVisible] = useState(false);
  const [transData, setTransData] = useState();
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currDetail, setCurrDetail] = useState({});
  const [searchData, setSearchData] = useState('');
  const [filterData, setFilterData] = useState();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const reduxData = useSelector(state => state.reducer);
  const loggedData = JSON.parse(reduxData);

  // console.log(currentDay)

  const handleSearch = val => {
    const searchedItems = transData?.filter(i =>
      `${i.amount} ${i.title} ${i.transType} ${i.category} ${i.mode} ${i.desc}`.includes(
        val,
      ),
    );
    setSearchData(searchedItems);
  };
  // console.log(currentDay.navDetail)

  const handleClose = () => {
    setSearchData('');
    setIsVisible(false);
  };

  const loadTrans = useCallback(async () => { 
    try {
      const response = await loadTransData(loggedData?.id);
      if (typeof response === 'object') {
        setTransData(response);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }, [loggedData?.id]);
  
  useEffect(() => {
    loadTrans();
  }, [currentDay]);
  

  useEffect(() => {
    function filter(e) {
      if (e.createdAt.split('T')[0] >= currentDay.navDetail.start) return e;
    }
    let data = transData?.filter(e => filter(e));
    if (data) {
      let b = 0,
        x = 0;
      data.map(e => {
        if (e.transType == 'Debit') {
          x += parseInt(e.amount);
        }
        if (e.transType == 'Credit') {
          b += parseInt(e.amount);
        }
      });
      dispatch(cardData({balance: b, expense: x}));
      // console.log({balance: b, expense: x})
      setBalance(b);
      setExpense(x);
    }
    setFilterData(data);
  }, [transData, currentDay]);

  const viewTrans = () => {
    setIsVisible(true);
  };

  const handleDetail = e => {
    console.log;
  };
  const toggleModal = (e) => {
    console.log('clicked');
    setCurrDetail(e)
    setModalVisible(!isModalVisible);
  };



  // console.log(currentDay)
  // console.log(transData)

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View>
          <Text style={{fontSize: 20, color: 'gray'}}>Balance</Text>
          <Text style={{fontSize: 35, color: 'gray'}}>
            ₹{balance ? balance : '0'}
          </Text>
          <Text style={{fontSize: 15, color: 'green'}}>+ 28.03%</Text>
        </View>
        <View>
          <Text style={{fontSize: 20, color: 'gray'}}>Expense</Text>
          <Text style={{fontSize: 35, color: 'gray'}}>
            ₹{expense ? expense : '0'}
          </Text>
          <Text style={{fontSize: 15, color: 'red'}}>- 58.53%</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => viewTrans()}
        style={{
          backgroundColor: '#ffe6fe',
          // opacity: 0.5,
          height: 30,
          width: 140,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 30,
          marginBottom: 10,
        }}>
        <Text style={{color: 'gray', opacity: 0.9}}>View Transactions</Text>
      </TouchableOpacity>

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        <Modal
        style={{}}
        animationIn="bounceIn"
        animationInTiming={300}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={{flex: 1,backgroundColor:"white",padding:30,borderRadius:20}}>
            <View style={{backgroundColor:"gray",flexDirection:'row',padding:3,justifyContent:"space-between"}}>
              <Text style={{color:"white", fontSize:20}}>Summary</Text>
              <Text style={{color:"white", fontSize:20}}>{currDetail?.createdAt?.split('T')[0]}</Text>
            </View>
            <View style={{marginTop:20}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{fontSize:18}}>Title:-</Text><Text style={{fontSize:18}}>{currDetail.title}</Text></View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{fontSize:18}}>Amount:-</Text><Text style={{fontSize:18}}>{currDetail.amount}</Text></View>
            <Text>-----------------------------------------------------------------------------</Text>            
            <View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{fontSize:18}}>Transaction Type:-</Text><Text style={{fontSize:18}}>{currDetail.transType}</Text></View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{fontSize:18}}>Category</Text><Text style={{fontSize:18}}>{currDetail.category}</Text></View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={{fontSize:18}}>Transaction Mode:-</Text><Text style={{fontSize:18}}>{currDetail.mode}</Text></View>
            <Text>-----------------------------------------------------------------------------</Text>
            <View style={{}}><Text style={{fontSize:18}}>Description:</Text><Text style={{fontSize:18}}>{currDetail.desc}</Text></View>
            </View>
          </View>
        </Modal>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => handleClose()}
            style={{
              backgroundColor: 'white',
              margin: 10,
              width: 45,
              height: 45,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon source="close" size={25} />
          </TouchableOpacity>
          <View style={[{width: 300, marginHorizontal: 20}, styles.shadowProp]}>
            <Searchbar
              placeholder="Search"
              onChangeText={handleSearch}
              // value={searchQuery}
            />
          </View>
        </View>
        {searchData
          ? searchData.map((e, i) => (
              <ListItem
                key={i}
                containerStyle={styles.listitemcontainer}
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => toggleModal(e)}>
                <ListItem.Content
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 15,
                    },
                    styles.shadowProp,
                  ]}>
                  <ListItem.Title
                    style={
                      e.transType == 'Debit'
                        ? styles.listitemtitle1
                        : styles.listitemtitle2
                    }>
                    {e.transType == 'Credit' ? '+ ' : '- '}
                    {e.amount}
                  </ListItem.Title>
                  <ListItem.Title
                    style={
                      e.transType == 'Debit'
                        ? styles.listitemtitle1
                        : styles.listitemtitle2
                    }>
                    {e.mode}
                  </ListItem.Title>
                  <ListItem.Title
                    style={
                      e.transType == 'Debit'
                        ? styles.listitemtitle1
                        : styles.listitemtitle2
                    }>
                    {e.category}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          : filterData?.map((e, i) => (
              <ListItem
                key={i}
                containerStyle={styles.listitemcontainer}
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => toggleModal(e)}>
                <ListItem.Content
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 15,
                    },
                    styles.shadowProp,
                  ]}>
                  <ListItem.Title
                    style={
                      e.transType == 'Debit'
                        ? styles.listitemtitle1
                        : styles.listitemtitle2
                    }>
                    {e.transType == 'Credit' ? '+ ' : '- '}
                    {e.amount}
                  </ListItem.Title>
                  <ListItem.Title
                    style={
                      e.transType == 'Debit'
                        ? styles.listitemtitle1
                        : styles.listitemtitle2
                    }>
                    {e.mode}
                  </ListItem.Title>
                  <ListItem.Title
                    style={
                      e.transType == 'Debit'
                        ? styles.listitemtitle1
                        : styles.listitemtitle2
                    }>
                    {e.category}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  listitemtitle1: {
    color: 'red',
    width: '33%',
    textAlign: 'center',
  },
  listitemtitle2: {
    color: 'green',
    width: '33%',
    textAlign: 'center',
  },
  listitemcontainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 3,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    shadowColor: '#52006A',
  },
});
