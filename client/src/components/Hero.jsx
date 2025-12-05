import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-[50vh] lg:min-h-[80vh] flex items-center justify-center relative 
                        bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Overlay for text visibility */}
      <div className="absolute inset-0 bg-black/25"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Your All-in-One AI Assistant
        </h1>
        <p className="mt-4 text-lg md:text-xl drop-shadow-md">
          Create articles, generate ideas, make images, remove backgrounds,
          delete objects, and review resumes — everything in one platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/ai/article"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-6 py-3 bg-white/30 text-white font-semibold rounded-lg hover:bg-white/40 transition"
          >
            Explore Tools
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
