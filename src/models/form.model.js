const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Form", formSchema);
