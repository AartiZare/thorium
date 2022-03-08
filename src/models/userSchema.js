const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {

    name: String,
    balance:
    { 
        type: Number,
        default: 100
    },
    user_registration_number:
    { 
        type: Number,
        default: 100
    },
    address: String,
    age: Number,
    genger:{
        type: String,
        enum: ["male", "female", "other"]
    },
    isFreeAppUser:{
       type: Boolean,
       default: false
    }
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array