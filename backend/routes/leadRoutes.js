const express = require("express");
const router = express.Router();
const {
  getLeads, createLead, updateAddress, deleteLead, updateStatus
} = require("../controllers/leadController");
const { verifyToken, authorizeRoles } = require("../middleware/autMiddleware");

router.use(verifyToken, authorizeRoles("telecaller"));

router.get("/", getLeads);
router.post("/", createLead);
router.put("/:id/address", updateAddress);
router.delete("/:id", deleteLead);
router.put("/:id/status", updateStatus);

module.exports = router;
