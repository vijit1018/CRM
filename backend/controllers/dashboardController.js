const User = require("../models/User");
const Lead = require("../models/Lead");

exports.getDashboardStats = async (req, res) => {
  const totalTelecallers = await User.countDocuments({ role: "telecaller" });
  const totalCalls = await Lead.countDocuments({ status: "Connected" });
  const totalCustomers = await Lead.countDocuments();

  const connectedLeads = await Lead.find({ status: "Connected" })
    .populate("createdBy", "name")
    .sort({ callDate: -1 })
    .limit(10);

  const recentActivities = await Lead.find()
    .populate("createdBy", "name")
    .sort({ createdAt: -1 })
    .limit(10);

  res.json({
    totalTelecallers,
    totalCalls,
    totalCustomers,
    connectedLeads,
    recentActivities
  });
};