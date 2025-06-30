import express from "express"; // Ensure you have express installed and imported
import fs from "fs";
import path from "path"; // Ensure you have path module imported
import { exec } from "child_process"; // Ensure you have child_process module imported

const router = express.Router();

router.post("/", async (req, res) => {
  const { code, testCases } = req.body;

  if (!code || !Array.isArray(testCases)) {
    return res.status(400).json({ error: "Invalid payload." });
  }

  const tempDir = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const timestamp = Date.now();
  const codeFilePath = path.join(tempDir, `code-${timestamp}.js`);
  fs.writeFileSync(codeFilePath, code);

  const results = [];

  for (const testCase of testCases) {
    const { input, expectedOutput } = testCase;

    const testCode = `
      (async () => {
        try {
          const userFunc = require("${codeFilePath.replace(/\\/g, "\\\\")}");
          const output = await userFunc(...${JSON.stringify(input)});
          if (JSON.stringify(output) === JSON.stringify(${JSON.stringify(expectedOutput)})) {
            console.log("PASS");
          } else {
            console.log("FAIL");
          }
        } catch (e) {
          console.log("FAIL");
        }
      })();
    `;

    const testFilePath = path.join(tempDir, `test-${timestamp}-${Math.random()}.js`);
    fs.writeFileSync(testFilePath, testCode);

    try {
      const result = await new Promise((resolve) => {
        exec(`node ${testFilePath}`, { timeout: 3000 }, (err, stdout) => {
          resolve(stdout.includes("PASS"));
        });
      });
      results.push(result);
    } catch {
      results.push(false);
    }

    fs.unlinkSync(testFilePath);
  }

  fs.unlinkSync(codeFilePath);

  res.json({ results });
});

module.exports = router;
