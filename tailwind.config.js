/** @type {import('tailwindcss').Config} */
const config = {
  // CRITICAL: These paths tell Tailwind's compiler exactly where your utility classes are used.
  content: [
    // Include all files within the main app/ folder and the nested shared folder
    './src/app/**/*.{js,ts,jsx,tsx}', 
    
    // Include all general components
    './src/components/**/*.{js,ts,jsx,tsx}',
    
    // Include the deep, nested route groups and utility files
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/match/**/*.{js,ts,jsx,tsx}',
    './src/tournaments/**/*.{js,ts,jsx,tsx}',
    './src/players/**/*.{js,ts,jsx,tsx}',
    './src/analytics/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// IMPORTANT: Switched from module.exports (CommonJS) to export default (ES Module) to fix the error.
export default config;
