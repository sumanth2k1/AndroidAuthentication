const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const transactionSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    transType:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    mode:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const newTranSchema = mongoose.model("newTranSchema", transactionSchema);
module.exports = newTranSchema;