import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          ink: '#141414',
          amber: '#f4b43c',
          teal: '#0f8b8d',
          clay: '#c6542c',
          paper: '#f7f7f3'
        }
      },
      boxShadow: {
        panel: '0 18px 50px rgba(20, 20, 20, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
