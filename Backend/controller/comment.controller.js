const express = require("express")
const Post = require("../models/post.model")
const User = require("../models/user.model");
const Comment = require("../models/comment.model")




const getComments = async (req, res) => {
    const comments = await Comment.find({post:req.params.postid}).populate("user", "username img").sort({createdAt:-1})
    res.status(200).json(comments)
}


const addComment = async (req, res) => {
        const clerkUserId = req.auth.userId 
        const postId = req.params.postid
        if(!clerkUserId){
            return res.status(401).json("not authenticated")
        }

        const user = await User.findOne({ clerkUserId })

        if(!user){
            // console.log("user not found")
            return res.status(404).json("User not found");
        }
        const newComment =  new Comment({user:user._id, post:postId, ...req.body});
        const comment = await newComment.save();
       
       

        setTimeout(() => {
            res.status(200).json({comment})
        }, 3000)
}


const deleteComment = async (req, res) => {

    const clerkUserId = req.auth.userId 

    const user = await User.findOne({clerkUserId})

    const delComment = await Post.findByIdAndDelete({id:req.params.id, user:user._id});

    if(!delComment){
        return res.status(403).json("You can delete only your Comments");
    }
    
    res.status(200).json("Comment has been deleted")
}

module.exports = { addComment, getComments, deleteComment }
