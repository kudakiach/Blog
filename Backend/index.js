const express = require("express")

// Routers
const userRoutes = require("./routes/user.routes")
const commentRoutes = require("./routes/comment.routes")
const postRoutes = require("./routes/post.routes")

const app = express();

// Routes Midleware
app.use('/users',userRoutes)
app.use('/comments',commentRoutes)
app.use('/posts',postRoutes)


app.listen(3000, ()=> {
    console.log("Server Connected")
})