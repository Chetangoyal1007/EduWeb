import React from "react";
import BannerPng from "../../../../assets/banner1.jpg";
import { BiPlayCircle } from "react-icons/bi";

const Banner = ({ togglePlay }) => {
  return (
    <div className="py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* image section */}
          <div data-aos="fade-up" data-aos-once="false">
            <img src={BannerPng} alt="" className="w-full max-w-[400px]" />
          </div>
          {/* text content section */}
          <div className=" lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold"
              >
                GET READY TO ACE <br/>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                EXAMS WITH OUR PLATFORM
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="500">
              Experience seamless, secure, and efficient online testing like never before. Our platform is designed to help you prepare, take, and track your exams with ease, no matter where you are.
              </p>
              
            </div>
            {/* backgrond color blob */}
            <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
