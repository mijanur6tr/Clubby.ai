import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-[50vh] lg:min-h-[80vh] flex items-center justify-center relative bg-linear-to-r from-[#A96CCE] to-[#3DC3BF]">
      
      <div className="absolute inset-0 bg-black/25"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Your All-in-One AI Assistant
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
          Generate content ideas, Generate Content,  Make images, Remove backgrounds,
          Belete objects form image ~ everything in one platform.
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
