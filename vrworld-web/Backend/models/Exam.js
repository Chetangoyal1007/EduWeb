import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["mcq", "coding"], required: true },
  options: { type: [String], default: [] }, // Only relevant for MCQ
  correctAnswer: { type: String }, // ✅ Make sure this exists
  marks: { type: Number, default: 1 },
  description: { type: String }, // Only relevant for coding questions
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ], // Only relevant for coding questions
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Exam", examSchema);
