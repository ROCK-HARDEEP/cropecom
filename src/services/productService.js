// Mock data for products
export const products = [
  {
    id: 1,
    name: "HP Pavilion Gaming Laptop",
    description: "High-performance gaming laptop with 11th Gen Intel Core i5 processor, 8GB RAM, and NVIDIA GTX 1650 graphics for seamless gameplay and productivity.",
    price: 65999.99,
    discount: 10,
    category: "Laptops",
    brand: "HP",
    rating: 4.7,
    reviewCount: 124,
    stock: 15,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    ],
    features: [
      "15.6\" Full HD IPS Display",
      "Intel Core i5-11300H",
      "8GB DDR4 RAM",
      "512GB NVMe SSD",
      "NVIDIA GTX 1650 4GB Graphics",
      "Windows 11 Home"
    ],
    colors: ["Black", "Shadow Grey"],
    specs: {
      processor: "Intel Core i5-11300H",
      memory: "8GB DDR4 3200MHz",
      storage: "512GB NVMe SSD",
      graphics: "NVIDIA GTX 1650 4GB",
      display: "15.6\" Full HD (1920 x 1080) IPS",
      ports: "2x USB-C, 2x USB-A, HDMI, Audio Jack",
      connectivity: "Wi-Fi 6, Bluetooth 5.2",
      camera: "720p HD Webcam",
      audio: "Stereo Speakers with DTS:X",
      battery: "Up to 8 hours",
      dimensions: "36.0 x 25.6 x 2.34 cm",
      weight: "2.2 kg"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy M34 5G",
    description: "Feature-packed smartphone with a stunning display, powerful camera system, and fast 5G connectivity for an elevated mobile experience.",
    price: 18999.99,
    discount: 15,
    category: "Mobile Phones",
    brand: "Samsung",
    rating: 4.5,
    reviewCount: 302,
    stock: 25,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
    ],
    features: [
      "6.5\" Super AMOLED Display",
      "50MP Triple Camera",
      "6000mAh Battery",
      "8GB RAM + 128GB Storage",
      "Exynos 1280 Processor",
      "5G Connectivity"
    ],
    colors: ["Midnight Blue", "Silver", "Green"],
    specs: {
      display: "6.5\" Super AMOLED, 120Hz",
      processor: "Exynos 1280 Octa-core",
      storage: "128GB, expandable to 1TB",
      memory: "8GB RAM",
      camera: "50MP + 8MP + 2MP Triple Rear Camera",
      frontCamera: "13MP Front Camera",
      battery: "6000mAh with 25W Fast Charging",
      connectivity: "5G, Wi-Fi, Bluetooth 5.2",
      security: "Side Fingerprint Sensor",
      os: "Android 13",
      dimensions: "162.8 x 76.3 x 8.8 mm",
      weight: "208g"
    }
  },
  {
    id: 3,
    name: "Asian Paints Premium Emulsion",
    description: "Premium quality interior wall paint with excellent coverage, durability, and low VOC content. Perfect for living rooms, bedrooms, and other interior spaces.",
    price: 3599.99,
    discount: 5,
    category: "Paints",
    brand: "Asian Paints",
    rating: 4.6,
    reviewCount: 189,
    stock: 40,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    features: [
      "Excellent Coverage",
      "Low VOC Content",
      "Washable & Durable",
      "Superior Finish",
      "Available in 2000+ Shades",
      "Anti-bacterial Properties"
    ],
    colors: ["White", "Magnolia", "Custom Colors"],
    specs: {
      type: "Interior Emulsion",
      coverage: "120-140 sq. ft/liter",
      dryingTime: "2-3 hours",
      recoatingTime: "4-6 hours",
      finish: "Matte/Silk/Gloss",
      dilution: "40-45% with clean water",
      packSize: "10L, 4L, 1L",
      shelfLife: "2 years from manufacturing",
      application: "Brush, Roller, Spray",
      cleanUp: "Clean water"
    }
  },
  {
    id: 4,
    name: "CP Plus 2MP CCTV Camera",
    description: "High-definition security camera with night vision, wide viewing angle, and motion detection for complete home or office security solutions.",
    price: 2799.99,
    discount: 10,
    category: "CCTV Camera",
    brand: "CP Plus",
    rating: 4.4,
    reviewCount: 156,
    stock: 25,
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    features: [
      "2MP High Definition",
      "30m Night Vision",
      "IP67 Weather Proof",
      "Motion Detection",
      "Mobile App Support",
      "Wide Angle View"
    ],
    colors: ["White", "Black"],
    specs: {
      resolution: "2MP (1920 x 1080)",
      sensor: "1/2.7\" CMOS",
      lens: "3.6mm Fixed Lens",
      nightVision: "30m with IR LEDs",
      storage: "Support up to 128GB SD Card",
      powerSupply: "12V DC",
      ip: "IP67 Weatherproof",
      operatingTemp: "-10°C to 50°C",
      dimensions: "70mm x 165mm",
      weight: "400g"
    }
  },
  {
    id: 5,
    name: "Dell OptiPlex Desktop Computer",
    description: "Business-grade desktop computer with powerful performance, reliable security features, and comprehensive manageability for office productivity.",
    price: 49999.99,
    discount: 8,
    category: "Computer",
    brand: "Dell",
    rating: 4.5,
    reviewCount: 118,
    stock: 10,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1442&q=80",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1442&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1442&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1442&q=80"
    ],
    features: [
      "Intel Core i5-12500 Processor",
      "8GB DDR4 RAM",
      "512GB SSD",
      "Intel UHD Graphics",
      "Windows 11 Pro",
      "3 Year Warranty"
    ],
    colors: ["Black"],
    specs: {
      processor: "Intel Core i5-12500, 6 cores",
      memory: "8GB DDR4 3200MHz",
      storage: "512GB M.2 PCIe NVMe SSD",
      graphics: "Intel UHD Graphics 770",
      connectivity: "Wi-Fi 6, Bluetooth 5.2, Gigabit Ethernet",
      ports: "USB 3.2 Gen1 x4, USB 2.0 x2, HDMI, DisplayPort, Audio Jack",
      os: "Windows 11 Pro 64-bit",
      security: "TPM 2.0, Smart Card Reader",
      dimensions: "29.0 x 29.2 x 9.26 cm",
      weight: "5.0 kg"
    }
  },
  {
    id: 6,
    name: "Wooden Wall Shelf Set",
    description: "Beautifully crafted wooden wall shelves for elegant home decor and practical storage solutions. Perfect for living rooms, bedrooms, and offices.",
    price: 2499.99,
    discount: 15,
    category: "Wood Decors",
    brand: "WoodKraft",
    rating: 4.7,
    reviewCount: 85,
    stock: 20,
    image: "https://images.unsplash.com/photo-1594640405198-48dd38dce315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    images: [
      "https://images.unsplash.com/photo-1594640405198-48dd38dce315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1594640405198-48dd38dce315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1594640405198-48dd38dce315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    ],
    features: [
      "Set of 3 Shelves",
      "Premium Sheesham Wood",
      "Wall Mounting Design",
      "Handcrafted",
      "Eco-friendly Finish",
      "Easy Installation"
    ],
    colors: ["Natural Wood", "Walnut", "Mahogany"],
    specs: {
      material: "Sheesham Wood",
      finish: "Matte Lacquer",
      dimensions: ["45 x 20 x 6 cm", "37 x 18 x 6 cm", "30 x 16 x 6 cm"],
      weightCapacity: "Up to 5 kg per shelf",
      mountingType: "Wall Mount",
      includedComponents: "Shelves, Mounting Brackets, Screws",
      maintenance: "Dust with soft cloth",
      assembly: "Assembly Required",
      warranty: "1 Year Manufacturer Warranty",
      origin: "Made in India"
    }
  },
  {
    id: 7,
    name: "Astral CPVC Pipes (10ft)",
    description: "High-quality CPVC plumbing pipes for hot and cold water distribution systems. Corrosion-resistant and long-lasting with excellent thermal properties.",
    price: 899.99,
    discount: 0,
    category: "Pipe Materials",
    brand: "Astral",
    rating: 4.6,
    reviewCount: 72,
    stock: 100,
    image: "https://images.unsplash.com/photo-1581092921461-39b11a63e532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092921461-39b11a63e532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1581092921461-39b11a63e532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1581092921461-39b11a63e532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    features: [
      "CPVC Material",
      "Lead-Free",
      "Corrosion Resistant",
      "Thermal Insulation",
      "High Impact Strength",
      "ISI Certified"
    ],
    colors: ["Off-White"],
    specs: {
      material: "CPVC (Chlorinated Polyvinyl Chloride)",
      length: "10 ft (3 meters)",
      diameter: "Available in 1/2\", 3/4\", 1\", 1.5\"",
      pressureRating: "28 kg/cm² at 27°C",
      temperature: "Suitable for up to 93°C",
      certification: "IS 15778, NSF International",
      warranty: "7 Years Manufacturer Warranty",
      applicationArea: "Hot and Cold Water Plumbing Systems",
      jointing: "Solvent Cement Jointing",
      flow: "Smooth Inner Surface for Better Flow"
    }
  },
  {
    id: 8,
    name: "Wireless Keyboard and Mouse Combo",
    description: "Ergonomic wireless keyboard and mouse set with long battery life and reliable 2.4GHz connectivity. Perfect for office work or home use.",
    price: 1499.99,
    discount: 10,
    category: "Accessories",
    brand: "Logitech",
    rating: 4.5,
    reviewCount: 165,
    stock: 30,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80"
    ],
    features: [
      "Wireless 2.4GHz Technology",
      "12-Month Battery Life",
      "Plug & Play USB Receiver",
      "Spill Resistant Design",
      "Quiet Typing Experience",
      "Compatible with Windows, macOS, Chrome OS"
    ],
    colors: ["Black", "White"],
    specs: {
      connectivity: "2.4GHz Wireless",
      range: "Up to 10 meters",
      batteryKeyboard: "2x AAA (included)",
      batteryMouse: "1x AA (included)",
      batteryLife: "12 months keyboard, 6 months mouse",
      keyboardLayout: "Full-sized with Numeric Keypad",
      mouseResolution: "1000 DPI",
      mouseButtons: "3 (Left, Right, Middle Click)",
      dimensions: "Keyboard: 450 x 155 x 18mm, Mouse: 115 x 60 x 35mm",
      weight: "Keyboard: 500g, Mouse: 90g"
    }
  },
  {
    id: 9,
    name: "Nerolac Impressions HD Paint",
    description: "Premium interior emulsion with high definition color technology for vibrant, long-lasting walls with exceptional washability and coverage.",
    price: 4799.99,
    discount: 5,
    category: "Paints",
    brand: "Nerolac",
    rating: 4.7,
    reviewCount: 95,
    stock: 25,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80"
    ],
    features: [
      "HD Color Technology",
      "Superior Washability",
      "Low VOC & Eco-friendly",
      "Fungus & Algae Resistant",
      "Excellent Coverage",
      "Quick Drying Formula"
    ],
    colors: ["All Premium Shades Available"],
    specs: {
      type: "Premium Interior Emulsion",
      coverage: "140-160 sq. ft/liter",
      dryingTime: "2-3 hours surface dry",
      recoatingTime: "4-6 hours",
      finish: "Silky Smooth Matte",
      dilution: "30-40% with clean water",
      packSize: "20L, 10L, 4L, 1L",
      shelfLife: "3 years from manufacturing",
      application: "Brush, Roller, Spray",
      cleanUp: "Clean water"
    }
  }
];

// Get all products
export const getAllProducts = () => {
  return products;
};

// Get product by id
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

// Search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm)
  );
};

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.5).slice(0, 4);
};

// Get products on sale
export const getProductsOnSale = () => {
  return products.filter(product => product.discount > 0);
}; 