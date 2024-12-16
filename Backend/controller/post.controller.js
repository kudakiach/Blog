const express = require("express")
const Post = require("../models/post.model")
const User = require("../models/user.model");
const ImageKit = require("imagekit")

const { clerkMiddleware, requireAuth } = require('@clerk/express');

const imagekit = new ImageKit({
    publicKey : 'public_7WC+BTeMSRGlZCZd+h6bgM5al14=',
    privateKey : 'private_pr+fSyO3odNn83MBJOVrxPFi9ys=',
    urlEndpoint :'https://ik.imagekit.io/brm83yziu'
});

const getPosts = async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const posts = await Post.find().populate("user", "username")
        .limit(limit)
        .skip((page-1)*limit);
    
    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;
    res.status(200).json({posts, hasMore})
}

const getPost = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug}).populate("user", "username img");
    res.status(200).json(post)
}

const createPost = async (req, res) => {

        
        const authUser = req.user;

        if(!authUser) return res.status(401).json({message:"User not found"})

        // if(!userId){
        //     return res.status(401).json("not authenticated")
        // }
        let username = authUser.username;

        // console.log(authUser)

        const user = await User.findOne({ username })

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
    
    return res.status(200).json("post has been deleted")
}

const uploadAuth =  (req, res) => {
    var result =  imagekit.getAuthenticationParameters();
    console.log(result)
        res.send(result)   
}


module.exports = {
    getPost,
    getPosts,
    createPost,
    deletePost,
    uploadAuth
}