import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const courses = [
  { id: 1, title: "Data Structures & Algorithms", price: 4 * 83 }, // Converted to INR
  { id: 2, title: "Web Development", price: 9 * 83 },
  { id: 3, title: "Machine Learning", price: 9 * 83 },
  { id: 4, title: "Cyber Security", price: 9 * 83 },
  { id: 5, title: "Database Management", price: 9 * 83 }
];

const Cart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = parseInt(queryParams.get("courseId"));

  const initialCourse = courses.find(course => course.id === courseId);
  const [cartItems, setCartItems] = useState(initialCourse ? [initialCourse] : []);

  // Add course to cart
  const addCourse = (course) => {
    if (!cartItems.find(item => item.id === course.id)) {
      setCartItems([...cartItems, course]);
    }
  };

  // Remove course from cart
  const removeCourse = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Razorpay Payment Integration
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load payment gateway. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_ntelJI9QGoLn8f", // Replace with your Razorpay API Key
      amount: totalPrice * 100, // Razorpay accepts amount in paise
      currency: "INR",
      name: "EduCourse",
      description: "Purchase Courses",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        setCartItems([]); // Clear cart after payment
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9876543210"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black dark:text-white p-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((course) => (
                <li
                  key={course.id}
                  className="flex justify-between items-center border-b py-3 text-lg"
                >
                  <span>{course.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 font-semibold">₹{course.price}</span>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-lg font-bold text-center">
              Total: <span className="text-green-500">₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePayment}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Proceed to Checkout
            </button>
          </>
        ) : (
          <p className="text-center text-xl font-semibold">Your cart is empty.</p>
        )}
      </div>

      {/* Add More Courses */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Add More Courses</h2>
        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
            >
              <span>{course.title}</span>
              <button
                onClick={() => addCourse(course)}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/Course"
        className="mt-6 text-blue-500 hover:underline text-lg font-semibold"
      >
        Back to Courses
      </Link>
    </div>
  );
};

export default Cart;
