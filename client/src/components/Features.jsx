import React from "react";
import { Link } from "react-router-dom";
import { Image, Type, Lightbulb, EyeOff, Eraser, FileCheck2 } from "lucide-react";

const Features = () => {
  const featuresList = [
    { icon: <Image size={32} />, title: "Generate Image", link: "/ai/generate-image" },
    { icon: <Type size={32} />, title: "Write Articles", link: "/ai/article" },
    { icon: <Lightbulb size={32} />, title: "Generate Ideas", link: "/ai/generate-idea" },
    { icon: <EyeOff size={32} />, title: "Remove Background", link: "/ai/remove-bg" },
    { icon: <Eraser size={32} />, title: "Remove Object", link: "/ai/remove-object" },
    { icon: <FileCheck2 size={32} />, title: "Review Resume", link: "/ai/review-resume" },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-center text-4xl font-bold mb-12 text-gray-900">
        Powerful AI Features
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {featuresList.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition border border-gray-100"
          >
            <div className="text-blue-600 mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Click to start using this AI tool instantly.
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Features;
