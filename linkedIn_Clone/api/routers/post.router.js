const Router = require("express")
const { create } = require("../models/post")
const { getAllPosts, likePost } = require("../controllers/post.controller")

const router = Router()

router.post("/create",create)
router.get("/all",getAllPosts)
router.post("/like/:postId/:userid",likePost)

module.exports = router