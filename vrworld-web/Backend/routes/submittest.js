const express = require("express");
const router = express.Router();
const Test = require("../models/Exam");
const Result = require("../models/Result");

router.post("/", async (req, res) => {
  const { testId, answers, user } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    const details = [];

    test.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = question.correctAnswer === userAnswer;

      if (isCorrect) {
        score += question.marks;
      }

      details.push({
        question: question.text,
        type: question.type,
        userAnswer,
        correctAnswer: question.correctAnswer,
        correct: isCorrect,
        marksAwarded: isCorrect ? question.marks : 0,
      });
    });

    const totalMarks = test.questions.reduce((acc, q) => acc + q.marks, 0);

    const result = new Result({
      user, // frontend expects a 'user' string or id
      testTitle: test.title,
      score,
      total: totalMarks,
      submittedAt: new Date(),
      details,
    });

    await result.save();

    res.status(200).json({ message: "Test submitted", score, resultId: result._id });
  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Get all submitted results
router.get("/", async (req, res) => {
  try {
    const results = await Result.find().sort({ submittedAt: -1 });
    res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Failed to retrieve results" });
  }
});


module.exports = router;
