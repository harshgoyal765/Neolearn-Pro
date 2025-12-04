import React from "react";
import aboutImage from "../assets/about.jpg";
const AboutSection = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-indigo-300 to-purple-50">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
           
        {/* LEFT IMAGE + VIDEO OVERLAY */}
        <div className="relative">
          <img
            src={aboutImage}
            alt="About Us"
            className="rounded-xl w-3xl ml-1 h-auto object-cover shadow-lg"
          />

          {/* Video Overlay */}
          <div className="absolute bottom-6 left-6 w-64 shadow-xl rounded-lg overflow-hidden">
            <video controls className="w-full rounded-lg">
              <source src="/your-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="ml-7">
          <p className="text-gray-700 mb-2 font-semibold text-6xl text-centre">About Us</p>

          <h2 className="text-4xl font-bold text-[#030d46] leading-tight mb-4">
            We Are Maximize Your <br /> Learning Growth
          </h2>

          <p className="text-gray-600 mb-6">
            We provide a modern Learning Management System to simplify online
            education, track progress, and enhance student–instructor
            collaboration efficiently.
          </p>

          {/* Feature List */}
          <div className="grid grid-cols-2 gap-4 text-gray-800 font-medium">
            {[
              "Simplified Learning",
              "Expert Trainers",
              "Big Experience",
              "LifeTime Access",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-black text-xl">✔</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
