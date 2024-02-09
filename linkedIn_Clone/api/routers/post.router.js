const Router = require("express")
const { create } = require("../models/post")
const { getAllPosts } = require("../controllers/post.controller")

const router = Router()

router.post("/create",create)
router.get("/all",getAllPosts)

module.exports = router