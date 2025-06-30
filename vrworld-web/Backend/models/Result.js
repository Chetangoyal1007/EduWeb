import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Replace with ObjectId if you have user model
  testTitle: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  details: [
    {
      question: { type: String, required: true },
      type: { type: String, required: true }, // 'mcq' or 'coding'
      userAnswer: { type: String, required: true },
      correctAnswer: { type: String }, // Optional for coding
      correct: { type: Boolean, default: false },
      marksAwarded: { type: Number, required: true },
    }
  ],
});

module.exports = mongoose.model("Result", resultSchema);
