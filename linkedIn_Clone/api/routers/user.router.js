const Router = require("express")
const { register, verify, login } = require("../controllers/user.controller")

const router = Router()

router.post("/register",register)
router.post("/verify/:token",verify)
router.post("/login",login)

module.exports = router