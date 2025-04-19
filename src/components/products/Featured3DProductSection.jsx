import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';
import Product3DShowcase from './Product3DShowcase';
import ThreeJSProductViewer from './ThreeJSProductViewer';

const Featured3DProductSection = () => {
  const [displayMode, setDisplayMode] = useState('showcase'); // 'showcase' or 'interactive'
  
  // Featured product details
  const featuredProducts = [
    {
      id: 1,
      name: "Ultra Slim Pro Laptop",
      description: "Experience exceptional performance with our thinnest, most powerful laptop ever. Features a stunning 4K display, 32GB RAM and 1TB SSD.",
      price: "$1,299.99",
      model: "laptop", // For ThreeJS viewer
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/gaming-laptop-5796888-4849253.png", // For Product3DShowcase
      category: "Laptops",
      specs: [
        "15.6\" 4K Ultra HD Display",
        "32GB RAM",
        "1TB SSD Storage",
        "Latest Gen Processor",
        "12+ Hour Battery Life"
      ]
    },
    {
      id: 2,
      name: "Pro Noise Cancelling Headphones",
      description: "Immerse yourself in crystal-clear sound with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
      price: "$349.99",
      model: "headphones",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/headphone-4035894-3342177.png",
      category: "Audio",
      specs: [
        "Active Noise Cancellation",
        "30-Hour Battery Life",
        "Premium Sound Quality",
        "Touch Controls",
        "Voice Assistant Support"
      ]
    },
    {
      id: 3,
      name: "Next-Gen Smartphone",
      description: "Cutting-edge technology in your pocket with our latest flagship smartphone featuring an incredible camera system and all-day battery life.",
      price: "$899.99",
      model: "smartphone",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/smartphone-5359998-4492549.png",
      category: "Smartphones",
      specs: [
        "6.7\" OLED Display",
        "Triple Camera System",
        "5G Connectivity",
        "All-Day Battery Life",
        "Advanced Face Recognition"
      ]
    },
    {
      id: 4,
      name: "Smart Watch Pro",
      description: "Track your fitness, answer calls, and more with our most advanced smartwatch featuring health monitoring and water resistance.",
      price: "$399.99",
      model: "smartwatch",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/smart-watch-5750817-4800375.png",
      category: "Wearables",
      specs: [
        "Always-On Retina Display",
        "Heart Rate & ECG Monitoring",
        "Water Resistant to 50m",
        "GPS + Cellular",
        "18-Hour Battery Life"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-2">
              Interactive Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore in 3D</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Interact with our premium products in stunning 3D detail - rotate, zoom and examine from every angle
            </p>
          </motion.div>

          <div className="flex justify-center mt-8 mb-12">
            <div className="bg-white p-1 rounded-lg shadow-md inline-flex">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  displayMode === 'showcase' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
                onClick={() => setDisplayMode('showcase')}
              >
                3D Showcase
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  displayMode === 'interactive' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
                onClick={() => setDisplayMode('interactive')}
              >
                Interactive 3D
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {displayMode === 'showcase' ? (
              <motion.div
                key="showcase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Product3DShowcase />
              </motion.div>
            ) : (
              <motion.div
                key="interactive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <Tab.Group>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                      <div className="md:col-span-3 p-6 md:p-8 order-2 md:order-1">
                        <Tab.Panels>
                          {featuredProducts.map((product) => (
                            <Tab.Panel key={product.id}>
                              <div className="mb-8">
                                <div className="h-[500px] w-full">
                                  <ThreeJSProductViewer 
                                    modelUrl={product.model} 
                                    backgroundColor="#f8fafc"
                                  />
                                </div>
                              </div>
                            </Tab.Panel>
                          ))}
                        </Tab.Panels>
                      </div>
                      
                      <div className="md:col-span-2 bg-neutral-50 p-6 md:p-8 order-1 md:order-2">
                        <h3 className="text-2xl font-bold mb-4 text-center md:text-left">
                          Featured Products
                        </h3>
                        
                        <Tab.List className="flex flex-col space-y-3">
                          {featuredProducts.map((product) => (
                            <Tab key={product.id} className="w-full">
                              {({ selected }) => (
                                <div 
                                  className={`
                                    p-4 rounded-lg text-left transition-all outline-none
                                    ${selected 
                                      ? 'bg-white shadow-md border-l-4 border-primary' 
                                      : 'bg-white/50 hover:bg-white hover:shadow-sm'
                                    }
                                  `}
                                >
                                  <div className="flex items-center">
                                    <div className="w-12 h-12 mr-4 flex-shrink-0">
                                      <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div>
                                      <h4 className={`font-medium ${selected ? 'text-primary' : 'text-neutral-800'}`}>
                                        {product.name}
                                      </h4>
                                      <p className="text-sm text-neutral-500">
                                        {product.category} · {product.price}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {selected && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-4"
                                    >
                                      <p className="text-neutral-600 text-sm mb-3">
                                        {product.description}
                                      </p>
                                      <ul className="space-y-1 mb-4">
                                        {product.specs.map((spec, idx) => (
                                          <li key={idx} className="text-xs text-neutral-600 flex items-baseline">
                                            <span className="mr-2 text-primary">✓</span>
                                            {spec}
                                          </li>
                                        ))}
                                      </ul>
                                      <Link 
                                        to={`/product/${product.id}`}
                                        className="inline-block text-sm text-primary font-medium"
                                      >
                                        View Details →
                                      </Link>
                                    </motion.div>
                                  )}
                                </div>
                              )}
                            </Tab>
                          ))}
                        </Tab.List>
                      </div>
                    </div>
                  </Tab.Group>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Featured3DProductSection; 