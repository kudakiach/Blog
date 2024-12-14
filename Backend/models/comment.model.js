const mongoose = require("mongoose");

const Post = require("../models/post.model")
const { Schema } = mongoose;

const commentSchema =  new Schema({
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
   
    comment:{
        type:String,
      
    }
}, 
{timestamps:true}

)

module.exports = mongoose.model("Comment", commentSchema);