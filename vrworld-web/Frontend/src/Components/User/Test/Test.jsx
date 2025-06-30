// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const CurrentTests = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     AOS.init({ once: true });
//     setIsDarkMode(document.documentElement.classList.contains("dark")); // Check dark mode state
//   }, []);

//   return (
//     <div className="py-16 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black dark:text-white duration-300">
//       <div className="container mx-auto px-6 sm:px-12 lg:px-20">
//         <div className="text-center mb-12" data-aos="fade-up">
//           <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
//             Current <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Tests</span>
//           </h1>
//           <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
//             Here is a list of your current tests.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
//           {[{
//             id: 1, title: "Java", color: "bg-purple-500", hoverColor: "hover:bg-purple-600"
//           }, {
//             id: 2, title: "Python", color: "bg-blue-500", hoverColor: "hover:bg-blue-600"
//           }, {
//             id: 3, title: "History", color: "bg-green-500", hoverColor: "hover:bg-green-600"
//           }, {
//             id: 4, title: "English", color: "bg-red-500", hoverColor: "hover:bg-red-600"
//           }].map(test => (
//             <div 
//               key={test.id} 
//               className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 dark:hover:bg-gray-700" 
//               data-aos="fade-up" 
//               data-aos-delay="200"
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{test.title}</h2>
//               <p className="text-gray-700 dark:text-gray-300 my-3">Click below to start the test.</p>
//               <Link 
//                 to={`/test/${test.id}`} 
//                 className={`text-white ${test.color} ${test.hoverColor} py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105`}
//               >
//                 Start {test.title} Test
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentTests;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CurrentTests = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    AOS.init({ once: true });

    fetch("https://edu-web-roan.vercel.app/api/exams")
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error("Failed to fetch exams", err));
  }, []);

  return (
    <div className="py-16 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black dark:text-white duration-300">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Current <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Tests</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Here is a list of your current tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* {exams.map((test, index) => (
            <div
              key={test._id}
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 dark:hover:bg-gray-700"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{test.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 my-3">Click below to start the test.</p>
              <Link
                to={`/test/${test._id}`}
                className={`text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105`}
              >
                Start {test.title} Test
              </Link>
            </div>
          ))} */}
          {exams.map(test => (
  <div 
    key={test._id} 
    className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 dark:hover:bg-gray-700" 
    data-aos="fade-up" 
    data-aos-delay="200"
  >
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{test.title}</h2>
    <p className="text-gray-700 dark:text-gray-300 my-3">Click below to start the test.</p>
    <Link 
      to={`/test/${test._id}`} 
      className={`text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105`}
    >
      Start Test
    </Link>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default CurrentTests;
