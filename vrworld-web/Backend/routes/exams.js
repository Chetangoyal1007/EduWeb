import express from "express"; // Ensure you have express installed and imported
const router = express.Router();
import Exam from "../models/Exam.js"; // Adjust the path as necessary

// Create a new exam
router.post("/", async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exams" });
  }
});

// Get a specific exam by ID
router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// Update an exam by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExam) return res.status(404).json({ error: "Exam not found" });

    res.json(updatedExam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an exam by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) return res.status(404).json({ error: "Exam not found" });

    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

module.exports = router;
