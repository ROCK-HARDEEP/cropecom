import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Product3DShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample featured products with 3D model information
  const featuredProducts = [
    {
      id: 1,
      name: "Ultra Slim Pro Laptop",
      description: "Experience exceptional performance with our thinnest, most powerful laptop ever.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/gaming-laptop-5796888-4849253.png",
      color: "from-blue-500/20 to-indigo-500/20",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      price: "$1,299.99",
      category: "Laptops"
    },
    {
      id: 2,
      name: "Pro Noise Cancelling Headphones",
      description: "Immerse yourself in crystal-clear sound with our premium wireless headphones.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/headphone-4035894-3342177.png",
      color: "from-purple-500/20 to-pink-500/20",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      price: "$349.99",
      category: "Audio"
    },
    {
      id: 3,
      name: "Next-Gen Smartphone",
      description: "Cutting-edge technology in your pocket with our latest flagship smartphone.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/smartphone-5359998-4492549.png", 
      color: "from-emerald-500/20 to-teal-500/20",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      price: "$899.99",
      category: "Smartphones"
    },
    {
      id: 4,
      name: "Smart Watch Pro",
      description: "Track your fitness, answer calls, and more with our most advanced smartwatch.",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/smart-watch-5750817-4800375.png",
      color: "from-amber-500/20 to-yellow-500/20",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      price: "$399.99",
      category: "Wearables"
    },
  ];

  // Auto-rotate showcase
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const product = featuredProducts[currentIndex];

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our selection of cutting-edge technology products
          </motion.p>
        </div>

        <div className="relative">
          {/* 3D Product Showcase */}
          <motion.div 
            className={`rounded-2xl bg-gradient-to-r ${product.color} p-8 md:p-12 overflow-hidden`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key={product.id}
          >
            <div className="flex flex-col md:flex-row items-center">
              {/* Product Image with 3D Effect */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <motion.div
                  className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
                  initial={{ rotateY: 0 }}
                  animate={{ 
                    rotateY: 360,
                    scale: [1, 1.05, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                    y: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/30 blur-xl"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain drop-shadow-2xl z-10 relative"
                  />
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  key={`info-${product.id}`}
                >
                  <span className="inline-block text-sm font-medium tracking-wide uppercase mb-2 bg-white/30 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-neutral-800">{product.name}</h3>
                  <p className="text-neutral-700 mb-6">{product.description}</p>
                  <p className="text-2xl font-bold mb-6 text-neutral-900">{product.price}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link 
                      to={`/product/${product.id}`} 
                      className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${product.buttonColor} shadow-lg hover:shadow-xl`}
                    >
                      View Details
                    </Link>
                    <button className="px-6 py-3 rounded-lg bg-white text-neutral-800 font-medium border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <motion.button
              className="bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg pointer-events-auto ml-2"
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeftIcon className="h-5 w-5 text-neutral-700" />
            </motion.button>
            <motion.button
              className="bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg pointer-events-auto mr-2"
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRightIcon className="h-5 w-5 text-neutral-700" />
            </motion.button>
          </div>

          {/* Product Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? "bg-primary w-8" 
                    : "bg-neutral-300"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product3DShowcase; 