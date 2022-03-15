const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    authorId:{
        type: ObjectId, ref: "Author",
        required: true
    },
    tags:{
        type: [String]
    },
    category:{
        type: String,
        required: true
    },
    subCategory: [String],
 
    createdAt : Date, updatedAt : Date, deletedAt: Date,

    isDeleted:{
        type: Boolean,
        default:false
    },
    isPublished:{
        type: Boolean,
        default: false
    },
    publishedAt:{
        type: Date
    }
},
    {timestamps: true});

    module.exports = mongoose.model('Blogs', blogSchema)