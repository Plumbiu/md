interface Md2htmlOpts {
  lazy?: boolean
}

interface Toc {
  level: number
  content: string
  hash: string
}

interface Html2TocOpts {
  depth: number
}

declare module '@plumbiu/md' {
  export function html2toc(html: string, options?: Html2TocOpts): Toc[]
  export function md2html(md: string, options?: Md2htmlOpts): Promise<string>
}
