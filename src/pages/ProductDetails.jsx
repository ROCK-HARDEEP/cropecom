import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, HeartIcon, ArrowLeftIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getProductById, getFeaturedProducts } from '../services/productService';
import ProductCard from '../components/products/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = () => {
      setLoading(true);
      try {
        const productData = getProductById(id);
        if (productData) {
          setProduct(productData);
          setSelectedColor(productData.colors[0]);
          // Get similar products (using featured products as a substitute)
          setSimilarProducts(getFeaturedProducts());
        } else {
          // Product not found, redirect to 404
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-neutral-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <span className="mx-2">/</span>
            <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-500">{product.name}</span>
          </div>
        </div>

        {/* Product Overview Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product Image Gallery - Left Column */}
            <div className="lg:col-span-2">
              <div className="relative mb-4 rounded-lg overflow-hidden bg-neutral-100">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-[350px] md:h-[450px] object-contain"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-2 py-1 rounded-md">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`rounded-md overflow-hidden border-2 ${
                      index === activeImage ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info - Right Column */}
            <div className="lg:col-span-3 flex flex-col">
              <div className="mb-auto">
                {/* Product Title and Favorite */}
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
                    {product.name}
                  </h1>
                  <button
                    onClick={toggleFavorite}
                    className="p-2 text-neutral-600 hover:text-primary rounded-full hover:bg-neutral-100"
                  >
                    {favorite ? (
                      <HeartIconSolid className="h-6 w-6 text-primary" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>

                {/* Brand */}
                <p className="text-neutral-600 mb-4">
                  Brand: <span className="font-medium">{product.brand}</span>
                </p>

                {/* Ratings */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= Math.floor(product.rating) ? (
                          <StarIconSolid className="h-5 w-5 text-accent" />
                        ) : star - 0.5 <= product.rating ? (
                          <StarIconSolid className="h-5 w-5 text-accent" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-accent" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="text-neutral-600">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-6">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-primary mr-3">
                        ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-lg text-neutral-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-3 text-accent font-medium">
                        Save ${(product.price * product.discount / 100).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center mb-6">
                  <CheckCircleIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-secondary">
                    {product.stock > 0
                      ? product.stock > 10
                        ? 'In Stock'
                        : `Only ${product.stock} left in stock`
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Short Description */}
                <div className="mb-6">
                  <p className="text-neutral-600">{product.description}</p>
                </div>

                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-neutral-700 mb-3">
                      Color: <span className="font-normal">{selectedColor}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color)}
                          className={`px-3 py-1 rounded-md border ${
                            selectedColor === color
                              ? 'border-primary text-primary bg-primary/10'
                              : 'border-neutral-300 hover:border-primary text-neutral-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-neutral-700 mb-3">Quantity</h3>
                  <div className="flex items-center w-36">
                    <button
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-l-md hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      max={product.stock}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-16 h-10 border-y border-neutral-300 text-center focus:outline-none"
                    />
                    <button
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-r-md hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="btn btn-primary flex-1 py-3">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="btn btn-outline flex-1 py-3">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tab Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          {/* Tabs */}
          <div className="border-b border-neutral-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'specifications'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'features'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-neutral-600 mb-4">{product.description}</p>
                <p className="text-neutral-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc at facilisis vulputate, nisl nisi 
                  tincidunt nisi, et hendrerit nunc nisl eu nisi. Nullam euismod, nunc at facilisis vulputate, nisl nisi tincidunt
                  nisi, et hendrerit nunc nisl eu nisi. Nullam euismod, nunc at facilisis vulputate, nisl nisi tincidunt nisi, et
                  hendrerit nunc nisl eu nisi.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="border-b border-neutral-200 pb-2 last:border-b-0">
                      <span className="text-neutral-600 capitalize">{key}: </span>
                      <span className="font-medium text-neutral-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 text-neutral-600">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button className="text-primary hover:text-primary/80">Write a review</button>
                </div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIconSolid key={star} className="h-6 w-6 text-accent" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-neutral-800">
                      {product.rating.toFixed(1)} out of 5
                    </span>
                  </div>
                  <p className="text-neutral-600">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>

                {/* Sample reviews - would normally come from API */}
                <div className="space-y-6">
                  {[
                    {
                      name: 'John Smith',
                      rating: 5,
                      date: '2 months ago',
                      title: 'Excellent product, worth every penny!',
                      comment:
                        'This product exceeded my expectations. The quality is outstanding and it works perfectly. Would highly recommend to anyone looking for a premium experience.',
                    },
                    {
                      name: 'Emily Johnson',
                      rating: 4,
                      date: '3 weeks ago',
                      title: 'Great value for money',
                      comment:
                        'I\'m very happy with this purchase. It has all the features I need and the battery life is impressive. The only small issue is that it took me a while to figure out how to set it up.',
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-neutral-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-neutral-800">{review.name}</h4>
                        <span className="text-neutral-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= review.rating ? (
                              <StarIconSolid className="h-4 w-4 text-accent" />
                            ) : (
                              <StarIcon className="h-4 w-4 text-neutral-300" />
                            )}
                          </span>
                        ))}
                      </div>
                      <h5 className="font-medium text-neutral-800 mb-2">
                        {review.title}
                      </h5>
                      <p className="text-neutral-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 