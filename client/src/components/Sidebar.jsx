import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { FileText, Lightbulb, Image, Scissors, Eraser, FileCheck2, LayoutDashboard,Users  } from "lucide-react";

export const Sidebar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); 

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/ai/dashboard" },
    { label: "Generate Article", icon: <FileText size={20} />, to: "/ai/article" },
    { label: "Content Ideas", icon: <Lightbulb size={20} />, to: "/ai/generate-idea" },
    { label: "Generate Image", icon: <Image size={20} />, to: "/ai/generate-image" },
    { label: "Remove Background", icon: <Scissors size={20} />, to: "/ai/remove-bg" },
    { label: "Remove Object", icon: <Eraser size={20} />, to: "/ai/remove-object" },
    { label: "Review Resume", icon: <FileCheck2 size={20} />, to: "/ai/review-resume" },
    { label: "Community", icon: <Users  size={20} />, to: "/ai/community" },
  ];

  return (
    <div className=" w-[250px] min-h-[90vh] bg-white border-r border-gray-200 p-6 flex flex-col">
      

      <div className="flex items-center gap-4 mb-10 cursor-pointer">
        <img
          src={user?.imageUrl}
          alt="User avatar"
          className="w-14 h-14 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">Dashboard</p>
          <p className="text-sm text-gray-500">{user?.fullName}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 ">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <button
              key={index}
              onClick={() => navigate(item.to)}
             
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
                ${isActive 
                  ? "bg-indigo-100 text-indigo-700" 
                  : "text-gray-700 hover:bg-gray-100" 
                }`
              }
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>


      <div className="bottom-0 pt-3 text-center text-sm text-gray-500">
        <p>All rights reserved.</p>
        <p className="tracking-tight">
          AI can make mistakes. Validate before sensitive use.
        </p>
      </div>
    </div>
  );
};