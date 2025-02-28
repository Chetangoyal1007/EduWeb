
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.use("/api/auth", authRoutes);
const testData = {
  1: {
    title: "JavaScript",
    questions: [
      { type: "mcq", text: "What does `typeof null` return?", options: ["null", "undefined", "object", "string"], answer: "object" },
      { type: "coding", text: "Write a function to reverse a string." }
    ],
  },

2: {
    title: "Python",
    questions: [
      { type: "mcq", text: "What does `typeof null` return?", options: ["null", "undefined", "object", "string"], answer: "object" },
      { type: "coding", text: "Write a function to reverse a string." }
    ],
  },
};

app.get("/api/tests/:testId", (req, res) => {
  const { testId } = req.params;
  const test = testData[testId];
  if (test) {
    res.json(test);
  } else {
    res.status(404).json({ error: "Test not found" });
  }
});

app.post("/api/submit-test", (req, res) => {
  console.log("Received test results:", req.body);
  res.json({ message: "Test submitted successfully" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
