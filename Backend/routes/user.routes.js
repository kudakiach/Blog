const express = require("express")
const User = require("../models/user.model");
const  {getUserSavedData, savePost}  = require("../controller/user.controller");
const { verifyTokenMiddleware } = require("../controller/auth.contoller");

const router = express.Router();


router.get("/saved", verifyTokenMiddleware, getUserSavedData)
router.patch("/saved", verifyTokenMiddleware, savePost)

module.exports =  router;