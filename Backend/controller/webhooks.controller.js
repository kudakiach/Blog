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

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return void res.status(400).json({
        success: false,
        message: 'Error: Missing svix headers',
      })
    }



    let evt;
    // try {
    //     evt = wh.verify(payload, headers);
    // } catch (err) {
    //     res.status(400).json({
    //         "message":"webhook verification failed"
    //     });
    // }
    try {
        evt = wh.verify(payload, {
          'svix-id': svix_id,
          'svix-timestamp': svix_timestamp,
          'svix-signature': svix_signature ,
        })
      } catch (err) {
        console.log('Error: Could not verify webhook:', err.message)
        return void res.status(400).json({
          success: false,
          message: err.message,
        })
      }

    const { id } = evt.data
    const eventType = evt.type
    // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    // console.log('Webhook payload:', evt.data)
   

    if(evt.type === 'user.created'){
        const newUser = new User({
            clerkUserId:evt.data.id,
            username: evt.data.username || evt.data.email_addresses[0].email_address,
            email:evt.data.email_addresses[0].email_address,
            img: evt.data.profile_img_url

        })

        await newUser.save();
    }
}

module.exports = {clerkWebhook}