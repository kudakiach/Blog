const express = require("express")
const User = require("../models/user.model");

const router = express.Router();


router.get("/",  async (req, res) => {

    const clerkuserId = req.auth.userId 

    if(!clerkuserId){
        return res.status(401).json("not authenticated")
    }

    const user = await User.findOne({clerkUserId})

    if(!user){
        return res.status(404).json("User not found");
    }

    res.json(user)
})
// router.delete("/:id", deleteUser)

module.exports =  router;