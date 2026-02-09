import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Heart,
  Send,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
  ];

  const footerLinks = {
    products: [
      { name: "Content Generator", href: "/ai/article" },
      { name: "Image Creator", href: "/ai/generate-image" },
      { name: "Background Remover", href: "/ai/remove-bg" },
      { name: "Resume Reviewer", href: "/ai/review-resume" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-['Playfair_Display']"
            >
              Clubby AI
            </motion.h3>
            <p className="text-gray-400 leading-relaxed mb-6 font-['Inter'] max-w-sm">
              Empowering creators and businesses with cutting-edge AI tools.
              Transform your ideas into reality with the power of artificial
              intelligence.
            </p>

            {/* Social media links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/5 backdrop-blur-xl rounded-xl border border-purple-500/20 transition-all ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-6 text-lg font-['Poppins']">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors font-['Inter']"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-bold mb-6 text-lg font-['Poppins']">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors font-['Inter']"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-bold mb-6 text-lg font-['Poppins']">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3"
              >
                <Mail className="w-5 h-5 mt-0.5 text-purple-400" />
                <a
                  href="mailto:hello@clubbyai.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors font-['Inter']"
                >
                  hello@clubbyai.com
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3"
              >
                <Phone className="w-5 h-5 mt-0.5 text-purple-400" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-purple-400 transition-colors font-['Inter']"
                >
                  +1 (234) 567-890
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 mt-0.5 text-purple-400" />
                <span className="text-gray-400 font-['Inter']">
                  123 AI Street, Tech City
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-3xl border border-purple-500/20"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3 font-['Poppins']">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-6 font-['Inter']">
              Get the latest AI tools and updates delivered to your inbox
            </p>
            <div className="flex gap-3 max-w-md mx-auto flex-col lg:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 font-['Inter']"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl flex items-center gap-2 font-['Poppins']"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm flex items-center gap-2 font-['Inter']"
            >
              © 2025 Clubby AI. 
            </motion.p>
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-purple-400 transition-colors font-['Inter']"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient line */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-[length:200%_auto]"
      />
    </footer>
  );
};

export default Footer;