import React, { useEffect, useState } from "react";

const AdminManageExams = () => {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);

  const fetchExams = async () => {
    const res = await fetch("http://localhost:5000/api/exams");
    const data = await res.json();
    setExams(data);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    await fetch(`http://localhost:5000/api/exams/${id}`, {
      method: "DELETE",
    });
    setExams(exams.filter((e) => e._id !== id));
  };

  const handleEdit = (exam) => {
    setEditingExam(JSON.parse(JSON.stringify(exam))); // deep copy
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...editingExam.questions];
    updated[index][field] = value;
    setEditingExam({ ...editingExam, questions: updated });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...editingExam.questions];
    updated[qIndex].options[oIndex] = value;
    setEditingExam({ ...editingExam, questions: updated });
  };

  const addQuestion = () => {
    const newQuestion = {
      type: "mcq",
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: 1,
    };
    setEditingExam({ ...editingExam, questions: [...editingExam.questions, newQuestion] });
  };

  const removeQuestion = (index) => {
    const updated = [...editingExam.questions];
    updated.splice(index, 1);
    setEditingExam({ ...editingExam, questions: updated });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/exams/${editingExam._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingExam),
    });
    alert("Exam updated!");
    setEditingExam(null);
    fetchExams();
  };
  return (
    <div className="p-10 max-w-5xl mx-auto text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Exams</h1>

      {editingExam && (
        <div className="bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl mb-2">Editing Exam</h2>
          <input
            className="border p-2 w-full mb-4 text-black"
            value={editingExam.title}
            onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })}
          />

          {editingExam.questions.map((q, i) => (
            <div key={i} className="bg-gray-700 p-4 mb-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <select
                  value={q.type}
                  onChange={(e) => updateQuestion(i, "type", e.target.value)}
                  className="border p-1 text-black"
                >
                  <option value="mcq">MCQ</option>
                  <option value="coding">Coding</option>
                </select>
                <button
                  className="bg-red-600 px-2 py-1 text-sm rounded"
                  onClick={() => removeQuestion(i)}
                >
                  Delete
                </button>
              </div>

              <input
                className="border p-2 w-full mb-2 text-black"
                placeholder="Question Text"
                value={q.text}
                onChange={(e) => updateQuestion(i, "text", e.target.value)}
              />

              <input
                type="number"
                min="1"
                className="border p-2 w-full mb-2 text-black"
                placeholder="Marks"
                value={q.marks || 1}
                onChange={(e) => updateQuestion(i, "marks", Number(e.target.value))}
              />

              {q.type === "mcq" && (
                <div>
                  {q.options.map((opt, j) => (
                    <input
                      key={j}
                      className="border p-2 w-full mb-2 text-black"
                      placeholder={`Option ${j + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(i, j, e.target.value)}
                    />
                  ))}
                  <input
                    className="border p-2 w-full mb-2 text-black"
                    placeholder="Correct Answer"
                    value={q.answer}
                    onChange={(e) => updateQuestion(i, "correctAnswer", e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}

          <button
            className="bg-green-600 px-4 py-2 rounded text-white mr-2"
            onClick={addQuestion}
          >
            Add Question
          </button>

          <button
            className="bg-blue-600 px-4 py-2 rounded text-white mr-2"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-600 px-4 py-2 rounded text-white"
            onClick={() => setEditingExam(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Exam List */}
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">Title</th>
            <th className="p-3">Questions</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id} className="border-t border-gray-700 hover:bg-gray-800">
              <td className="p-3">{exam.title}</td>
              <td className="p-3">{exam.questions?.length || 0}</td>
              <td className="p-3 space-x-2">
                <button
                  className="bg-yellow-500 px-3 py-1 rounded text-sm"
                  onClick={() => handleEdit(exam)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded text-sm"
                  onClick={() => handleDelete(exam._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageExams;
