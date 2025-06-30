
import express from "express"; // Ensure you have express installed and imported
import mongoose from "mongoose"; // Ensure you have mongoose installed and imported
import cors from "cors"; // Ensure you have cors installed and imported
import dotenv from "dotenv"; // Ensure you have dotenv installed and imported
import authRoutes from "./routes/auth.js"; // Adjust the path as necessary
import examRoutes from "./routes/exams.js"; // Adjust the path as necessary
import resultRoutes from "./routes/submittest.js"; // Adjust the path as necessary
import runCodeRoute from "./routes/runcode.js"; // Adjust the path as necessary



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
