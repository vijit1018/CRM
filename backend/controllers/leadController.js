const Lead = require("../models/Lead");

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ createdBy: req.user.id });
  res.json(leads);
  }
  catch(error) {
    res.status(500).json({ message: "Server error" });
    console.error('Unable to get leads', error);
  }
  
};

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body;
    const lead = await Lead.create({ name, email, phone, address, status, createdBy: req.user.id });
    res.status(201).json(lead);
  }
  catch(error){
    res.status(500).json({ message: "Server error" });
    console.error('Unable to create leads', error);
  }
};

exports.updateAddress = async (req, res) => {
  try{
    const { id } = req.params;
    const { address } = req.body;
    const lead = await Lead.findOneAndUpdate({ _id: id, createdBy: req.user.id }, { address }, { new: true });
    res.json(lead);

  } catch(error) {
    res.status(500).json({ message: "Server error" });
    console.error('Unable to update leads', error);
  }
};

exports.deleteLead = async (req, res) => {
  try{
    const { id } = req.params;
    await Lead.findOneAndDelete({ _id: id, createdBy: req.user.id });
    res.json({ message: "Lead deleted" });
  } catch(error){
    res.status(500).json({ message: "Server error" });
    console.error('Unable to delete leads', error);
  }
};

exports.updateStatus = async (req, res) => {
  try{
    const { id } = req.params;
    const { status, response } = req.body;
    const lead = await Lead.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { status, response, callDate: new Date() },
      { new: true }
  );
  res.json(lead);

  } catch(error){
    res.status(500).json({ message: "Server error" });
    console.error('Unable to Update lead status', error);
  }
};