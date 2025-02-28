import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import Quotes from "./Quotes/Quotes";
import Banner from "./Banner/Banner";

import Features from "./Features/Features";
import AppStore from "../AppStore";
import Footer from "./Footer/Footer";


import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  const [isPlay, setIsPlay] = useState(false);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <main className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
      
      <Hero togglePlay={togglePlay} />
      <Quotes />
      <Banner togglePlay={togglePlay} />
      
      <Features />
      <AppStore />
      <Footer />

    
    </main>
  );
};

export default HomePage;
