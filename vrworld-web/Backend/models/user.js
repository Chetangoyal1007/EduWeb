import mongoose from "mongoose"; // Ensure you have mongoose installed and imported

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
