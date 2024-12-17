const express = require("express")

const { addComment, getComments, deleteComment } = require("../controller/comment.controller");
const { verifyTokenMiddleware } = require("../controller/auth.contoller");

const router = express.Router();

router.get("/:postid", getComments)
router.post("/:postid",verifyTokenMiddleware, addComment)
router.delete("/:id", verifyTokenMiddleware, deleteComment)

module.exports =  router;