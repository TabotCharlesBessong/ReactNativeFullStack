const Router = require("express");
const {
  requestConnection,
  getConnectionRequest,
  acceptRequest,
  getUserConnections,
} = require("../controllers/connection.controller");

const router = Router();

router.post("/request", requestConnection);
router.get("/request/:userId", getConnectionRequest);
router.post("/request/accept",acceptRequest)
router.get("/:userId",getUserConnections)

module.exports = router;
