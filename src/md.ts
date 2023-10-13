import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface Md2htmlOpts {
  lazy: boolean
}

export async function md2html(
  md: string,
  options: Md2htmlOpts = {
    lazy: true,
  },
) {
  const { lazy } = options
  const file = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(remarkGfm)
    .process(md)
  let markdown = String(file)
  if (lazy) {
    markdown = markdown.replace(/<img/g, "<img loading='lazy'")
  }
  return markdown
}

interface Md2tocOpts {
  depth: number
}

interface Toc {
  level: number
  id: string
  content: string
}

export function md2toc(
  md: string,
  options: Md2tocOpts = {
    depth: 3,
  },
) {
  const { depth } = options
  const TITLE = new RegExp(`#{1,${depth}}\\s(.*)`, 'g')
  let m: RegExpExecArray | null
  const toc: Toc[] = []
  while ((m = TITLE.exec(md))) {
    const title = m[0]
    const level = title.indexOf('# ') + 1
    const content = title.slice(level + 1)
    toc.push({
      level,
      content,
      id: content.replace(/\s/g, ''),
    })
  }
  return toc
}