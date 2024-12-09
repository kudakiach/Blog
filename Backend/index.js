const express = require("express")
require('dotenv').config();
const bodyParser = require('body-parser')
const { clerkMiddleware, requireAuth } = require('@clerk/express')
const cors = require("cors")


// Routers
const userRoutes = require("./routes/user.routes")
const commentRoutes = require("./routes/comment.routes")
const postRoutes = require("./routes/post.routes")
const webhookRoutes = require("./routes/webhooks.routes")
const indexRoutes = require("./routes/index.routes")

const ConnectDB = require("./lib/connectDB")

const app = express();

app.use(cors());

app.use('/webhooks', webhookRoutes)
app.use(express.json())

app.use(clerkMiddleware())

// Routes Midleware
app.use('/users',userRoutes)
app.use('/comments',commentRoutes)
app.use('/posts', postRoutes)
app.use('/', indexRoutes)


ConnectDB();



// app.get('/protected', requireAuth(), (req, res) => {
//     res.send('This is a protected route')
// })

// app.get('/auth-state', (req, res) => {
//     const authState = req.auth
//     res.send(authState)
// })

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message || "Something went Wrong",
        status:error.status,
        stack:error.stack
    })
})

app.listen(3000, ()=> {
    console.log("Server Connected")
})