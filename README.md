# @plumbiu/md

this respository is used for [@plumbiu/blog](https://github.com/Plumbiu/blog) as I don't want to install too many dependencies

## Feature

- lazy loading for `<img />`
- Toc API

## Usage

### md2html

```ts
/*
  function md2html(md: string, options?: {
    lazy?: boolean
  }): Promise<string>
*/
import { md2html } from '@plumbiu/md'

await md2html('# hello\r\nworld', {
  // if lazy option is true, img label will be <img loading="lazy" />
  lazy: true, // true by default
})
/*
  <h1>hello</h1>
  <p>World</p>
*/
```

### html2toc

```ts
/*
  function html2Toc(html: string, options?: {
    depth: number
  }): {
    level: number
    content: string
    hash: string
  }[]
*/

import { md2html } from '@plumbiu/md'

await md2toc('<h1 id="hello-world">hello world</h1>', {
  // depth mean the toc depth
  depth: 3 // 3 by default
})

/*
  [
    { level: 1, content: 'hello world', hash: 'hello-world' }
  ]
*/
```

### styles

`@plumbiu/md` offer the `highliht.js` and `github-markdown-light.css` style

```ts
import '@plumbiu/styles/github-markdown-light.css'
// for code block
import '@plumbiu/styles/hljs-markdown-light.css'
```