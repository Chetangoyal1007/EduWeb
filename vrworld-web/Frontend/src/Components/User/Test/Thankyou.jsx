import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useReactToPrint } from "react-to-print";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentName = queryParams.get("name") || "Student";

  const certificateRef = useRef(); // Reference for printing the certificate
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: "Certificate",
  });

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const timer = setTimeout(() => {
      navigate("/"); // Change to your home/dashboard route
    }, 10000); // Redirect after 10 seconds instead of 5 for visibility

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black dark:text-white p-6 relative">
      {/* Confetti Effect */}
      {windowSize.width > 0 && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold text-blue-500">🎉 Thank You! 🎉</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          You have successfully submitted your test.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Your results will be available soon.
        </p>

        
        {/* Go to Dashboard Button */}
        <button
  onClick={() => navigate(`/certificate?name=${studentName}`)}
  className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
>
  🎓 View Certificate
</button>

      </div>

      {/* Certificate for Printing */}
      <div className="hidden">
        <div ref={certificateRef} className="w-[600px] p-10 bg-white text-center border border-gray-300 shadow-lg">
          <h1 className="text-4xl font-bold">Certificate of Completion</h1>
          <p className="text-lg mt-4">This is to certify that</p>
          <h2 className="text-3xl font-semibold text-blue-600 mt-2">
            {studentName}
          </h2>
          <p className="text-lg mt-4">has successfully completed the test.</p>
          <div className="mt-8 flex justify-between text-lg">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Instructor: EduWeb Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
