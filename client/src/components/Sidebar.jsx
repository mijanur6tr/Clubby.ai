import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FileText, Lightbulb, Image, Scissors, Eraser,
  FileCheck2, LayoutDashboard, Users, X
} from "lucide-react";
// import { useEffect } from "react";

export const Sidebar = ({ closeSidebar }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(()=>{
  //   console.log(user)
  // },[])
  

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/ai/dashboard" },
    { label: "Content Ideas", icon: <Lightbulb size={20} />, to: "/ai/generate-idea" },
    { label: "Generate Content", icon: <FileText size={20} />, to: "/ai/article" },
    { label: "Generate Image", icon: <Image size={20} />, to: "/ai/generate-image" },
    { label: "Remove Background", icon: <Scissors size={20} />, to: "/ai/remove-bg" },
    { label: "Remove Object", icon: <Eraser size={20} />, to: "/ai/remove-object" },
    // { label: "Review Resume", icon: <FileCheck2 size={20} />, to: "/ai/review-resume" },
    { label: "Community", icon: <Users size={20} />, to: "/ai/community" },
  ];

  return (
    <div className="relative w-[280px] min-h-[80vh] bg-slate-900 border-r border-slate-700 p-6 flex flex-col text-white">

      {/* Close Button for Mobile */}
      {closeSidebar && user && (
        <button
          onClick={closeSidebar}
          className="absolute top-3 right-4 bg-slate-700 hover:bg-slate-600 px-2 py-2 rounded-full lg:hidden transition"
        >
          <X size={20} />
        </button>
      )}

    

      {/* Menu Section */}
      <div className="flex flex-col gap-2 mt-2 lg:mt-0">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <button
              key={index}
              onClick={() => {
                navigate(item.to);
                if (closeSidebar) closeSidebar(); 
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-center text-sm text-slate-500">
        <p>All rights reserved.</p>
        <p className="tracking-tight">
          AI can make mistakes. Validate before sensitive use.
        </p>
      </div>
    </div>
  );
};
