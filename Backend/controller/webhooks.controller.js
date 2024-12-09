const express = require("express")
const User = require("../models/user.model")
const  { Webhook }  =  require('svix')

const clerkWebhook = async (req, res) => {

    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if(!SIGNING_SECRET) {
        throw new Error("Webhook secret needed!");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(SIGNING_SECRET);
    let event;
    try {
        event = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({
            "message":"webhook verification failed"
        });
    }

    console.log(event.data)

    if(event.type === 'user.created'){
        const newUser = new User({
            clerkUserId:event.data.id,
            username: event.data.username || event.data.email_addresses[0].email_address,
            email:event.data.email_addresses[0].email_address,
            img: event.data.profile_img_url

        })

        await newUser.save();
    }
}

module.exports = {clerkWebhook}