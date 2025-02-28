import React from "react";
import { useLocation } from "react-router-dom";

const Certificate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentName = queryParams.get("name") || "Student";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black dark:text-white p-6">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl border-4 border-yellow-500 dark:border-yellow-600 p-10 text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          Certificate of Completion
        </h1>
        <p className="text-lg mt-6 dark:text-gray-300">This is proudly presented to</p>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">{studentName}</h2>
        <p className="text-lg mt-2 dark:text-gray-300">for successfully completing the test.</p>

        {/* Certificate Design Elements */}
        <div className="border-t-2 border-gray-300 dark:border-gray-600 w-3/4 mx-auto my-6"></div>
        <p className="text-gray-500 dark:text-gray-400 italic">
          Awarded on {new Date().toLocaleDateString()}
        </p>

        {/* Signature Section */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-left">
            <p className="font-bold text-gray-800 dark:text-gray-300">Instructor</p>
            <div className="h-0.5 bg-gray-400 dark:bg-gray-600 w-40 mt-2"></div>
            <p className="text-gray-600 dark:text-gray-400">EduWeb Team</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-800 dark:text-gray-300">Authorized Seal</p>
            <div className="h-20 w-20 border-2 border-yellow-500 dark:border-yellow-600 rounded-full flex items-center justify-center text-yellow-500 dark:text-yellow-400 text-2xl font-bold">
              🏅
            </div>
          </div>
        </div>
      </div>

      {/* Print Certificate Button */}
      <button
        onClick={printCertificate}
        className="mt-6 bg-blue-500 dark:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
      >
        Print Certificate
      </button>
    </div>
  );
};

const printCertificate = () => {
  let studentName = prompt("Enter the student's name:", "Student");

  // If the user cancels the prompt, stop execution
  if (!studentName || studentName.trim() === "") {
    alert("Student name is required to print the certificate.");
    return;
  }

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html>
      <head>
        <title>Certificate - ${studentName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: ${isDarkMode ? "#1a202c" : "#ffffff"};
            color: ${isDarkMode ? "#ffffff" : "#000000"};
          }
          .certificate {
            border: 4px solid ${isDarkMode ? "#d4af37" : "#ffd700"};
            padding: 30px;
            width: 700px;
            margin: auto;
            background-color: ${isDarkMode ? "#2d3748" : "#ffffff"};
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: ${isDarkMode ? "#63b3ed" : "#1e40af"};
          }
          .divider {
            height: 2px;
            background-color: ${isDarkMode ? "#ffffff" : "#000000"};
            width: 80%;
            margin: 20px auto;
          }
          .seal {
            border: 2px solid ${isDarkMode ? "#d4af37" : "#ffd700"};
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: ${isDarkMode ? "#d4af37" : "#ffbf00"};
            margin: auto;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1 class="title">🎓 Certificate of Completion</h1>
          <p>This is proudly presented to</p>
          <h2 style="font-size: 24px; font-weight: bold;">${studentName}</h2>
          <p>for successfully completing the test.</p>
          <div class="divider"></div>
          <p><strong>Awarded on:</strong> ${new Date().toLocaleDateString()}</p>
          <div class="divider"></div>
          <div style="display: flex; justify-content: space-between; padding: 20px;">
            <div style="text-align: left;">
              <p style="font-weight: bold;">Instructor</p>
              <div style="border-top: 2px solid gray; width: 150px; margin-top: 10px;"></div>
              <p>EduWeb Team</p>
            </div>
            <div class="seal">🏅</div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 1000);
          }
        </script>
      </body>
    </html>
  `);
  newWindow.document.close();
};

export default Certificate;
