const mongoose = require("mongoose")
const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB is Connected")
    }catch(err){
        console.log(err)
    }
}

module.exports = ConnectDB