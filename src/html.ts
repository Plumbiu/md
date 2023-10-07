import { JSDOM } from 'jsdom'

export function html2toc(
  html: string,
  options: Html2TocOpts = {
    depth: 3,
  },
) {
  const { depth } = options
  const hs: string[] = []
  for (let i = 1; i <= depth; i++) {
    hs.push('h' + i)
  }
  const tocs: Toc[] = []
  const { window } = new JSDOM(html)
  const headings = window.document.querySelectorAll(hs.join(','))
  for (const heading of headings) {
    tocs.push({
      level: +heading.tagName.replace(/h/i, ''),
      content: heading.textContent!,
      hash: '#' + heading.id,
    })
  }
  return tocs
}
