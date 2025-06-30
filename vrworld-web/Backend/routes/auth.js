import express from "express"; // Ensure you have express installed and imported
import { login, signup } from "../controllers/authcontroller.js"; // Adjust the path as necessary
const router = express.Router();

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/signup
router.post("/signup", signup);

module.exports = router;
