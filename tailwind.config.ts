import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        'heading': '2rem',
        'subtitle': '1.1rem',
        'control-text': '1rem',
      },
      colors: {
        'rover-dark': '#121212',
        'rover-card': '#1E1E1E',
        'rover-text': '#FFFFFF',
        'rover-disconnect': '#FF4444',
        'rover-button': '#FFFFFF',
        'rover-button-text': '#000000',
        'rover-border': '#333333',
      },
      spacing: {
        'control-gap': '1rem',
        'section-gap': '2rem',
      },
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
