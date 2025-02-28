import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "5af1fa91-adf0-4530-b0cd-ee7de4abedd6");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-12 dark:bg-black dark:text-white duration-300">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold">
            Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Us</span>
          </h1>
          <p className="mt-4 text-lg">
            Have any questions? Get in touch with us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
          {/* Contact Form Section */}
          <div className="space-y-6 w-full">
            <form onSubmit={onSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              ></textarea>
              <button type="submit" className="primary-btn w-full">Send Message</button>
            </form>
            <span className="text-center block mt-4">{result}</span>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Get in Touch</h2>
            <p className="text-lg">Email: chetangoyal370@gmail.com</p>
            <p className="text-lg">Phone: +91 7087449143</p>
            <p className="text-lg">Address: Chitkara University</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
