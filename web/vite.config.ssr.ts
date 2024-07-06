import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import {defineConfig} from 'vite';
import commonjs from 'vite-plugin-commonjs';
import reactNativeWeb from 'vite-plugin-react-native-web';

export default defineConfig({
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('nativewind/postcss')],
    },
  },
  build: {
    rollupOptions: {
      input: 'web/entry-server.tsx',
      plugins: [
        inject({
          include: '../node_modules/@react-navigation/**',
          window: 'global/window',
        }),
        inject({
          include: '../node_modules/react-native-gesture-handler/**',
          window: 'global/window',
        }),
      ],
      output: {
        preserveModules: true,
      },
    },
  },
  ssr: {
    noExternal: true,
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
    preserveDirectives(),
  ],
});
