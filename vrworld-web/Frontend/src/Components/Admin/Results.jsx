
import React, { useEffect, useState } from "react";

const AdminResultViewer = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch("https://eduwebbackend.onrender.com/api/results");
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading results...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Test Results</h2>
      <table className="min-w-full bg-white border dark:bg-gray-900 dark:text-white">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Test</th>
            <th className="px-4 py-2 border">Score</th>
            <th className="px-4 py-2 border">Total Marks</th>
            <th className="px-4 py-2 border">Percentage</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            const percentage = result.total > 0 ? ((result.score / result.total) * 100).toFixed(2) : 0;
            const passed = percentage >= 40;

            return (
              <tr key={result._id}>
                <td className="border px-4 py-2">{result.user}</td>
                <td className="border px-4 py-2">{result.testTitle}</td>
                <td className="border px-4 py-2">{result.score}</td>
                <td className="border px-4 py-2">{result.total}</td>
                <td className="border px-4 py-2">{percentage}%</td>
                <td className={`border px-4 py-2 font-bold ${passed ? "text-green-600" : "text-red-600"}`}>
                  {passed ? "Passed" : "Failed"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(result.submittedAt).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResultViewer;
