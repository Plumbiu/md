import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: true,
  format: 'esm',
  clean: true,
  bundle: true,
  target: 'es5',
  minify: true,
  dts: true,
  external: ['rehype-preset-minify'],
  // bundle all packages, nextjs will break in build process
  noExternal: [
    'html2toc',
    'rehype-highlight',
    'rehype-sanitize',
    'rehype-slug',
    'rehype-stringify',
    /remark-*/,
    'simple-md-front-matter',
  ],
})
