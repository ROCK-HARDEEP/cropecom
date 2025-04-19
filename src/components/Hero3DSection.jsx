import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const Hero3DSection = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Hero slides content with improved color schemes and images
  const heroSlides = [
    {
      title: "Next-Gen Smartphones",
      description: "Cutting-edge technology in your pocket with our latest flagship smartphones.",
      bgColor: isDark 
        ? "from-cyan-900/70 to-blue-800/80" 
        : "from-cyan-600/60 to-blue-500/70",
      model: "smartphone",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
    },
    {
      title: "Discover The Latest Tech At TechTrove",
      description: "Shop the most innovative electronics, gadgets, and accessories with free shipping and a 30-day money back guarantee.",
      bgColor: isDark 
        ? "from-indigo-900/70 to-violet-800/80" 
        : "from-indigo-600/60 to-violet-500/70",
      model: "laptop",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    },
    {
      title: "Premium Audio Experience",
      description: "Immerse yourself in crystal-clear sound with our noise cancelling headphones.",
      bgColor: isDark 
        ? "from-purple-900/70 to-fuchsia-800/80" 
        : "from-purple-600/60 to-fuchsia-500/70",
      model: "headphones",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Wearable Technology",
      description: "Stay connected with our stylish and functional smartwatches.",
      bgColor: isDark 
        ? "from-emerald-900/70 to-teal-800/80" 
        : "from-emerald-600/60 to-teal-500/70",
      model: "smartwatch",
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
    }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 8000); // 8 seconds
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background images with animation */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={`bg-${index}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentHeroSlide === index ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Content slides with animation */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={`content-${index}`}
          className="absolute inset-0 z-10 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentHeroSlide === index ? 1 : 0,
            zIndex: currentHeroSlide === index ? 10 : 0
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-2xl text-white ml-8 md:ml-16"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full mb-4 text-sm">
                Featured {slide.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 drop-shadow-md">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/shop" 
                  className={`btn bg-white hover:bg-white/90 hover:scale-105 transition-transform duration-300 shadow-lg ${
                    isDark ? 'text-indigo-700' : 'text-primary'
                  }`}
                >
                  Shop Now
                </Link>
                <Link 
                  to={`/shop?category=${slide.category.toLowerCase()}`}
                  className="btn bg-transparent border-2 border-white hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                >
                  View {slide.category}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentHeroSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero3DSection; 