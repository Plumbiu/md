import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: true,
  format: 'esm',
  clean: true,
  bundle: true,
  minify: true,
  dts: true,
  noExternal: [/(.*)/],
})
