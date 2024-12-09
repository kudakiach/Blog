const express = require("express");
const bodyParser = require("body-parser")
const { clerkWebhook } = require("../controller/webhooks.controller");

const router = express.Router();



router.post("/clerk", bodyParser.raw({ type: 'application/json' }), clerkWebhook)

module.exports =  router;