import React, { useState } from "react";
import { dummyCreationData } from "../assets/assets.js";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import Markdown from "react-markdown"

const Creations = () => {

  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full p-8 bg-[#F7F9FC] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Creations</h2>

      <div className="flex flex-col gap-4">
        {dummyCreationData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border shadow-sm transition hover:shadow-md"
            >

              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOpen(item.id)}
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.prompt.slice(0, 70)}...
                  </p>
                  <p className="text-gray-500 text-sm">
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
                <div className="mt-5 border-t pt-4">
                  <div className="mb-3">
                    <h3 className="text-gray-700 font-semibold mb-1">
                      Full Prompt
                    </h3>

                    <p className="text-gray-600">{item.prompt}</p>
                  </div>

                  <div className="mb-3">
                    <h3 className="text-gray-700 font-semibold mb-1">
                      Generated Content
                    </h3>
                    <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg border text-sm">
                      <div className="reset-tw">
                        <Markdown >
                          {item.content}
                        </Markdown>

                      </div>

                    </pre>
                  </div>

                  <p className="text-xs text-gray-500">
                    Last Updated — {dayjs(item.updated_at).format("D/MM/YYYY")}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Creations;
