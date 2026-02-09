import React from "react";
import { X } from "lucide-react"; // for the close icon

const UpgradeModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-2xl shadow-xl w-80 relative border border-slate-700">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 text-center text-white">
          Premium Feature
        </h2>

        {/* Message */}
        <p className="text-slate-400 text-center mb-6">
          This feature is available only for Premium users.
        </p>

        {/* Only Upgrade Button */}
        <button
          onClick={() => (window.location.href = "/ai/subscription")}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition shadow-lg"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;
