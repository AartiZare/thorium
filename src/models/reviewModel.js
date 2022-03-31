const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({

    bookId:{
        type:ObjectId,
        ref: 'book',
        required: true
    },
    reviewBy:{
        type: String,
        required: true,
        default: 'guest',
        value: String
    },
    reviewAt:{
        type: Date,
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review:{
        type: String,
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{timestamps: true})

module.exports = mongoose.model('reviews', reviewSchema)