import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Star } from "lucide-react";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-liner-to-br from-slate-950 via-purple-950 to-slate-900 py-25">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-liner-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20"
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-['Poppins']">Powered by Advanced AI Technology</span>
          <Zap className="w-4 h-4 text-cyan-400" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-['Playfair_Display']"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Content
          </span>
          <br />
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            AI Assistant
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-4xl mx-auto text-xl md:text-2xl text-gray-300 leading-relaxed font-['Inter']"
        >
          Generate content ideas, create stunning visuals, remove backgrounds,
          and unleash your creativity—all in one{" "}
          <span className="text-purple-400 font-semibold">powerful platform</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link to="/ai/article">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl overflow-hidden font-['Poppins']"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-3 text-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          <a href="#features">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-purple-500/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all font-['Poppins'] text-lg"
            >
              Explore Features
            </motion.button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-8 mx-auto"
        >
          {[
            { number: "1K+", label: "Active Users", icon: Star },
            { number: "100k+", label: "AI Generations", icon: Zap },
            { number: "99%", label: "Satisfaction", icon: Sparkles },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -10 }}
              className="relative p-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-['Playfair_Display']">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-2 font-['Inter']">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-3 bg-purple-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;