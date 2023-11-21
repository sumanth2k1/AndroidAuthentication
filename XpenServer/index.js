const express = require ('express')
const app = express();
const mongoose = require('mongoose');
const Users = require('./models/UserModels');
const cors = require('cors');
require('dotenv').config()
const { test, RegisterUser, LoginUser, VerifyUser, ResetUser, ResetOtp, ResetPassword, NewTransaction, ViewTransaction } = require('./ApiEndpoints/ApiCalls');


app.get('/',test)

app.use(cors())
app.use(express.json())

app.post('/register-user', RegisterUser)
app.post('/login-user', LoginUser)
app.get('/verify-user', VerifyUser)
app.get('/reset-otp', ResetOtp)
app.get('/reset-user', ResetUser)
app.post('/reset-password', ResetPassword)


app.post('/new-transaction', NewTransaction)
app.get('/view-transaction', ViewTransaction)


const start = async () => {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/XpenSAuth"
      );
      app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();


