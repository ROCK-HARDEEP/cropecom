import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThreeJSObjectViewer = ({ modelUrl, backgroundColor = null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modelType, setModelType] = useState('');
  const { theme } = useTheme();
  
  // Set default background color based on theme
  const bgColor = backgroundColor || (theme === 'dark' ? "#1a202c" : "#f5f5f5");

  // Map of product images for each model type
  const productImages = {
    'laptop': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    'headphones': 'https://images.unsplash.com/photo-1605464315513-ac876f89037f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'smartphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    'smartwatch': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    'smartglasses': 'https://images.unsplash.com/photo-1626716493698-f60586c5ba5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    'default': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  };

  useEffect(() => {
    console.log("ThreeJSObjectViewer - Image fallback for model:", modelUrl);
    setIsLoading(true);
    
    // Determine the model type from the URL or direct model ID
    let type = modelUrl;
    
    // Extract model type from file path if needed
    if (typeof modelUrl === 'string' && modelUrl.includes('/')) {
      const fileName = modelUrl.toLowerCase().split('/').pop();
      
      if (fileName.includes('laptop')) type = 'laptop';
      else if (fileName.includes('headphone')) type = 'headphones';
      else if (fileName.includes('smartphone') || fileName.includes('phone')) type = 'smartphone';
      else if (fileName.includes('smartwatch') || fileName.includes('watch')) type = 'smartwatch';
      else if (fileName.includes('smartglasses') || fileName.includes('glasses')) type = 'smartglasses';
      else type = 'default';
    }
    
    // Normalize the type string
    if (typeof type === 'string') {
      type = type.toLowerCase();
    }
    
    // Set the type for image selection
    if (!productImages[type]) {
      type = 'default';
    }
    
    setModelType(type);
    setIsLoading(false);
  }, [modelUrl]);

  return (
    <div className="relative w-full h-80 md:h-96">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 dark:bg-gray-800 z-10">
          <div className="w-12 h-12 border-4 border-primary dark:border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-600 dark:text-gray-300">Loading Product Image...</p>
        </div>
      ) : (
        <motion.div 
          className="w-full h-full rounded-xl overflow-hidden shadow-lg relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: bgColor }}
        >
          <img 
            src={productImages[modelType]} 
            alt={`${modelType} product`}
            className="w-full h-full object-contain"
          />
          <div className={`absolute bottom-4 left-4 right-4 text-center z-10 p-2 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-800'}`}>
              <span className="text-primary dark:text-indigo-400">ℹ️</span> Working on loading 3D models...
              <span className={`block text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-neutral-600'} mt-1`}>
                Showing product image temporarily
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ThreeJSObjectViewer; 