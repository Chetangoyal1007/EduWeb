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
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) requestFullScreen();
  });

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
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user", // Ensures front camera usage
        }
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
  
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play(); // Ensures video playback starts
      }
  
      cameraStreamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  
    
  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
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
    setIsSubmitted(true);
    stopCamera();
    exitFullScreen();

    try {
      await fetch("http://localhost:5000/api/submit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, answers: mcqAnswers, codeAnswer }),
      });
      console.log("Test submitted successfully");
    } catch (error) {
      console.error("Error submitting test:", error);
    }

    setTimeout(() => navigate("/Thankyou"), 2000);
  };

  if (!test || !test.questions) return <div className="text-center mt-10 text-xl">Loading test...</div>;

  return (
    <div ref={testContainerRef} className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{test.title} Test</h1>
      <p className="text-red-600 font-semibold text-lg mb-2">
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>
      <p className="mb-4 text-lg font-medium">
        Question {currentQuestionIndex + 1} of {test.questions.length}
      </p>

      {/* Question Text */}
      <p className="text-lg font-semibold mb-2">
  {test.questions[currentQuestionIndex].text}
</p>
<p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
  <strong>Marks:</strong> {test.questions[currentQuestionIndex].marks}
</p>


      {/* Render MCQ Options if the question type is MCQ */}
      {test.questions[currentQuestionIndex].type === "mcq" && (
        <div className="flex flex-col mt-4 space-y-2">
          {test.questions[currentQuestionIndex].options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={mcqAnswers[currentQuestionIndex] === option}
                onChange={() => setMcqAnswers({ ...mcqAnswers, [currentQuestionIndex]: option })}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* Render Monaco Editor for coding questions */}
      {test.questions[currentQuestionIndex].type === "coding" && (
        <div className="w-full mt-4">
          <Editor
            height="400px"
            defaultLanguage="javascript"
            defaultValue={codeAnswer}
            onChange={(value) => setCodeAnswer(value)}
            theme="vs-dark"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-md text-white ${currentQuestionIndex === 0 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Previous
        </button>

        {currentQuestionIndex < test.questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Submit Test
          </button>
        )}
      </div>

      {/* Camera */}
      {/* Camera */}
{cameraActive && (
  <div
    className="fixed cursor-move"
    style={{
      top: cameraPosition.top,
      right: cameraPosition.right,
      zIndex: 9999, // Ensure it's above other content
    }}
    onMouseMove={handleDragCamera}
  >
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-32 h-32 rounded-full border-2 border-blue-500"
      style={{
        objectFit: "cover", // Make sure the video fits the container without distortion
        backgroundColor: "black", // Ensures it's visible when the camera feed is loading
      }}
    />
  </div>
)}

    </div>
  );
};

export default TestPage;
