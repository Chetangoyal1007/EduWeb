import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("username");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch("https://eduwebbackend.netlify.app//api/results");
      const data = await res.json();
      const filtered = data.filter((r) => r.user === user);
      setResults(filtered);
    } catch (err) {
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (percentage) => {
    if (percentage >= 75) return "text-green-500";
    if (percentage >= 50) return "text-yellow-400";
    return "text-red-500";
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading your results...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 px-4 md:px-10">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700 dark:text-blue-400">
        📈 Student Performance Dashboard
      </h2>

      {results.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't completed any tests yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((result) => {
            const percentage = ((result.score / result.total) * 100).toFixed(2);
            return (
              <div
                key={result._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-bold mb-2">{result.testTitle}</h3>
                <p>
                  <span className="font-medium">Score:</span> {result.score}/{result.total}
                </p>
                <p className={`font-semibold ${getColor(percentage)}`}>
                  <span className="font-medium">Percentage:</span> {percentage}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Submitted on: {new Date(result.submittedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
