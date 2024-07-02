module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './App.web.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      light: {
        DEFAULT: '#FFFFFF',
      },
      gray: {
        100: '#E7EAF3',
        400: '#B0B8D0',
        500: '#5C6787',
        700: '#485475',
        800: '#171B26',
        900: '#0F121A',
        950: '#08090D',
        DEFAULT: '#F8F8FC',
      },
      primary: {
        DEFAULT: '#3466F6',
        600: '#2254E2',
        tr15: '#2254E225',
      },
      orange: {
        DEFAULT: '#F7A608',
      },
      red: {
        DEFAULT: '#F74108',
        600: '#D93C0A',
        tr15: '#F7410826',
        tr5: '#F741080D',
      },
      green: {
        DEFAULT: '#76C149',
        tr5: '#76C1490D',
        600: '#79b555',
      },
    },
    fontFamily: {
      // mono: ['Yekan Bakh'],
      // sans: ['Yekan Bakh'],
      // serif: ['Yekan Bakh'],
    },
  },
  plugins: [require('nativewind/tailwind/css')],
};
