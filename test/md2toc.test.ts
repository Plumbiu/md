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
    { level: 1, content: 'hello', id: 'hello' },
    { level: 2, content: 'world', id: 'world' },
    { level: 2, content: 'foo', id: 'foo' },
    { level: 1, content: 'bar', id: 'bar' },
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
    { level: 1, content: 'hello world', id: 'helloworld' },
    { level: 2, content: 'world', id: 'world' },
    { level: 2, content: 'foo', id: 'foo' },
    { level: 1, content: 'bar', id: 'bar' },
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
  const toc = md2toc(md)

  expect(toc).toEqual([
    { level: 1, content: 'hello world', id: 'helloworld' },
    { level: 2, content: 'world', id: 'world' },
    { level: 2, content: 'foo', id: 'foo' },
    { level: 1, content: 'bar', id: 'bar' },
  ])
})
