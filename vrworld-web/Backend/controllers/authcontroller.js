import User from "../models/user.js"; // Ensure this path is correct based on your project structure
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/auth/signup
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
 if (!name || !email || !password) {
  return res.status(400).json({ success: false, message: "All fields are required" });
}

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({ success: true, token, role: newUser.role,name:newUser.name });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.json({ success: true, token, role: user.role,name:user.name });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { signup, login };