import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export const Testimonial = () => {
  const testimonials = [
    {
      name: "Richard Nelson",
      role: "Frontend Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      text: "Super clean and easy to use. These AI tools saved me hours of dev time and countless lines of extra code! The content generation is absolutely mind-blowing.",
      date: "12 Jan 2025",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "Creative Designer",
      company: "DesignHub",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      text: "The design quality is top-notch. Perfect balance between simplicity and style. The image generation feature has transformed my workflow completely!",
      date: "15 Mar 2025",
      rating: 5,
    },
    {
      name: "Ethan Roberts",
      role: "Content Creator",
      company: "MediaWorks",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      text: "Absolutely love the reusability of these components. My workflow feels 10x faster now with cleaner and more consistent layouts. Game changer!",
      date: "20 Feb 2025",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="relative py-32 px-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600/10 rounded-full filter blur-3xl"></div>

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
            TESTIMONIALS
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent font-['Playfair_Display']">
            Loved by Creators Worldwide
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Join thousands of satisfied users who have transformed their workflow
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} variants={cardVariants}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 h-full overflow-hidden group"
              >
                {/* Glowing quote icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-shadow"
                >
                  <Quote className="w-10 h-10 text-white" />
                </motion.div>

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.2), transparent)",
                    filter: "blur(20px)",
                  }}
                />

                <div className="relative z-10">
                  {/* Rating and date */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + index * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 font-['Inter']">
                      {testimonial.date}
                    </p>
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-300 leading-relaxed mb-8 italic font-['Inter'] text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-purple-500/20">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <img
                        className="h-14 w-14 rounded-full object-cover ring-4 ring-purple-500/30"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                    </motion.div>
                    <div>
                      <p className="font-bold text-white text-lg font-['Poppins']">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400 font-['Inter']">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-purple-400 font-['Inter']">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative gradient bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left rounded-b-3xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

  
      </div>
    </section>
  );
};