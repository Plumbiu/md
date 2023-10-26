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