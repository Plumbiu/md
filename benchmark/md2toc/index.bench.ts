import { md2toc as v0_3_3 } from './unstable/v0_3_3'
import { md2toc as v0_3_4 } from './unstable/v0_3_4'
import { md2toc } from '../../src/md'
import { bench } from 'vitest'
import fs from 'node:fs'
import { dirname, join } from 'node:path'

// 文件的路径
const __dirname = dirname(__filename)
const md = fs.readFileSync(join(__dirname, './test.md'), 'utf-8')

bench(
  'latest',
  () => {
    md2toc(md)
  },
  { time: 100 },
)

bench(
  'v0_3_4',
  () => {
    v0_3_4(md)
  },
  { time: 100 },
)

bench(
  'v0_3_3',
  () => {
    v0_3_3(md)
  },
  { time: 100 },
)
