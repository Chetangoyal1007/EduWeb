import React, { useState } from "react";

const AdminCreateExam = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "mcq",
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, questions }),
      });
      if (response.ok) {
        alert("Exam created!");
        setTitle("");
        setQuestions([]);
      } else {
        alert("Failed to create exam.");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating exam.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Create New Exam</h1>

      <input
        className="border p-2 w-full mb-6 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        placeholder="Exam Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div
          key={i}
          className="border p-4 mb-6 rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
        >
          <select
            value={q.type}
            onChange={(e) => updateQuestion(i, "type", e.target.value)}
            className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="mcq">MCQ</option>
            <option value="coding">Coding</option>
          </select>

          <input
            className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Question Text"
            value={q.text}
            onChange={(e) => updateQuestion(i, "text", e.target.value)}
          />

          <input
            type="number"
            min="1"
            className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Marks"
            value={q.marks}
            onChange={(e) => updateQuestion(i, "marks", Number(e.target.value))}
          />

          {q.type === "mcq" && (
            <div>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  className="border p-2 w-full mb-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(i, j, e.target.value)}
                />
              ))}
              <input
                className="border p-2 w-full mt-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => updateQuestion(i, "correctAnswer", e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={addQuestion}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Exam
        </button>
      </div>
    </div>
  );
};

export default AdminCreateExam;
