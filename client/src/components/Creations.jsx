import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import Markdown from "react-markdown";

const Creations = ({ creations, setCreations }) => {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Delete a creation
  // todo-make the database clear as well
  const handleDelete = (id) => {
    setCreations(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="w-full  min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-white">Your Creations</h2>

      <div className="flex flex-col gap-6">
        {creations.length === 0 ? (
          <p className="text-slate-400 text-center">No creations found.</p>
        ) : (
          creations.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="bg-slate-800/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-700 backdrop-blur-sm"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOpen(item.id)}
                >
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {item.prompt.length > 70
                        ? item.prompt.slice(0, 70) + "..."
                        : item.prompt}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      {item.type.replace("-", " ")} —{" "}
                      {dayjs(item.created_at).format("D/MM/YYYY")}
                    </p>
                  </div>
                  
                  <div className="flex">

                  <span className="px-2 lg:px-4 py-1 rounded-lg text-center  text-sm border border-cyan-500/50 text-cyan-400 bg-cyan-500/10 capitalize">
                    {item.type.replace("-", " ")}
                  </span>

                  <div className="ml-4">
                    {isOpen ? (
                      <ChevronUp size={22} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={22} className="text-slate-400" />
                    )}
                  </div>

                  </div>

                </div>

                {isOpen && (
                  <div className="mt-5 border-t border-slate-700 pt-4 space-y-4">
                    <div>
                      <h3 className="text-slate-300 font-semibold mb-2">Full Prompt</h3>
                      <p className="text-slate-400">{item.prompt}</p>
                    </div>

                    <div>
                      <h3 className="text-slate-300 font-semibold mb-2">
                        Generated Content
                      </h3>

                      {item.type === "image" ? (
                        <img
                          src={item.content}
                          alt="Generated"
                          className="w-full max-h-[400px] object-contain rounded-lg shadow-md border border-slate-600"
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap text-slate-300 bg-slate-900 p-4 rounded-lg border border-slate-700 text-sm">
                          <Markdown>{item.content}</Markdown>
                        </pre>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-slate-500">
                        Last Updated — {dayjs(item.updated_at).format("D/MM/YYYY")}
                      </p>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Creations;
