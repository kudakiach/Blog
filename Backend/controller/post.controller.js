const express = require("express")
const Post = require("../models/post.model")
const User = require("../models/user.model");

const { clerkMiddleware, requireAuth } = require('@clerk/express');



const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts)
}

const getPost = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug});
    res.status(200).json(post)
}

const createPost = async (req, res) => {

        const clerkUserId = req.auth.userId 

        if(!clerkUserId){
            return res.status(401).json("not authenticated")
        }

        const user = await User.findOne({ clerkUserId })

        if(!user){
            // console.log("user not found")
            return res.status(404).json("User not found");
        }


        let slug = req.body.title.replace(/ /g, "-").toLowerCase();
        let existPost = await Post.findOne({slug});

        let counter = 1;

        while(existPost){
            slug = `${slug}-${counter}`
            existPost = await Post.findOne({slug});
            counter++;
        }
       
  
        const newPost =  new Post({user:user._id, slug, ...req.body});
        const post = await newPost.save();
       
        console.log(post)
        res.status(200).json(post)
        
    
}

const deletePost = async (req, res) => {

    const clerkUserId = req.auth.userId 

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