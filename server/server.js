require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Lead = require("./models/Lead");
const dns = require("dns");

// FORCE DIRECT IPV4 LOOKUP (Bypasses local router SRV blocks)
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

const app = express();

app.use(cors());
app.use(express.json());

console.log("Connecting to local MongoDB instance...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    console.log("Database Connection Error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});
app.post("/addLead", async (req, res) => {
  try {
    const lead = new Lead(req.body);

    await lead.save();

    res.status(201).json({
      message: "Lead Added Successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding lead",
      error,
    });
  }
});
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find();

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leads",
      error,
    });
  }
});
app.put("/updateLead/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Lead Updated Successfully",
      updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating lead",
      error,
    });
  }
});
app.delete("/deleteLead/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting lead",
      error,
    });
  }
});
app.listen(5000, () => {
  console.log("Server running smoothly on port 5000");
});