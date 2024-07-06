const tailwindConfig = require('../tailwind.config');

module.exports = {
  ...tailwindConfig,
  content: [
    '../App.{js,jsx,ts,tsx}',
    '../App.web.{js,jsx,ts,tsx}',
    '../src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './entry-client.tsx',
    './entry-server.tsx',
  ],
};
