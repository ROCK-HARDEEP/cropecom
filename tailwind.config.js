module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode with class-based approach
  theme: {
    extend: {
      colors: {
        primary: "#3498db",    // Electric Blue
        secondary: "#2ecc71",  // Emerald Green
        accent: "#f39c12",     // Orange
        error: "#e74c3c",      // Red
        neutral: {
          100: "#f8f9fa",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#6c757d",
          600: "#343a40",
          700: "#212529"
        }
      },
    },
  },
  plugins: [],
} 