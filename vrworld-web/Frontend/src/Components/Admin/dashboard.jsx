import React, { useState } from "react";
import AdminCreateExam from "./AdminCreateExam";
import AdminManageExams from "./AdminManageExams";
import AdminResultViewer from "./Results";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === "create" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Exam
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === "manage" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("manage")}
            >
              Manage Exams
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === "results" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("results")}
            >
              View Results
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        {activeTab === "create" && <AdminCreateExam />}
        {activeTab === "manage" && <AdminManageExams />}
        {activeTab === "results" && <AdminResultViewer />}
      </div>
    </div>
  );
};

export default AdminDashboard;
