const express = require("express")
 

// Routers
const userRoutes = require("./routes/user.routes")
const commentRoutes = require("./routes/comment.routes")
const postRoutes = require("./routes/post.routes")

const ConnectDB = require("./lib/connectDB")

const app = express();
app.use(express.json())

// Routes Midleware
app.use('/users',userRoutes)
app.use('/comments',commentRoutes)
app.use('/posts',postRoutes)

ConnectDB();

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