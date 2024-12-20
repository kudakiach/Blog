const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema =  new Schema({
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
    },
    role : {
        type:String,
        default:'user'
    }
   
}, 
{timestamps:true}

)

module.exports = mongoose.model("User", userSchema);