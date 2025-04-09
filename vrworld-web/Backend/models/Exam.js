const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["mcq", "coding"], required: true },
  text: { type: String, required: true },
  options: [String], // Only for MCQs
  answer: String,    // Only for MCQs
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Exam", examSchema);
