import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/Navbar.jsx";
import { useUser, useClerk } from "@clerk/clerk-react";

const Layout = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Clubby AI</h2>
        <p className="text-gray-600 mt-2">Please sign in to continue.</p>

        <button
          onClick={openSignIn}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden"> 
      {/* Navbar fixed at top */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixed vertically */}
        <Sidebar />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
