import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image, Type, Lightbulb, EyeOff, Eraser, FileCheck2, ArrowRight } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      icon: <Lightbulb size={40} />,
      title: "Generate Ideas",
      link: "/ai/generate-idea",
      description: "Brainstorm creative concepts and unlock endless possibilities with AI-powered ideation.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconGradient: "from-yellow-400 to-orange-500",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: <Type size={40} />,
      title: "Generate Content",
      link: "/ai/article",
      description: "Create engaging articles, blogs, and copy in seconds with advanced AI writing.",
      gradient: "from-blue-500/20 to-indigo-600/20",
      iconGradient: "from-blue-400 to-indigo-600",
      borderColor: "border-blue-500/30",
    },
    {
      icon: <Image size={40} />,
      title: "Generate Image",
      link: "/ai/generate-image",
      description: "Turn your imagination into stunning visuals with AI-generated artwork.",
      gradient: "from-pink-500/20 to-purple-600/20",
      iconGradient: "from-pink-400 to-purple-600",
      borderColor: "border-pink-500/30",
    },
    {
      icon: <EyeOff size={40} />,
      title: "Remove Background",
      link: "/ai/remove-bg",
      description: "Instantly remove backgrounds from any image with pixel-perfect precision.",
      gradient: "from-green-500/20 to-teal-500/20",
      iconGradient: "from-green-400 to-teal-500",
      borderColor: "border-green-500/30",
    },
    {
      icon: <Eraser size={40} />,
      title: "Remove Object",
      link: "/ai/remove-object",
      description: "Erase unwanted objects from photos seamlessly and professionally.",
      gradient: "from-red-500/20 to-pink-500/20",
      iconGradient: "from-red-400 to-pink-500",
      borderColor: "border-red-500/30",
    },
    {
      icon: <FileCheck2 size={40} />,
      title: "Review Resume",
      link: "/ai/review-resume",
      description: "Get expert AI feedback to make your resume stand out to employers.",
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconGradient: "from-cyan-400 to-blue-500",
      borderColor: "border-cyan-500/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section id="features" className="relative py-32 px-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            POWERFUL FEATURES
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent font-['Playfair_Display']">
            Everything You Need in One Place
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Discover our suite of AI-powered tools designed to supercharge your creativity
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresList.map((item, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Link to={item.link}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative p-8 bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-3xl border ${item.borderColor} overflow-hidden h-full`}
                >
                  {/* Background glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.iconGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `linear-gradient(45deg, transparent, ${item.borderColor}, transparent)`,
                      filter: "blur(10px)",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon with gradient */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.iconGradient} text-white mb-6 shadow-lg`}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Poppins']">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed font-['Inter']">
                      {item.description}
                    </p>

                    {/* Arrow with hover effect */}
                    <motion.div
                      className="flex items-center text-purple-400 font-semibold gap-2 font-['Poppins']"
                      whileHover={{ gap: "12px" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Try it now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Decorative corner element */}
                  <motion.div
                    className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${item.iconGradient} rounded-full opacity-20`}
                    whileHover={{ scale: 2 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

       
      </div>
    </section>
  );
};

export default Features;