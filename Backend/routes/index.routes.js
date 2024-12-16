const express = require("express");
const router = express.Router();
const {verifyTokenMiddleware} = require("../controller/auth.contoller")

router.get("/", verifyTokenMiddleware,  (req, res)=> {
    res.send("Welcome Home")
})

module.exports = router;