const express = require("express")
const postController = require("../controllers/post.controller")
const protect = require("../middleware/session.middleware")


const router = express.Router()

router.route("/")
.get(protect,postController.getAllPosts)
.post(protect, postController.createPost)

router.route("/:id")
.get(protect,postController.getOnePost)
.patch(protect,postController.updatePost)
.deleteprotect,(postController.deletePost)

module.exports = router;