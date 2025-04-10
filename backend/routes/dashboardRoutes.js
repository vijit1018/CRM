const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const { verifyToken, authorizeRoles } = require("../middleware/autMiddleware");

router.get("/", verifyToken, authorizeRoles("admin"), getDashboardStats);

module.exports = router;
