import React from 'react';

const Services = () => {
  // Array of services
  const services = [
    {
      title: "Printer Service",
      description: "Expert repair and maintenance for all types of printers. Includes cleaning, part replacement, and software troubleshooting.",
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Toner & Cartridge Refill",
      description: "Affordable refill services for printer toners and ink cartridges. Save money while reducing environmental waste.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Carpenter Work",
      description: "Professional carpentry services for furniture repair, custom installations, and woodwork projects for your home or office.",
      image: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Waterproof & Paint Work",
      description: "Quality waterproofing and painting services to protect and beautify your spaces with durable, long-lasting results.",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Plumbing Work",
      description: "Reliable plumbing services for installations, repairs, and maintenance. We handle everything from leaky faucets to pipe replacements.",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Mobile Service",
      description: "Complete mobile device repair and maintenance services. Screen replacements, battery replacements, and software troubleshooting.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&q=80"
    },
    {
      title: "Computer Service",
      description: "Comprehensive computer repair and maintenance services. Hardware upgrades, software installation, and system optimization.",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    },
    {
      title: "CCTV / Camera Fixing",
      description: "Professional installation and repair of security cameras and CCTV systems for your home or business premises.",
      image: "https://images.unsplash.com/photo-1541401154946-62f8d84bd284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 dark:bg-gray-700">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>
              <button className="text-primary dark:text-indigo-400 font-medium">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-primary dark:bg-indigo-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need Technical Assistance?</h2>
        <p className="mb-6">Our team of experts is ready to help you with any technical issues.</p>
        <button className="bg-white text-primary dark:text-indigo-600 px-6 py-2 rounded-lg font-medium">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Services;