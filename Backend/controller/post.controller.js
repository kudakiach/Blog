const express = require("express")
const Post = require("../models/post.model")
const { clerkMiddleware, requireAuth } = require('@clerk/express');
const User = require("../models/user.model");

const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts)
}

const getPost = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug});
    res.status(200).json(post)
}

const createPost = async (req, res) => {

        const clerkuserId = req.auth.userId
        
        if(!clerkuserId){
            return res.status(401).json("not authenticated")
        }

        const user = User.findOne({clerkUserId})

        if(!user){
            return res.status(404).json("User not found");
        }
  
        const newPost =  new Post(req.body);
        const post = await newPost.save();
        res.status(200).json(post)
    
    
}

const deletePost = async (req, res) => {

    const user = await User.findOne({clerkUserId})

    const dpost = await Post.findByIdAndDelete({id:req.params.id, user:user._id});

    if(!dpost){
        return res.status(403).json("You can delete only your posts");
    }
    
    res.status(200).json("post has been deleted")
}


module.exports = {
    getPost,
    getPosts,
    createPost,
    deletePost
}