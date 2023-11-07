const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const VerifcationSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

VerifcationSchema.pre('save', async function(next){
    if(this.isModified('token')){
        const hashedToken = await bcrypt.hash(this.token,10);
        this.token = hashedToken;
    }
    next();
})

VerifcationSchema.methods.compareToken = async function (token){
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}



const VerifyLogin = mongoose.model('VerifyLogin', VerifcationSchema); 
module.exports = VerifyLogin;