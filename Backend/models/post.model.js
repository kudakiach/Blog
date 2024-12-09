const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/user.model")

const postSchema =  new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    img: {
        type:String,
    },
    title:{
        type:String,
        required:true,
        
    },
    slug:{
        type:String,
        unique:true
    },
    desc:{
        type:[String],
                
    },
    content:{
        type:String,
    },
    isFeatured:{
        type:Boolean
    },
    visit: {
        type:Number,
        default:0
    }
}, 
{timestamps:true}

)

module.exports = mongoose.model("Post", postSchema);