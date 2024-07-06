import tsup from 'tsup';

export default tsup.defineConfig({
  entry: ['./server.ts'],
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  tsconfig: './tsconfig.json',
  outDir: './dist',
  skipNodeModulesBundle: true,
  external: ['lightningcss'],
  noExternal: [],
});
