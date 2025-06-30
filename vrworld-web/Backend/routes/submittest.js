import express from "express"; // Ensure you have express installed and imported
const router = express.Router();
import Test from "../models/Exam.js"; // Adjust the path as necessary
import Result from "../models/Result.js"; // Adjust the path as necessary

// Submit Test and Save Result
router.post("/", async (req, res) => {
  const { testId, answers, user } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    const details = [];

    // Loop through questions and evaluate answers
    test.questions.forEach((question, index) => {
      const userAnswer = answers[index] || "";
      const isCorrect =
        question.type === "mcq" && question.correctAnswer === userAnswer;

      const marksAwarded = isCorrect ? question.marks : 0;
      if (isCorrect) score += marksAwarded;

      details.push({
        question: question.text,
        type: question.type,
        userAnswer,
        correctAnswer: question.correctAnswer || "",
        correct: isCorrect,
        marksAwarded,
      });
    });

    // Calculate total marks
    const totalMarks = test.questions.reduce((sum, q) => sum + q.marks, 0);

    // Create and save result
    const result = new Result({
      user,
      testTitle: test.title,
      score,
      total: totalMarks,
      submittedAt: new Date(),
      details,
    });

    await result.save();

    res.status(200).json({
      message: "Test submitted successfully",
      score,
      total: totalMarks,
      resultId: result._id,
    });
    console.log("Returned Total:", totalMarks, "Type:", typeof totalMarks);

  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All Submitted Results
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
