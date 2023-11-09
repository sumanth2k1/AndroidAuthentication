import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'

export const LoginApi = async(email,password) => {
    const options = {
        method: 'POST',
        url: 'http://10.0.2.2:3000/login-user',
        headers:{
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        },
        data :{email:email,password:password}
    }
    try{
        const response = await axios.request(options)
        return response.data;
    }catch(err){
        return err
    }     
}


export const RegisterApi = async(fullname,email,password)=>{
    const options = {
        method: 'POST',
        url: 'http://10.0.2.2:3000/register-user',
        headers:{
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        },
        data :{fullname:fullname,email:email,password:password}
    }
    try{
        const response = await axios.request(options)
        console.log(response.data)
        return response.data;
    }catch(err){
        return err
    }
}



export const VerificationApi = async(userId,otp)=>{
    try {
        const response = await axios.get('http://10.0.2.2:3000/verify-user', {
          params: {
            userId: userId,
            otp: otp
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res=> console.warn('Verification Successfully',res))
        return response
      } catch (error) {
        return (error);
      }
}


export const resetOtp = async (email) =>{
    const response = await axios.get('http://10.0.2.2:3000/reset-otp', {
      params: {
        email:email
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err=>console.warn(err))
    return response.data._id
}


export const verifyOtp = async(resetId,otp) => {
  const response = await axios.get('http://10.0.2.2:3000/reset-user', {
      params: {
        userId:resetId,
        otp:otp
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err=>console.warn(err))
    console.log(response.data.success)
    return response.data.success
}


export const changePass = async(resetId,password)=>{
  // const response = await axios.post('http://10.0.2.2:3000/reset-password', {
  //   params: {
  //     userId:resetId,
  //     password:password
  //   },
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).catch(err=>console.warn(err))
  // console.log(response.data.success)
  // return response.data.success

  const options = {
    method: 'POST',
    url: 'http://10.0.2.2:3000/reset-password',
    headers:{
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    },
    data :{userId:resetId,password:password}
    }
    try{
        const response = await axios.request(options)
        console.log(response.data)
        return response.data;
    }catch(err){
        return err
    }

}