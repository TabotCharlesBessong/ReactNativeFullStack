const Router = require("express")
const { register, verify } = require("../controllers/user.controller")

const router = Router()

router.post("/register",register)
router.post("/verify/:token",verify)

module.exports = router