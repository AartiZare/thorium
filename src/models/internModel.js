const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    email: {
        type: String,
        trim:true,
        unique: true,
        lowercase: true,
        required: true,
        validate:{
            validator: function(email){return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
        },message:"please fill the valid email address",
                isAsync: false
            
            }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate:function(mobile){return /^\d{10}$/.test(mobile)},msg:"enter valid number", isAsync: false
    },
    collegeId: {
        type:ObjectId,
        ref: 'college',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


   module.exports = mongoose.model('Interns', internSchema)