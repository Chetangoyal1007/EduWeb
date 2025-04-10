const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["mcq", "coding"], required: true },
  options: { type: [String], default: [] }, // Only relevant for MCQ
  correctAnswer: { type: String }, // ✅ Make sure this exists
  marks: { type: Number, default: 1 },
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Exam", examSchema);
