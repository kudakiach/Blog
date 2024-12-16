const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema =  new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username: {
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,
    },
    savedPosts:{
        type:[String],
        default: [],
    },
    password:{
        type:String,
        required:true
    }
}, 
{timestamps:true}

)

module.exports = mongoose.model("Auth", userSchema);