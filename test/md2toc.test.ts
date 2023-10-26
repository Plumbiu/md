import { md2toc } from 'src'
import { expect, test } from 'vitest'

test('base test', () => {
  const md = `
# hello

## world

你好

## foo

# bar
`
  const toc = md2toc(md)

  expect(toc).toEqual([
    { level: 1, title: 'hello' },
    { level: 2, title: 'world' },
    { level: 2, title: 'foo' },
    { level: 1, title: 'bar' },
  ])
})

test('with s test', () => {
  const md = `
# hello world

## world

你好

## foo

# bar
`
  const toc = md2toc(md)

  expect(toc).toEqual([
    { level: 1, title: 'hello world' },
    { level: 2, title: 'world' },
    { level: 2, title: 'foo' },
    { level: 1, title: 'bar' },
  ])
})

test('python comment', () => {
  const md = `
# hello world

## world

你好

## foo

\`\`\`python
# heelo
\`\`\`
hello world # 你好
# bar
`
  const toc = md2toc(md, {
    isPython: true,
  })

  expect(toc).toEqual([
    { level: 1, title: 'hello world' },
    { level: 2, title: 'world' },
    { level: 2, title: 'foo' },
    { level: 1, title: 'bar' },
  ])
})
