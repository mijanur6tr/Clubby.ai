import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Footer from "../components/Footer";
import { useUser } from "@clerk/clerk-react";
import { Menu } from "lucide-react"; 
import { SignIn } from "@clerk/clerk-react";
 

const Layout = () => {
  const { user, isLoaded } = useUser();


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
        <SignIn/>
      </div>  
       <Footer/>   
       </>
    );
  }

  return (
    <div className="flex h-[91vh] overflow-hidden bg-slate-950">
    
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 shadow-2xl transform transition-transform duration-300 lg:hidden 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Vertical Bar with Hamburger */}
      <div className="w-9 h-full flex flex-col items-center justify-center bg-slate-900/50 border-r border-slate-800 lg:hidden">
        <button
          className="p-2 rounded-lg bg-slate-800 text-white shadow-md border border-slate-700 hover:bg-slate-700 transition"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto  sm:px-6 lg:px-8">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default Layout;
