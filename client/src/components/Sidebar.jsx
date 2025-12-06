import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FileText, Lightbulb, Image, Scissors, Eraser,
  FileCheck2, LayoutDashboard, Users, X
} from "lucide-react";

export const Sidebar = ({ closeSidebar }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  

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
    <div className="relative w-[250px] min-h-[90vh] bg-white border-r border-gray-200 p-6 flex flex-col">

      {/* Close Button for Mobile */}
      {closeSidebar && user && (
        <button
          onClick={closeSidebar}
          className="absolute top-3  right-4 bg-gray-200 px-2 py-2 rounded-full lg:hidden"
        >
          <X size={17} />
        </button>
      )}

      {/* User Section */}
      {/* <div className="flex items-center gap-4 mb-10 cursor-pointer mt-6 lg:mt-0">
        <img
          src={user?.imageUrl}
          alt="User avatar"
          className="w-14 h-14 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">Dashboard</p>
          <p className="text-sm text-gray-500">{user?.fullName}</p>
        </div>
      </div> */}

      {/* Menu Section */}
      <div className="flex flex-col gap-3 mt-12 lg:mt-0">
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
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 text-center text-sm text-gray-500">
        <p>All rights reserved.</p>
        <p className="tracking-tight">
          AI can make mistakes. Validate before sensitive use.
        </p>
      </div>
    </div>
  );
};
