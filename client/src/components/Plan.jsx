import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <section className="w-full pt-20 px-6 bg-linear-to-b from-blue-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Choose the Plan That Fits You
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Start free. Upgrade whenever you need more power.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 hover:shadow-2xl transition">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};

export default Plan;
