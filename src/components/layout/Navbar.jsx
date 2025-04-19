import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const { theme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
    console.log('Current location:', location.pathname);
    
    // Specifically check if we're on the About Us page
    if (location.pathname === '/about-us' || location.pathname === '/about') {
      console.log('On About Us page');
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
    // Here you would redirect to search results page
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav 
      className={`${isScrolled 
        ? theme === 'dark' 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md shadow-md'
        : theme === 'dark'
          ? 'bg-gray-900 shadow-md border-b border-gray-800'
          : 'bg-white shadow-sm'
      } sticky top-0 z-50 transition-all duration-300`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            variants={itemVariants}
          >
            <Link to="/" className="flex items-center">
              <motion.span 
                className="text-primary dark:text-indigo-400 font-bold text-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CropCulture
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            variants={listVariants}
          >
            <NavLink to="/" label="Home" itemVariants={itemVariants} />
            <NavLink to="/shop" label="Shop" itemVariants={itemVariants} />
            <NavLink to="/services" label="Services" itemVariants={itemVariants} />
            <NavLink to="/#about-us" label="About Us" itemVariants={itemVariants} />
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="hidden md:flex flex-1 max-w-md mx-4"
            variants={itemVariants}
          >
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 pr-10 rounded-lg border border-neutral-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-indigo-400/30 focus:border-primary dark:focus:border-indigo-500 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.button 
                  type="submit" 
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors duration-200" />
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right Navigation (Cart, User, Theme Toggle) */}
          <motion.div 
            className="hidden md:flex items-center space-x-2"
            variants={listVariants}
          >
            <motion.div variants={itemVariants}>
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <ShoppingCartIcon className="h-6 w-6 text-neutral-600 dark:text-gray-300" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1 bg-primary dark:bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/login" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <UserIcon className="h-6 w-6 text-neutral-600 dark:text-gray-300" />
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ThemeToggle />
            </motion.div>
          </motion.div>

          {/* Mobile menu button and icons */}
          <motion.div 
            className="md:hidden flex items-center space-x-1"
            variants={itemVariants}
          >
            <ThemeToggle />
            
            <Link to="/cart" className="relative p-2">
              <ShoppingCartIcon className="h-6 w-6 text-neutral-600 dark:text-gray-300" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-count-mobile"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 bg-primary dark:bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-md text-neutral-600 dark:text-gray-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 pt-2 pb-4 px-4 shadow-lg dark:shadow-gray-900 dark:border-t dark:border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 pr-10 rounded-lg border border-neutral-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-indigo-400/30 focus:border-primary dark:focus:border-indigo-500 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 right-0 px-3 flex items-center">
                  <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400 dark:text-gray-400" />
                </button>
              </div>
            </form>
            <motion.div 
              className="flex flex-col space-y-1"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <MobileNavLink to="/" label="Home" itemVariants={itemVariants} />
              <MobileNavLink to="/shop" label="Shop" itemVariants={itemVariants} />
              <MobileNavLink to="/services" label="Services" itemVariants={itemVariants} />
              <MobileNavLink to="/#about-us" label="About Us" itemVariants={itemVariants} />
              <MobileNavLink to="/login" label="Account" itemVariants={itemVariants} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ to, label, itemVariants }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Handle hash links for smooth scrolling
  const handleClick = (e) => {
    if (to.includes('#')) {
      e.preventDefault();
      const hash = to.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        // If not on home page, navigate to home page first
        if (location.pathname !== '/') {
          window.location.href = `/${to}`;
        } else {
          // Smooth scroll to the element
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL without reloading the page
          window.history.pushState(null, '', to);
        }
      }
    }
  };
  
  return (
    <motion.div variants={itemVariants}>
      <Link 
        to={to} 
        onClick={handleClick}
        className={`${
          isActive ? 'text-primary dark:text-indigo-400 font-medium' : 'text-neutral-600 dark:text-gray-300 hover:text-primary dark:hover:text-indigo-400'
        } transition-colors duration-200 py-2`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

const CategoryLink = ({ to, label }) => (
  <Link 
    to={to}
    className="block px-3 py-2 text-neutral-600 dark:text-gray-300 hover:text-primary dark:hover:text-indigo-400 hover:bg-neutral-50 dark:hover:bg-gray-700 transition-colors duration-200 rounded-md"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, itemVariants }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Handle hash links for smooth scrolling
  const handleClick = (e) => {
    if (to.includes('#')) {
      e.preventDefault();
      const hash = to.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        // If not on home page, navigate to home page first
        if (location.pathname !== '/') {
          window.location.href = `/${to}`;
        } else {
          // Smooth scroll to the element
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL without reloading the page
          window.history.pushState(null, '', to);
        }
      }
    }
  };
  
  return (
    <motion.div variants={itemVariants}>
      <Link 
        to={to} 
        onClick={handleClick}
        className={`${
          isActive ? 'text-primary dark:text-indigo-400 bg-neutral-50 dark:bg-gray-800' : 'text-neutral-700 dark:text-gray-300'
        } block px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-gray-800`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

const MobileCategoryLink = ({ to, label, itemVariants }) => (
  <motion.div variants={itemVariants}>
    <Link 
      to={to}
      className="block py-1.5 text-neutral-600 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors duration-200 text-sm"
    >
      {label}
    </Link>
  </motion.div>
);

export default Navbar; 