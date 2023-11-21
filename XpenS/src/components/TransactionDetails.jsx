import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BottomSheet, ListItem } from '@rneui/themed'
import { TextInput } from 'react-native-paper';
import { loadTransData } from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TransactionDetails() {
    const [isVisible, setIsVisible] = useState(false);
    const [transData, setTransData] = useState("")
    const [balance,setBalance] = useState(0)
    const [expense,setExpense] = useState(0)
    const [currUser, setUser] = useState({});
  

      // const loadTrans = async() =>{        
      //   const data = await loadTransData(user.user.id)
      //   setTransData(()=>data)
      //   let b=0,x=0;
      //   data.map((e)=>{
      //     if(e.transType=="Debit"){
      //       b+=parseInt(e.amount)
      //     }
      //     if(e.transType=="Credit"){
      //       x+=parseInt(e.amount)
      //     }
      //   })
      //   setBalance(b)
      //   setExpense(x)
      // }

      // useEffect(() => {
      //   const loadTrans = async() =>{   
      //     await user.length     
      //     const data = await loadTransData(user.user.id)
      //     setTransData(()=>data)
      //     let b=0,x=0;
      //     data.map((e)=>{
      //       if(e.transType=="Debit"){
      //         x+=parseInt(e.amount)
      //       }
      //       if(e.transType=="Credit"){
      //         b+=parseInt(e.amount)
      //       }
      //     })
      //     setBalance(b)
      //     setExpense(x)
      //   }
  
      //   loadTrans();
      // }, [])
      
      const getData = async () => {
        const userdata = await AsyncStorage.getItem('User').then(val=>JSON.parse(val))
        setUser(userdata);
        return userdata
      };

      // useFocusEffect(
      //   React.useCallback(() => {
      //     const getData = async () => {
      //       const userdata = await AsyncStorage.getItem('User').then(val=>JSON.parse(val))
      //       setUser(userdata);
      //     };  
          
      //     getData();
      //   }, []),
      //   );
      //   console.log(currUser)
         
      useFocusEffect(
        React.useCallback(() => {
          const loadTrans = async() =>{
            const user = await getData()
            const data = await loadTransData(user?.id)
            setTransData(()=>data)
            let b=0,x=0;
            data.map((e)=>{
              if(e.transType=="Debit"){
                x+=parseInt(e.amount)
              }
              if(e.transType=="Credit"){
                b+=parseInt(e.amount)
              }
            })
            setBalance(b)
            setExpense(x)            
          } 
    
          loadTrans();
        }, [])
      );
      
      
      const viewTrans = () =>{
        setIsVisible(true)
      }


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
          <Text style={{fontSize: 35, color: 'gray'}}>₹{balance?balance:"0"}</Text>
          <Text style={{fontSize: 15, color: 'green'}}>+ 28.03%</Text>
        </View>
        <View>
          <Text style={{fontSize: 20, color: 'gray'}}>Expense</Text>
          <Text style={{fontSize: 35, color: 'gray'}}>₹{expense?expense:"0"}</Text>
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
          marginBottom:10
        }}>
        <Text style={{color: 'gray', opacity: 0.9}}>View Transactions</Text>
      </TouchableOpacity>

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TouchableOpacity
          onPress={() => setIsVisible(false)}
          style={{
            backgroundColor: 'white',
            margin: 10,
            width: 45,
            height:45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25}}>❌</Text>
        </TouchableOpacity>
        {/* <View
          style={{
            flexDirection:"row",
            justifyContent:'flex-end',
            alignItems:'center',
            // borderRadius:100,
            marginTop:5
          }}
          >
            <TextInput style={{width:250}}/>
            <TouchableOpacity
          onPress={() => setIsVisible(false)}
          style={{
            backgroundColor: 'white',
            margin: 10,
            width: 45,
            height:45,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25}}>🔍</Text>
        </TouchableOpacity>
        </View> */}
        </View>
        {transData?transData.map((e,i) => (
          <ListItem
            key={i}
            containerStyle={styles.listitemcontainer}
            style={{justifyContent: 'center', alignItems: 'center'}}
            // onPress={l.onPress}
            >
            <ListItem.Content
              style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <ListItem.Title style={e.transType=="Debit"?styles.listitemtitle1:styles.listitemtitle2}>{e.transType=="Credit"?"+ ":"- "}{e.amount}</ListItem.Title>
              <ListItem.Title style={e.transType=="Debit"?styles.listitemtitle1:styles.listitemtitle2}>{e.mode}</ListItem.Title>
              <ListItem.Title style={e.transType=="Debit"?styles.listitemtitle1:styles.listitemtitle2}>{e.category}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )):null} 
      </BottomSheet>
    </View>
  )
}


const styles = StyleSheet.create({
  listitemtitle1:{
    color:'red'
  },
  listitemtitle2:{
    color:'green'
  },
  listitemcontainer: {
    backgroundColor: 'white',
        borderRadius: 10,
        margin: 3,
        marginHorizontal: 10,
        alignItems: 'center'
  }
})