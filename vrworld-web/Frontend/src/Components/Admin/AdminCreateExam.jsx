// import React, { useState } from "react";

// const AdminCreateExam = () => {
//   const [title, setTitle] = useState("");
//   const [questions, setQuestions] = useState([]);

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         type: "mcq",
//         text: "",
//         options: ["", "", "", ""],
//         correctAnswer: "",
//         marks: 1,
//       },
//     ]);
//   };

//   const updateQuestion = (index, field, value) => {
//     const updated = [...questions];
//     updated[index][field] = value;
//     setQuestions(updated);
//   };

//   const updateOption = (qIndex, oIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("https://edu-web-roan.vercel.app/api/exams", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, questions }),
//       });
//       if (response.ok) {
//         alert("Exam created!");
//         setTitle("");
//         setQuestions([]);
//       } else {
//         alert("Failed to create exam.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error creating exam.");
//     }
//   };

//   return (
//     <div className="min-h-screen p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
//       <h1 className="text-3xl font-bold mb-6">Create New Exam</h1>

//       <input
//         className="border p-2 w-full mb-6 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//         placeholder="Exam Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       {questions.map((q, i) => (
//         <div
//           key={i}
//           className="border p-4 mb-6 rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
//         >
//           <select
//             value={q.type}
//             onChange={(e) => updateQuestion(i, "type", e.target.value)}
//             className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="mcq">MCQ</option>
//             <option value="coding">Coding</option>
//           </select>

//           <input
//             className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             placeholder="Question Text"
//             value={q.text}
//             onChange={(e) => updateQuestion(i, "text", e.target.value)}
//           />

//           <input
//             type="number"
//             min="1"
//             className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             placeholder="Marks"
//             value={q.marks}
//             onChange={(e) => updateQuestion(i, "marks", Number(e.target.value))}
//           />

//           {q.type === "mcq" && (
//             <div>
//               {q.options.map((opt, j) => (
//                 <input
//                   key={j}
//                   className="border p-2 w-full mb-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   placeholder={`Option ${j + 1}`}
//                   value={opt}
//                   onChange={(e) => updateOption(i, j, e.target.value)}
//                 />
//               ))}
//               <input
//                 className="border p-2 w-full mt-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 placeholder="Correct Answer"
//                 value={q.correctAnswer}
//                 onChange={(e) => updateQuestion(i, "correctAnswer", e.target.value)}
//               />
//             </div>
//           )}
//         </div>
//       ))}

//       <div className="flex gap-4 mt-6">
//         <button
//           onClick={addQuestion}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Add Question
//         </button>

//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Create Exam
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminCreateExam;
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
        testCases: [], // Ensure testCases is initialized for all questions
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

  const addTestCase = (qIndex) => {
    const updated = [...questions];
    if (!updated[qIndex].testCases) updated[qIndex].testCases = [];
    updated[qIndex].testCases.push({ input: "", output: "" });
    setQuestions(updated);
  };

  const updateTestCase = (qIndex, tcIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].testCases[tcIndex][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      // Ensure coding questions have testCases even if they are empty
      const updatedQuestions = questions.map((q) => {
        if (q.type === "coding") {
          // Ensure coding questions only have 'description' and 'testCases'
          return {
            ...q,
            options: undefined,  // Remove options
            correctAnswer: undefined,  // Remove correctAnswer
            testCases: q.testCases || [],  // Ensure testCases is included (even if empty)
          };
        }
        return q;
      });

      const response = await fetch("https://edu-web-roan.vercel.app/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, questions: updatedQuestions }),
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
            onChange={(e) => {
              const newType = e.target.value;
              const updated = [...questions];
              updated[i].type = newType;

              if (newType === "coding") {
                updated[i].description = "";
                updated[i].testCases = [{ input: "", output: "" }];
                delete updated[i].options;
                delete updated[i].correctAnswer;
              } else {
                updated[i].options = ["", "", "", ""];
                updated[i].correctAnswer = "";
                delete updated[i].description;
                delete updated[i].testCases;
              }

              setQuestions(updated);
            }}
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

          {q.type === "coding" && (
            <div>
              <textarea
                className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Coding Question Description"
                value={q.description}
                onChange={(e) => updateQuestion(i, "description", e.target.value)}
              />

              <h3 className="font-semibold mb-2">Test Cases:</h3>
              {(q.testCases || []).map((tc, j) => (
                <div key={j} className="mb-3">
                  <input
                    className="border p-2 w-full mb-1 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={`Input ${j + 1}`}
                    value={tc.input}
                    onChange={(e) => updateTestCase(i, j, "input", e.target.value)}
                  />
                  <input
                    className="border p-2 w-full mb-1 rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={`Expected Output ${j + 1}`}
                    value={tc.output}
                    onChange={(e) => updateTestCase(i, j, "output", e.target.value)}
                  />
                </div>
              ))}
              <button
                className="bg-gray-600 text-white px-2 py-1 rounded mt-2"
                onClick={() => addTestCase(i)}
              >
                Add Test Case
              </button>
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
