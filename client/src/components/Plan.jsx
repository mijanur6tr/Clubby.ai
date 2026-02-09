import React from "react";
import { PricingTable } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Zap, Crown, Rocket, Check } from "lucide-react";

const Plan = () => {
  const highlights = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant AI generation",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Crown,
      title: "Premium Quality",
      description: "Best-in-class AI models",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Always Growing",
      description: "New features monthly",
      gradient: "from-blue-400 to-cyan-500",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background decorations */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 font-['Poppins']"
          >
            PRICING PLANS
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent font-['Playfair_Display']">
            Choose the Plan That Fits You
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Start free. Upgrade whenever you need more power. No hidden fees.
          </p>
        </motion.div>

        {/* Plan highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`p-3 bg-gradient-to-br ${item.gradient} rounded-xl`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white font-['Poppins']">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 font-['Inter']">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing table container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl"
        >
          {/* Decorative glow effects */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <PricingTable />
          </div>
        </motion.div>

        {/* Bottom guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="lg:mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="lg:inline-flex hidden items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-full font-semibold font-['Poppins']"
          >
            <Check className="w-5 h-5" />
            30-day money-back guarantee
            <span className="text-gray-400">•</span>
            Secure payment
            <span className="text-gray-400">•</span>
            Cancel anytime
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Plan;