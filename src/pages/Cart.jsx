import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Mock cart data - In a real app, this would come from a cart context or state management
const initialCartItems = [
  {
    id: 1,
    name: "Ultra Slim Pro Laptop 15\"",
    price: 1299.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    quantity: 1,
    color: "Silver"
  },
  {
    id: 5,
    name: "Noise Cancelling Wireless Headphones",
    price: 349.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1605464315513-ac876f89037f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    quantity: 2,
    color: "Black"
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 15 : 0;
  const discount = cartItems.reduce((total, item) => {
    return total + (item.discount ? (item.price * item.discount / 100) * item.quantity : 0);
  }, 0);
  
  const couponValue = couponApplied ? (subtotal * couponDiscount / 100) : 0;
  const total = subtotal + shipping - couponValue;

  // Handle quantity changes
  const handleQuantityChange = (id, change) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
    setCouponApplied(false);
  };

  // Apply coupon code
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    
    // Mock coupon validation - in a real app, this would be validated by an API
    if (couponCode.toLowerCase() === 'save10') {
      setCouponApplied(true);
      setCouponDiscount(10);
    } else if (couponCode.toLowerCase() === 'save20') {
      setCouponApplied(true);
      setCouponDiscount(20);
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
      alert('Invalid coupon code');
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-neutral-800">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                    <button 
                      onClick={handleClearCart}
                      className="text-primary hover:text-primary/80"
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  {/* Cart Items List */}
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-neutral-200 last:border-0 last:pb-0"
                      >
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 bg-neutral-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`} className="text-lg font-medium text-neutral-800 hover:text-primary">
                            {item.name}
                          </Link>
                          <div className="text-sm text-neutral-500 mt-1">
                            Color: {item.color}
                          </div>
                          <div className="flex items-center mt-2">
                            {item.discount > 0 ? (
                              <>
                                <span className="text-primary font-semibold">
                                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                </span>
                                <span className="text-neutral-500 line-through ml-2">
                                  ${item.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-primary font-semibold">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 rounded-full hover:bg-neutral-100"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="h-5 w-5 text-neutral-600" />
                          </button>
                          <span className="mx-3 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 rounded-full hover:bg-neutral-100"
                          >
                            <PlusIcon className="h-5 w-5 text-neutral-600" />
                          </button>
                        </div>
                        
                        {/* Total & Remove */}
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-neutral-800">
                            ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-neutral-500 hover:text-error mt-2"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="flex justify-between">
                <Link to="/shop" className="text-primary flex items-center hover:text-primary/80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary - Right Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  {/* Coupon Code */}
                  <form onSubmit={handleApplyCoupon} className="mb-6">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <div className="text-secondary text-sm mt-2">
                        Coupon applied: {couponDiscount}% off
                      </div>
                    )}
                  </form>
                  
                  {/* Summary Details */}
                  <div className="space-y-3 text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Product Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    {couponApplied && (
                      <div className="flex justify-between text-secondary">
                        <span>Coupon Discount</span>
                        <span>-${couponValue.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg text-neutral-800">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Checkout Button */}
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="w-full btn btn-primary py-3 flex items-center justify-center"
                    >
                      <ShoppingBagIcon className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Link>
                  </div>
                  
                  {/* Payment Methods */}
                  <div className="mt-6">
                    <p className="text-center text-sm text-neutral-500 mb-3">
                      We accept:
                    </p>
                    <div className="flex justify-center gap-2">
                      {['visa', 'mastercard', 'paypal', 'american-express'].map((method) => (
                        <div key={method} className="w-12 h-8 bg-neutral-100 rounded flex items-center justify-center">
                          <img 
                            src={`https://via.placeholder.com/48x30?text=${method}`} 
                            alt={method} 
                            className="max-h-6"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-bold mt-4 mb-2">Your cart is empty</h2>
              <p className="text-neutral-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                to="/shop"
                className="btn btn-primary inline-flex items-center"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 