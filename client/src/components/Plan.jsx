import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <section className="w-full py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Choose the Plan That Fits You
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Start free. Upgrade whenever you need more power.
          </p>
        </div>

        {/* Pricing Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <PricingTable />
        </div>

      </div>
    </section>
  );
};

export default Plan;
