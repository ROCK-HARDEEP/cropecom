import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';
import { getAllProducts, getProductsByCategory, searchProducts } from '../services/productService';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: categoryParam || 'all',
    priceRange: [0, 2000],
    brands: [],
    sortBy: 'popularity' // default sort
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch all products on component mount
    const allProducts = getAllProducts();
    setProducts(allProducts);

    // If category is provided in URL, filter by it
    if (categoryParam && categoryParam !== 'all' && categoryParam !== 'sale') {
      const filtered = getProductsByCategory(categoryParam);
      setFilteredProducts(filtered);
    } else if (categoryParam === 'sale') {
      // Filter products on sale
      const onSale = allProducts.filter(product => product.discount > 0);
      setFilteredProducts(onSale);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [categoryParam]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      applyFilters();
    } else {
      const searched = searchProducts(searchQuery);
      setFilteredProducts(searched);
    }
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category
    });
  };

  // Handle price range filter
  const handlePriceChange = (min, max) => {
    setFilters({
      ...filters,
      priceRange: [min, max]
    });
  };

  // Handle brand filter toggle
  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    setFilters({
      ...filters,
      brands: newBrands
    });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value
    });
    applyFilters();
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    // Apply search query if any
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => 
          (a.discount ? a.price * (1 - a.discount/100) : a.price) - 
          (b.discount ? b.price * (1 - b.discount/100) : b.price)
        );
        break;
      case 'price-high-low':
        filtered.sort((a, b) => 
          (b.discount ? b.price * (1 - b.discount/100) : b.price) - 
          (a.discount ? a.price * (1 - a.discount/100) : a.price)
        );
        break;
      case 'newest':
        // Assuming id is a proxy for newer products (higher id = newer)
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'popularity'
        // Use a combination of rating and review count for popularity
        filtered.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
        break;
    }
    
    setFilteredProducts(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 2000],
      brands: [],
      sortBy: 'popularity'
    });
    setSearchQuery('');
    setFilteredProducts(products);
    setShowFilters(false);
  };

  // Get unique brands from products
  const allBrands = [...new Set(products.map(product => product.brand))];

  // Get unique categories from products
  const allCategories = ['all', ...new Set(products.map(product => product.category))];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Shop</h1>
          <p className="text-neutral-600 mt-2">
            Explore our wide range of electronics and tech products
          </p>
        </div>

        {/* Search and Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary text-white rounded-r-md"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>

          {/* Sort and Filter Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="sort" className="text-neutral-600 mr-2 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort"
                value={filters.sortBy}
                onChange={handleSortChange}
                className="py-2 px-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 py-2 px-4 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 md:hidden"
            >
              <FunnelIcon className="h-5 w-5 text-neutral-600" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="w-full md:w-64 lg:w-80 hidden md:block bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-primary text-sm hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-neutral-800 mb-3">Categories</h4>
                <div className="space-y-2">
                  {allCategories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-neutral-600 capitalize"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-neutral-800 mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={filters.priceRange[1]}
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                    className="w-24 py-1 px-2 border border-neutral-300 rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min={filters.priceRange[0]}
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                    className="w-24 py-1 px-2 border border-neutral-300 rounded-md"
                  />
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <h4 className="font-medium text-neutral-800 mb-3">Brands</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {allBrands.map((brand, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-neutral-600"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full btn btn-primary"
            >
              Apply Filters
            </button>
          </div>

          {/* Mobile Filters - Slide in panel */}
          {showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 rounded-full hover:bg-neutral-100"
                  >
                    <XMarkIcon className="h-6 w-6 text-neutral-600" />
                  </button>
                </div>

                <div className="mb-6">
                  <button
                    onClick={resetFilters}
                    className="text-primary text-sm hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>

                {/* Categories Filter - Mobile */}
                <div className="mb-6">
                  <h4 className="font-medium text-neutral-800 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {allCategories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`m-category-${category}`}
                          name="m-category"
                          checked={filters.category === category}
                          onChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        />
                        <label
                          htmlFor={`m-category-${category}`}
                          className="ml-2 text-neutral-600 capitalize"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter - Mobile */}
                <div className="mb-6">
                  <h4 className="font-medium text-neutral-800 mb-3">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={filters.priceRange[1]}
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                      className="w-24 py-1 px-2 border border-neutral-300 rounded-md"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min={filters.priceRange[0]}
                      max="2000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                      className="w-24 py-1 px-2 border border-neutral-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Brands Filter - Mobile */}
                <div className="mb-8">
                  <h4 className="font-medium text-neutral-800 mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allBrands.map((brand, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`m-brand-${brand}`}
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        />
                        <label
                          htmlFor={`m-brand-${brand}`}
                          className="ml-2 text-neutral-600"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 sticky bottom-0 bg-white">
                  <button
                    onClick={() => {
                      applyFilters();
                      setShowFilters(false);
                    }}
                    className="w-full btn btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-neutral-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-600 mb-4">No products found</p>
                <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 