const mongoose = require("mongoose");

const Post = require("../models/post.model")
const { Schema } = mongoose;

const userSchema =  new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    post: {
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
   
    desc:{
        type:String,
      
    }
}, 
{timestamps:true}

)

module.exports = mongoose.model(userSchema);