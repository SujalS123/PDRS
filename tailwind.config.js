/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#4CAF50",
            light: "#81C784",
            dark: "#388E3C",
            lighter: "#C8E6C9",
            darker: "#2E7D32",
          },
          secondary: {
            DEFAULT: "#FFFFFF",
            light: "#F8F9FA",
            dark: "#E9ECEF",
          },
          accent: {
            DEFAULT: "#E8F5E9",
            light: "#F1F8E9",
            dark: "#C8E6C9",
          },
          dietrium: {
            light: '#e6f4ea',    // Soft mint green (background)
            DEFAULT: '#4CAF50',  // Fresh green (main buttons)
            dark: '#2e7d32',     // Deep green (hover, highlights)
          }
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        boxShadow: {
          'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    plugins: [], // Plugins for extra features (we'll keep it empty for now)
  };
  