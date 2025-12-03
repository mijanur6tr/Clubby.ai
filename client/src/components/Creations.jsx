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
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Creations</h2>

      <div className="flex flex-col gap-6">
        {creations.length === 0 ? (
          <p className="text-gray-500 text-center">No creations found.</p>
        ) : (
          creations.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOpen(item.id)}
                >
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {item.prompt.length > 70
                        ? item.prompt.slice(0, 70) + "..."
                        : item.prompt}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.type.replace("-", " ")} —{" "}
                      {dayjs(item.created_at).format("D/MM/YYYY")}
                    </p>
                  </div>

                  <span className="px-4 py-1 rounded-full text-sm border border-blue-300 text-blue-600 bg-blue-50 capitalize">
                    {item.type.replace("-", " ")}
                  </span>

                  <div className="ml-4">
                    {isOpen ? (
                      <ChevronUp size={22} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={22} className="text-gray-500" />
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-5 border-t pt-4 space-y-4">
                    <div>
                      <h3 className="text-gray-700 font-semibold mb-2">Full Prompt</h3>
                      <p className="text-gray-600">{item.prompt}</p>
                    </div>

                    <div>
                      <h3 className="text-gray-700 font-semibold mb-2">
                        Generated Content
                      </h3>

                      {item.type === "image" ? (
                        <img
                          src={item.content}
                          alt="Generated"
                          className="w-full max-h-[400px] object-contain rounded-lg shadow-md border border-gray-200"
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg border text-sm">
                          <Markdown>{item.content}</Markdown>
                        </pre>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        Last Updated — {dayjs(item.updated_at).format("D/MM/YYYY")}
                      </p>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
