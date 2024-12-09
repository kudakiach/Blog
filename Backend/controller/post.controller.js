const express = require("express")
const Post = require("../models/post.model")

const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts)
}

const getPost = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug});
    res.status(200).json(post)
}

const createPost = async (req, res) => {

  
        const newPost =  new Post(req.body);
        const post = await newPost.save();
        res.status(200).json(post)
    
    
}

const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("post has been deleted")
}


module.exports = {
    getPost,
    getPosts,
    createPost,
    deletePost
}