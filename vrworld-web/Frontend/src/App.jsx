import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../src/Components/User/HomePage/HomePage.jsx';
import Login from './Components/User/Login/Login.jsx';
import Contact from './Components/User/HomePage/Contact/Contact.jsx';
import Navbar from './Components/User/HomePage/Navbar/Navbar.jsx';
import Test from './Components/User/Test/Test.jsx';
import TestPage from './Components/User/Test/TestPage.jsx';
import CoursePage from './Components/User/HomePage/Course/Course.jsx';
import Cart from './Components/User/HomePage/Course/Cart.jsx';
import ThankYouPage from './Components/User/Test/Thankyou.jsx';
import Certificate from './Components/User/Test/Certificate.jsx';
import AdminDashboard from './Components/Admin/dashboard.jsx';
import AdminCreateExam from './Components/Admin/AdminCreateExam.jsx';
import AdminManageExams from './Components/Admin/AdminManageExams.jsx';

const App = () => {


  return (
    <Router>
      {/* Conditionally render Navbar based on the current route */}
       <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Login />} /> {/* Assuming you have a signup route */}
        <Route path="/Test" element={<Test />} />
        <Route path="/TesT/:testId" element={<TestPage />} />
        <Route path="/Course" element={<CoursePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Thankyou" element={<ThankYouPage />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-exam" element={<AdminCreateExam />} />
        <Route path="/admin/manage-exam" element={<AdminManageExams />} />

      </Routes>
    </Router>
  );
};

export default App;
