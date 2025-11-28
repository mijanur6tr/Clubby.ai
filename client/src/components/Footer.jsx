import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h3 className="text-xl font-semibold text-white">
          AI Toolbox
        </h3>

        <p className="mt-3 text-gray-400">
          Build smarter and faster with AI tools for everyone.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Clubby AI — All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
