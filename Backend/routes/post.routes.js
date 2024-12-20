const express = require("express")
const Post = require("../models/post.model")
const {getPost, getPosts, createPost, deletePost, uploadAuth } = require("../controller/post.controller")
const { clerkMiddleware, requireAuth } = require('@clerk/express');
const { verifyTokenMiddleware } = require("../controller/auth.contoller");



const router = express.Router();

router.get("/auth", uploadAuth)
router.get("/",  getPosts)
router.get("/:slug", getPost)
router.post("/", verifyTokenMiddleware, createPost)
router.delete("/:id", verifyTokenMiddleware, deletePost)




module.exports =  router;