import { build } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'

async function resolveBuild() {
  await build({
    entryPoints: ['src/index.ts', 'node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js'],
    entryNames: '[name]',
    outdir: './',
    minify: true,
    bundle: true,
    format: 'esm',
    platform: 'node',
  })
  let contents = await readFile('index.js', 'utf8')
  contents = contents.replace('./xhr-sync-worker.js', '@plumbiu/md/xhr-sync-worker.js')
  await writeFile('index.js', contents)
}

resolveBuild()
