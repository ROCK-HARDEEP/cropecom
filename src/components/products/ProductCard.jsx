import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useTheme } from '../../context/ThemeContext';

const ProductCard = ({ product, isFavorite = false }) => {
  // Destructure product details
  const { id, name, price, image, category, rating, discount } = product;
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const { theme } = useTheme();

  // Calculate discount price
  const discountedPrice = discount ? (price - (price * discount / 100)).toFixed(2) : price;

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      // Here we would normally dispatch to a cart context/state manager
    }, 600);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavoriteState(!isFavoriteState);
  };

  const isDark = theme === 'dark';

  return (
    <motion.div 
      className={`group rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden">
        {discount > 0 && (
          <motion.div 
            className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md z-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {discount}% OFF
          </motion.div>
        )}
        
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <motion.button 
            className={`p-2 rounded-full shadow-md hover:bg-primary/10 text-neutral-700 hover:text-primary transition-colors ${
              isDark ? 'bg-gray-700 text-gray-200 hover:bg-primary/20 hover:text-primary' : 'bg-white'
            }`}
            onClick={toggleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavoriteState ? (
              <HeartIconSolid className="h-5 w-5 text-primary" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </motion.button>
          
          <motion.button 
            className={`p-2 rounded-full shadow-md hover:bg-primary/10 text-neutral-700 hover:text-primary transition-colors ${
              isDark ? 'bg-gray-700 text-gray-200 hover:bg-primary/20 hover:text-primary' : 'bg-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to={`/product/${id}`}>
              <EyeIcon className="h-5 w-5" />
            </Link>
          </motion.button>
        </div>
        
        <div className={`h-48 overflow-hidden flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-neutral-50'
        }`}>
          <motion.img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain p-4"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className={`p-5 flex-grow flex flex-col ${isDark ? 'border-t border-gray-700' : ''}`}>
        <div className={`text-xs font-medium mb-1 uppercase tracking-wider ${
          isDark ? 'text-indigo-400' : 'text-primary/80'
        }`}>
          {category}
        </div>
        <Link to={`/product/${id}`} className="block mb-2">
          <h3 className={`text-lg font-semibold hover:text-primary transition-colors line-clamp-2 h-[3rem] ${
            isDark ? 'text-white hover:text-indigo-400' : 'text-neutral-800'
          }`}>
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${i < rating ? 'text-accent' : isDark ? 'text-gray-600' : 'text-neutral-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className={`ml-1 text-xs ${isDark ? 'text-gray-400' : 'text-neutral-600'}`}>
            ({rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center mb-4 mt-auto">
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-800'}`}>
            {formatPrice(discountedPrice)}
          </span>
          {discount > 0 && (
            <span className={`text-sm line-through ml-2 ${isDark ? 'text-gray-400' : 'text-neutral-500'}`}>
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button 
          className={`w-full btn flex items-center justify-center overflow-hidden relative ${
            isDark ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-primary hover:bg-primary/90 text-white'
          }`}
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </motion.div>
          ) : (
            <>
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard; 