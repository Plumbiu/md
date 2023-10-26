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
  let pos = 0
  const toc: Toc[] = []
  while (((pos = md.indexOf('#')), pos) !== -1) {
    const start = pos
    while (md[pos] === '#') {
      pos++
    }
    const level = pos - start
    if (level > depth) {
      continue
    }
    const content = md.slice(pos + 1, (pos = md.indexOf('\n', pos)))
    const id = content.replace(/\s/g, '')
    toc.push({
      level,
      content,
      id,
    })
    md = md.slice(pos)
  }
  return toc
}
