const Router = require("express")
const { register, verify, login, getUser, getConnections, updateProfile } = require("../controllers/user.controller")

const router = Router()

router.post("/register",register)
router.get("/verify/:token",verify)
router.post("/login",login)
router.get("/profile/:userId",getUser)
router.put("/profile/:userId",updateProfile)
router.get("/users/:userId",getConnections)

module.exports = router