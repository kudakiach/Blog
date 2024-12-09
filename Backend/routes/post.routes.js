const express = require("express")
const Post = require("../models/post.model")
const {getPost, getPosts, createPost, deletePost} = require("../controller/post.controller")
const { clerkMiddleware, requireAuth } = require('@clerk/express')

const router = express.Router();

router.get("/",  getPosts)
router.get("/:slug", getPost)
router.post("/", createPost)
router.delete("/:id", deletePost)



module.exports =  router;