import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-[75vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Your All-in-One AI Assistant
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Create articles, generate ideas, make images, remove backgrounds,
          delete objects, and review resumes — everything in one platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/ai/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="px-6 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Explore Tools
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
