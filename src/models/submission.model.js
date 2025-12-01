const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  answers: Object,
  submittedAt: { 
  type: String,
  default: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
}
});

module.exports = mongoose.model("Submission", submissionSchema);
