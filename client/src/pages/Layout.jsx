import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/Navbar.jsx";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Menu } from "lucide-react"; 


const Layout = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    
      <div className="relative">
        <Navbar />

       
        <button
          className="lg:hidden absolute top-3 left-2 sm:left-5 p-2 rounded-md bg-gray-200 shadow-md"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={19} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">

        <div className="hidden lg:block">
          <Sidebar />
        </div>


        {isSidebarOpen && (
          <div
            className="fixed inset-0   z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

    
        <div
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 lg:hidden 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
        </div>


        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default Layout;
