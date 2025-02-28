import React from "react";
import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "Data Structures & Algorithms", description: "Learn about arrays, linked lists, trees, and more." },
  { id: 2, title: "Web Development", description: "Master HTML, CSS, JavaScript, and modern frameworks." },
  { id: 3, title: "Machine Learning", description: "Explore supervised and unsupervised learning techniques." },
  { id: 4, title: "Cyber Security", description: "Understand ethical hacking, cryptography, and security protocols." },
  { id: 5, title: "Database Management", description: "Learn SQL, NoSQL, and database optimization techniques." }
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-white p-10 flex flex-col items-center">
       <h1 className="text-4xl font-semibold">
            Computer Science <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Course</span>
          </h1><br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {courses.map(course => (
          <div 
            key={course.id} 
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
            <Link 
              to={`/cart?courseId=${course.id}`} 
              className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Buy Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
