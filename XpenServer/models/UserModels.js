const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:true,
        validate:{
            validator:function(fullname){
                return fullname.length>=3 && fullname.length<=20
            },
            message:'Name field should contain 4 to 20 characters'
        }
      },
    email: {
        type: String,
        required:true,
        unique:true,
        validate: {
            validator: function (value) {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              return emailRegex.test(value);
            },
            message: 'Invalid email format',
          },
    },
    password: {
        type: String,
        required:true,
        validate: {
            validator: function (password) {
              return password.length >= 8;
            },
            message: 'Password must be at least 8 characters long.',
          },
      },
      verified: {
        type: Boolean,
        default: false,
        required: true
      }
});



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10); 
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  
  userSchema.methods.comparePassword = async function (password) {
    if(!password) throw new Error('Password Missing');

    try {
        return bcrypt.compare(password, this.password);        
    } catch (error) {
        return console.log("error:", error)
    }
  };



const Users = mongoose.model("Users", userSchema);

module.exports = Users;