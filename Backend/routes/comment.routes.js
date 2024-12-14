const express = require("express")

const { addComment, getComments, deleteComment } = require("../controller/comment.controller");

const router = express.Router();

router.get("/:postid", getComments)
router.post("/:postid", addComment)
router.get("/:id", deleteComment)

module.exports =  router;