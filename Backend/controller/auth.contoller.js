const User = require("../models/user.model")
const bcrypt = require('bcrypt');
require("dotenv").config(); 
const jwt = require("jsonwebtoken");
const blacklist = new Set();


// Hashing a password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Verifying a password
const verifyPassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match; // true if the password matches the hash
};

const signUp = async (req, res) => {

    const {firstname, lastname,  email, img, password} = req.body;

    if(!firstname){
        return res.status(400).json({error:"Firstname is required"})
    }

    if(!email){
        return res.status(400).json({error:"Email Address is required"})
    }

    if(!password){
        return res.status(400).json({error:"Password cannot be empty"})
    }
    
    const user = await User.findOne({ email })

    if(user) {
        res.status(403).json({error:"User Exist"})
    }

    const hash = await hashPassword(password);
    
    // console.log(hash)
    const newUser = new User({
        firstname:firstname,
        lastname:lastname,
        email:email,
        img:img,
        username:email.split("@")[0],
        password:hash
    })

    let saved = await newUser.save();

    if(!saved){
        return res.status(400).json(error)
    }

    res.status(200).json(saved)

}



const signIn = async (req, res) => {

    
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    if(!email || !password){
        return res.status(400).json({error:"Email and password is required"})
    }

    console.log("Login")
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error:"User does not exist"})
    }

    const match = await verifyPassword(password, user.password);

    if(match){
        const token = jwt.sign(
        { 
            _id:user._id,
            username:user.username,
            email:email
        }, 
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:'1h'
        }
    )

        return res.status(201).json({token, success:"User Login Success"})
    }else{
        return res.status(400).json({error:"Invalid Credentials"})
    }
    
}

const logout = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token not provided" });
    blacklist.add(token);
    //console.log(blacklist)
    return res.status(200).json({success:"User logged out"});
}

const verifyTokenMiddleware = (req, res, next) => { 
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({session:false, message: "Token missing" });

    if(blacklist.has(token)) return res.status(401).json({session:false, message: "User Session is no longer Valid"})

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({session:false, message: "Invalid token"});

        req.user = user; // Attach decoded token payload to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = {
    signUp,
    signIn,
    logout,
    verifyTokenMiddleware
}