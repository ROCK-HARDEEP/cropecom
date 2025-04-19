import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-lg mb-4">This is a placeholder checkout page.</p>
          <Link to="/cart" className="btn btn-primary">
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 