import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';
import Hero3DSection from '../components/Hero3DSection';
import ThreeJSObjectViewer from '../components/products/ThreeJSObjectViewer';
import { getFeaturedProducts, getProductsOnSale } from '../services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Categories array with images
  const categories = [
    {
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    },
    {
      name: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
    },
    {
      name: "Audio",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Wearables",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
    },
    {
      name: "TVs",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Smart Home",
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
    },
    {
      name: "Tablets",
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1378&q=80"
    }
  ];

  useEffect(() => {
    // Get products from the mock service
    setFeaturedProducts(getFeaturedProducts());
    setSaleProducts(getProductsOnSale());
    
    // Add loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Hero slides content
  const heroSlides = [
    {
      title: "Discover The Latest Tech At CropCulture",
      description: "Shop the most innovative electronics, gadgets, and accessories with free shipping and a 30-day money back guarantee.",
      bgColor: "from-primary/90 to-primary",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Summer Sale Up To 40% Off",
      description: "Get amazing discounts on our top-rated products. Limited time offer.",
      bgColor: "from-accent/90 to-accent",
      image: "https://images.unsplash.com/photo-1600494603989-9650cf6dad51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "New Arrivals Just Dropped",
      description: "Be the first to experience our latest collection of cutting-edge tech products.",
      bgColor: "from-secondary/90 to-secondary",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 0, 360] 
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity 
              }}
              className="text-primary font-bold text-3xl"
            >
              CropCulture
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with 3D Models */}
      <Hero3DSection />

      {/* Featured Smartphone 3D Model Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Featured Smartphone</h2>
            <p className="text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our latest smartphone model with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[500px] relative"
            >
              <ThreeJSObjectViewer 
                modelUrl="/assets/models/smartphone.gltf" 
                backgroundColor={null}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">Ultimate Smartphone Experience</h3>
              <p className="text-neutral-600 dark:text-gray-300 mb-6">
                Our latest smartphone model combines sleek design with powerful performance. 
                Featuring a stunning display, long-lasting battery life, and an 
                advanced camera system for capturing life's moments in extraordinary detail.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary dark:text-indigo-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-gray-200">High-resolution AMOLED display</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary dark:text-indigo-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-gray-200">Next-generation processor for lightning-fast performance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary dark:text-indigo-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-gray-200">Professional-grade camera system</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary dark:text-indigo-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-gray-200">All-day battery life with fast charging</span>
                </li>
              </ul>
              <Link 
                to="/shop?category=smartphones" 
                className="btn btn-primary hover:scale-105 transition-transform duration-300"
              >
                Explore Smartphones
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* On Sale Section */}
      <section className="py-20 bg-neutral-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">On Sale</h2>
            <Link to="/shop?category=sale" className="text-primary hover:text-primary/80 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center group">
              View All <ChevronRightIcon className="h-5 w-5 ml-1 group-hover:ml-2 transition-all duration-300" />
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {saleProducts.slice(0, 4).map(product => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-20 bg-accent/5 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12">
                <div>
                  <motion.span 
                    className="inline-block bg-accent/20 dark:bg-accent/10 text-accent dark:text-teal-400 text-sm font-semibold px-4 py-1 rounded-full mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Limited Time Offer
                  </motion.span>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Up to 40% Off on Selected Headphones
                  </motion.h2>
                  <motion.p 
                    className="text-neutral-600 dark:text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Experience superior sound quality with premium noise-cancelling headphones. Limited stock available.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Link 
                      to="/shop?category=audio" 
                      className="btn btn-accent hover:scale-105 transition-transform duration-300"
                    >
                      Shop the Sale
                    </Link>
                  </motion.div>
                </div>
              </div>
              <motion.div 
                className="md:w-1/2 relative h-64 md:h-auto overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Headphones on sale" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-accent dark:bg-teal-600 text-white text-xl font-bold h-16 w-16 rounded-full flex items-center justify-center transform rotate-12">
                  40% OFF
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it, hear from our satisfied customers
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-accent dark:text-teal-500' : 'text-neutral-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full mr-4 border-2 border-primary dark:border-indigo-600"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 bg-white dark:bg-gray-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">About CropCulture</h2>
            <p className="text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your premier destination for cutting-edge technology and innovative gadgets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Our team at CropCulture" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                CropCulture is a multipurpose Ecommerce Platform best suitable for all kinds of sectors like Electronics, Fashion, 
                Home Goods, and Smart Devices. We're passionate about bringing the latest technology to our customers.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded with the mission to make cutting-edge technology accessible to everyone, CropCulture has grown 
                from a small startup to a trusted name in the tech retail space.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We believe in providing not just products, but complete solutions that enhance your digital lifestyle.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-primary/10 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-primary dark:text-indigo-400">Quality</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">We source only the highest quality products to ensure customer satisfaction.</p>
                </div>
                
                <div className="bg-primary/10 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-primary dark:text-indigo-400">Innovation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">We stay ahead of the curve with the latest technological advancements.</p>
                </div>
                
                <div className="bg-primary/10 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-primary dark:text-indigo-400">Customer Focus</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">We build lasting relationships through exceptional service and support.</p>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <Link to="/shop" className="btn btn-primary">
                  Explore Products
                </Link>
                <Link to="/services" className="btn btn-outline">
                  Our Services
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
            >
              <div className="bg-primary/10 dark:bg-indigo-900/30 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Our Location</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A Block, Liberty Plaza, No. 12/30, Vada Agaram Road, Mehta Nagar, Aminjikarai, Chennai- 600 002
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
            >
              <div className="bg-primary/10 dark:bg-indigo-900/30 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                9003240001
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
            >
              <div className="bg-primary/10 dark:bg-indigo-900/30 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Mail Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                customer@corpculture.in
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary dark:bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)"></rect>
          </svg>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join Our Newsletter
            </motion.h2>
            <motion.p 
              className="mb-8 text-lg opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Sign up for our newsletter to receive exclusive offers, the latest product news, and tech tips.
            </motion.p>
            <motion.form 
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-gray-800 dark:border-gray-700"
              />
              <motion.button
                type="submit"
                className="bg-white text-primary dark:bg-gray-200 dark:text-indigo-700 hover:bg-white/90 dark:hover:bg-gray-300 px-6 py-3 rounded-md font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

// Mock data for the testimonials
const testimonials = [
  {
    quote: "The delivery was super quick and the laptop I purchased exceeded my expectations. The customer service was also exceptional!",
    name: "Sarah Johnson",
    title: "Verified Buyer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "I've been shopping at CropCulture for years and they never disappoint. The prices are competitive and the products are always genuine.",
    name: "Michael Chen",
    title: "Loyal Customer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    quote: "The noise-cancelling headphones I bought work perfectly for my daily commute. Very happy with my purchase!",
    name: "Emily Rodriguez",
    title: "Verified Buyer",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

export default Home; 