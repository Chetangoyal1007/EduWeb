
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [codeAnswer, setCodeAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leaveWarnings, setLeaveWarnings] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState({ top: 10, right: 10 });
  const user = localStorage.getItem("username");
  const testContainerRef = useRef(null);
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  useEffect(() => {
    fetchTest();
    requestFullScreen();
    startCamera();

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopCamera();
      exitFullScreen();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [testId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchTest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/exams/${testId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTest(data);
    } catch (error) {
      console.error("Error fetching test data:", error.message);
    }
  };

  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "You have an ongoing test. Are you sure you want to leave?";
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setLeaveWarnings((prev) => {
        const newWarnings = prev + 1;
        if (newWarnings >= 3) {
          alert("You have left the test too many times. Submitting now.");
          handleSubmit();
        } else {
          alert(`Warning ${newWarnings}/3: Leaving the test is not allowed!`);
        }
        return newWarnings;
      });
    }
  };

  const startCamera = async () => {
    try {
      const constraints = {
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      cameraStreamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      const tracks = cameraStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }

      cameraStreamRef.current = null;
      setCameraActive(false);
    }
  };

  const handleDragCamera = (event) => {
    setCameraPosition({ top: event.clientY - 50, right: window.innerWidth - event.clientX - 50 });
  };

  const handleNextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;

    stopCamera();
    exitFullScreen();
    setIsSubmitted(true);

    const answers = test.questions.map((q, index) => {
      if (q.type === "mcq") {
        return mcqAnswers[index] || "";
      } else if (q.type === "coding") {
        return codeAnswer || "";
      } else {
        return "";
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, answers, user }),
      });

      if (!response.ok) throw new Error("Failed to submit test");

      const resultData = await response.json();
      console.log("Test submitted successfully", resultData);

      // Redirect to certificate page with score
      navigate(
        `/certificate?name=${encodeURIComponent(user)}&score=${resultData.score}&total=${resultData.total}`
      );
      
      
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (!test || !test.questions) return <div className="text-center mt-10 text-xl">Loading test...</div>;

  return (
    <div
      ref={testContainerRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white flex flex-col items-center justify-start p-6"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 dark:text-blue-400">
          {test.title} Test
        </h1>
  
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden mb-6">
          <div
            className="bg-red-500 h-3 transition-all duration-500"
            style={{ width: `${(timeLeft / 1800) * 100}%` }}
          />
        </div>
  
        <p className="text-center text-lg mb-2 font-semibold">
          ⏳ Time Left:{" "}
          <span className="text-red-600">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </p>
  
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Question {currentQuestionIndex + 1} of {test.questions.length}
        </p>
  
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">{test.questions[currentQuestionIndex].text}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Marks:</strong> {test.questions[currentQuestionIndex].marks}
          </p>
  
          {test.questions[currentQuestionIndex].type === "mcq" && (
            <div className="space-y-3">
              {test.questions[currentQuestionIndex].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-all border hover:border-blue-500 ${
                    mcqAnswers[currentQuestionIndex] === option
                      ? "ring-2 ring-blue-400"
                      : "border-transparent"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={mcqAnswers[currentQuestionIndex] === option}
                    onChange={() => setMcqAnswers({ ...mcqAnswers, [currentQuestionIndex]: option })}
                    className="form-radio h-4 w-4 text-blue-600 mr-3"
                  />
                  <span className="text-base">{option}</span>
                </label>
              ))}
            </div>
          )}
  
          {test.questions[currentQuestionIndex].type === "coding" && (
            <div className="mt-4 border rounded overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="javascript"
                defaultValue={codeAnswer}
                onChange={(value) => setCodeAnswer(value)}
                theme="vs-dark"
              />
            </div>
          )}
        </div>
  
        <div className="flex justify-between items-center mt-8 space-x-4">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              currentQuestionIndex === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            ⬅ Previous
          </button>
          {currentQuestionIndex < test.questions.length - 1 ? (
  <button
    onClick={handleNextQuestion}
    disabled={
      test.questions[currentQuestionIndex].type === "mcq"
        ? !mcqAnswers[currentQuestionIndex]
        : test.questions[currentQuestionIndex].type === "coding" && !codeAnswer.trim()
    }
    className={`px-6 py-2 rounded-lg text-white font-medium transition ${
      (test.questions[currentQuestionIndex].type === "mcq" &&
        !mcqAnswers[currentQuestionIndex]) ||
      (test.questions[currentQuestionIndex].type === "coding" &&
        !codeAnswer.trim())
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    Next ➡
  </button>
) : (
  <button
    onClick={handleSubmit}
    className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
  >
    ✅ Submit Test
  </button>
)}

        </div>
      </div>
  
      {cameraActive && (
        <div
          className="fixed cursor-move"
          style={{
            top: cameraPosition.top,
            right: cameraPosition.right,
            zIndex: 9999,
          }}
          onMouseMove={handleDragCamera}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
            style={{ objectFit: "cover", backgroundColor: "black" }}
          />
        </div>
      )}
    </div>
  );
  
};

export default TestPage;
