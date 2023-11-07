const express = require ('express')
const app = express();
const mongoose = require('mongoose');
const {isValidObjectId} = require('mongoose');
const cors = require('cors');
const Users = require('../models/UserModels');
const jwt = require('jsonwebtoken');
const VerifyLogin = require('../models/VerificationModel');
const nodemailer = require('nodemailer');


const userRegister = {
    fullname: "",
    email: "",
    password: "",
  }

  genrateOTP = () =>{
    let otp = '';
    for(let i=0;i<=3;i++){
      let rand = Math.floor(Math.random()*9)
      otp+=rand;
    }
    return otp;
  }

  let verificationMailTemp;
  let successMailTemp;

  async function sendMail(email,OTP,template){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'behom987@gmail.com',
            pass: process.env.NM_KEY
        }
    })
    const mailOptions = {
        from: 'behom987@gmail.com',
        to: email,
        subject: 'Verify your OTP for XpenS Manager',
        text: `Use this otp ${OTP} to login to your XpenS application`
    };
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email Sent')
    } catch (error) {
        console.log(error)
    }
  }


exports.test = (req,res)=>{
    res.send('<h1>Hello it works</h1>')
}

exports.RegisterUser = async(req,res)=>{
    const {fullname,email,password} = req.body
    const user = await Users.findOne({email})
    if(user) return res.send("User Already Exists")
    userRegister.fullname=fullname;
    userRegister.email=email;
    userRegister.password=password;    

    const newUser = new Users(userRegister);

    const OTP = genrateOTP()
    const VerifcationToken = new VerifyLogin({
    owner: newUser._id,
    token: OTP
    })

    await VerifcationToken.save()
    await newUser.save().catch((err)=> {return res.json(err)})

    sendMail(newUser.email,OTP,verificationMailTemp)
    .then(()=>res.json(newUser))
    .catch(err=>res.status(400).json('User with same email id already exists: '+err.message))

}

exports.LoginUser = async(req,res)=>{
    const {email,password,otp} = req.body;
    const user = await Users.findOne({email})

    if(!user) return res.send("no user found!!!")
    if(!password) return res.send("please enter a password!!!")
    if(!user.verified) return res.send("Please Verify your Account!!!")
    
    const isLogin = await user.comparePassword(password)
    if(!isLogin) return res.json('Password does not match!!!')

    const token = jwt.sign({userId:user._id}, process.env.JWT_KEY,{
        expiresIn: '1d'
    })

    res.json({success: true, user:{id:user._id, name: user.fullname, email: user.email, token:token}})
    
}

exports.VerifyUser = async(req,res)=>{
    const {userId,otp} = req.body
    if(!userId || !otp) return res.send('Input Missing!!!');
    if(!isValidObjectId(userId)) return res.send('invalid user id!!!');

    const user = await Users.findById(userId)
    if(!user) return res.send('no user found!!!')

    if(user.verified) return res.send('user already verified')

    const token = await VerifyLogin.findOne({owner:user._id})
    if(!token) return res.send('no such user found')

    const isMatched = await token.compareToken(otp)
    if(!isMatched) return res.send('invalid token')

    user.verified = true;

    await VerifyLogin.findByIdAndDelete(token._id)
    await user.save()

    res.json({success: true, user:{id:user._id, token:token}})
}