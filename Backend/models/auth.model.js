const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema =  new Schema({
    firstname:{
        type:String,
        
    },
    lastname:{
        type:String,
        
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

module.exports = mongoose.model("Auth", authSchema);