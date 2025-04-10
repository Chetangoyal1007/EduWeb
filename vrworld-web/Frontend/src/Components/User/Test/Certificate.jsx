import React from "react";
import { useLocation } from "react-router-dom";

const Certificate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const studentName = queryParams.get("name") || "Student";
  const rawScore = queryParams.get("score");
  const rawTotal = queryParams.get("total");

  const score = Number(rawScore);
  const total = rawTotal ? Number(rawTotal) : 0;


  console.log("CERTIFICATE DEBUG:", { score, total, rawScore, rawTotal });

  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black dark:text-white p-6">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl border-4 border-yellow-500 dark:border-yellow-600 p-10 text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          Certificate of Completion
        </h1>
        <p className="text-lg mt-6 dark:text-gray-300">This is proudly presented to</p>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">{studentName}</h2>
        <p className="text-lg mt-2 dark:text-gray-300">
          for successfully completing the test with a score of {score}/{total} ({percentage}%).
        </p>

        <div className="border-t-2 border-gray-300 dark:border-gray-600 w-3/4 mx-auto my-6"></div>
        <p className="text-gray-500 dark:text-gray-400 italic">
          Awarded on {new Date().toLocaleDateString()}
        </p>

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
  window.print();
};

export default Certificate;
