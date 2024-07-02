import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import commonjs from 'vite-plugin-commonjs';
import reactNativeWeb from 'vite-plugin-react-native-web';

export default defineConfig({
  root: 'web',
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('nativewind/postcss')],
    },
  },
  server: {port: 3000},
  plugins: [
    commonjs(),
    react({
      babel: {
        plugins: [
          ['nativewind/babel', {mode: 'transformOnly'}],
          'react-native-reanimated/plugin',
        ],
        presets: [],
      },
    }),
    reactNativeWeb(),
  ],
});
