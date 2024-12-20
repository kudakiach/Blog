const User = require('../models/user.model');
const Post = require('../models/post.model')



const getUserSavedData = async (req, res) => {
    
    const user = req.user;

    if(!user){
        return res.status(401).json({error:"Not Authorised"})
    }
    const userData = await User.findOne({_id:user._id});
   
    return res.status(200).json(userData.savedPosts)
}

const savePost = async (req, res)=>{
    const user = req.user;

    const postId = req.body.postId;

    const checkUser = await User.findOne({_id:user._id});
    const isSaved = checkUser.savedPosts.some((p) => p === postId);

    if(!isSaved){
        await User.findByIdAndUpdate(user._id, {$push:{savedPosts:postId}})
    }else{
        await User.findByIdAndUpdate(user._id, {$pull:{savedPosts:postId}})
    }
    return res.status(200).json(isSaved ? "post unsaved" : "post saved")
}

module.exports = {
    getUserSavedData,
    savePost
}