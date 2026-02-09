import React from 'react';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Plan from '../components/Plan.jsx';
import Footer from '../components/Footer.jsx';
import { Testimonial } from '../components/Testimonial.jsx';

const Home = () => {
  return (
    <div className="min-h-screen  bg-slate-950">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <Plan />

      {/* Testimonials Section */}
      <Testimonial />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;