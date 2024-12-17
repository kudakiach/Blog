const express = require("express");
const { signUp, logout, signIn, verifyTokenMiddleware } = require("../controller/auth.contoller");

const router = express.Router();

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/logout", logout)
router.post('/verify', verifyTokenMiddleware)

module.exports = router;