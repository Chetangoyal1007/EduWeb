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
  const [toastMessage, setToastMessage] = useState("");

  const user = localStorage.getItem("username");
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  const centerRef = useRef(null);
  const [centerWidth, setCenterWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchTest();
    requestFullScreen();
    startCamera();

    const handleEvents = (e) => {
      if (
        (e.ctrlKey && ["u", "c", "s"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        showToast("Action blocked for test security.");
      }
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText("Screenshots are disabled!");
        showToast("Screenshot attempt blocked.");
      }
    };

    const preventRightClick = (e) => {
      e.preventDefault();
      showToast("Right-click disabled during test.");
    };

    const preventCopy = (e) => {
      e.preventDefault();
      showToast("Copying is not allowed.");
    };

    window.addEventListener("keydown", handleEvents);
    window.addEventListener("contextmenu", preventRightClick);
    window.addEventListener("copy", preventCopy);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", () => setIsDragging(false));

    return () => {
      stopCamera();
      exitFullScreen();
      window.removeEventListener("keydown", handleEvents);
      window.removeEventListener("contextmenu", preventRightClick);
      window.removeEventListener("copy", preventCopy);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", () => setIsDragging(false));
    };
  }, [testId]);

  const fetchTest = async () => {
    const res = await fetch(`http://localhost:5000/api/exams/${testId}`);
    const data = await res.json();
    setTest(data);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const requestFullScreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "You have an ongoing test. Are you sure you want to leave?";
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setLeaveWarnings((prev) => {
        const newWarnings = prev + 1;
        if (newWarnings >= 3) {
          alert("You left the test too many times. Submitting now.");
          handleSubmit();
        } else {
          alert(`Warning ${newWarnings}/3: Leaving the tab is not allowed.`);
        }
        return newWarnings;
      });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      cameraStreamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    stopCamera();
    exitFullScreen();

    const answers = test.questions.map((q, i) =>
      q.type === "mcq" ? mcqAnswers[i] || "" : codeAnswer || ""
    );

    try {
      const res = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, answers, user }),
      });

      const result = await res.json();
      navigate(
        `/certificate?name=${encodeURIComponent(user)}&score=${result.score}&total=${result.total}`
      );
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResize = (e) => {
    if (!isDragging) return;
    const percent = (e.clientX / window.innerWidth) * 100;
    if (percent > 20 && percent < 70) setCenterWidth(percent);
  };

  const currentQuestion = test?.questions[currentQuestionIndex];

  if (!test) return <div className="text-center mt-10 text-xl">Loading test...</div>;

  return (
    <div className="min-h-screen flex text-black dark:text-white bg-white dark:bg-black select-none">
      {/* Left - Question Numbers */}
      <div className="w-[15%] bg-gray-100 dark:bg-gray-800 p-4">
        <h2 className="text-lg font-bold text-center text-blue-600 mb-4">Questions</h2>
        <ul className="space-y-2">
          {test.questions.map((_, idx) => (
            <li
              key={idx}
              className={`text-center px-3 py-2 rounded ${
                idx === currentQuestionIndex
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Q{idx + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Center - Question Panel */}
      <div
        ref={centerRef}
        className="bg-gray-50 dark:bg-gray-900 p-6 overflow-y-auto"
        style={{ width: `${centerWidth}%` }}
      >
        <div className="text-right text-lg mb-4 text-red-600 font-bold">
          ⏳ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
        <p className="text-sm text-gray-500 mb-1">
          Question {currentQuestionIndex + 1} of {test.questions.length}
        </p>
        <h2 className="text-xl font-semibold mb-2">{currentQuestion.text}</h2>
        <p className="text-sm text-gray-500">Marks: {currentQuestion.marks}</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestionIndex((i) => i - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            ⬅ Previous
          </button>
          {currentQuestionIndex < test.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((i) => i + 1)}
              disabled={
                currentQuestion.type === "mcq"
                  ? !mcqAnswers[currentQuestionIndex]
                  : !codeAnswer.trim()
              }
              className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
            >
              Next ➡
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              ✅ Submit
            </button>
          )}
        </div>
      </div>

      {/* Resizer */}
      <div
        onMouseDown={() => setIsDragging(true)}
        className="w-2 bg-gray-400 dark:bg-gray-600 cursor-col-resize flex flex-col items-center justify-center"
      >
        <div className="w-1 h-1 bg-white rounded-full my-1" />
        <div className="w-1 h-1 bg-white rounded-full my-1" />
        <div className="w-1 h-1 bg-white rounded-full my-1" />
      </div>

      {/* Right - Answer Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4 text-blue-600 text-center">Your Answer</h2>
        {currentQuestion.type === "mcq" ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 border ${
                  mcqAnswers[currentQuestionIndex] === option
                    ? "ring-2 ring-blue-400"
                    : "border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  checked={mcqAnswers[currentQuestionIndex] === option}
                  onChange={() =>
                    setMcqAnswers({ ...mcqAnswers, [currentQuestionIndex]: option })
                  }
                  className="form-radio h-4 w-4 text-blue-600 mr-3"
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={codeAnswer}
            onChange={(val) => setCodeAnswer(val)}
            theme="vs-dark"
          />
        )}
      </div>

      {/* Camera Feed */}
      {cameraActive && (
        <div className="fixed top-4 right-4 z-[10000]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded shadow-lg z-[10001] animate-pulse">
    {toastMessage}
  </div>
)}

    </div>
  );
};

export default TestPage;
