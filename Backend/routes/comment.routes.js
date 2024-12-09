const express = require("express")

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("<h1>Comments Routes</h1>")
})

module.exports =  router;