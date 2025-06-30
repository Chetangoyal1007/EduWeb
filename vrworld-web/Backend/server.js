
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exams");
const resultRoutes=require("./routes/submittest");
const runCodeRoute = require("./routes/runcode");



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
app.use("/api/exams", examRoutes);
app.use("/api/results",resultRoutes);
app.use("/api/runcode", runCodeRoute);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
