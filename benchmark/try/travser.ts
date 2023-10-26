interface Toc {
  level: number
  id: string
  content: string
}
export function md2toc(md: string) {
  let pos = 0
  const len = md.length
  const toc: Toc[] = []
  let entryCode = false
  while (pos < len) {
    if (md[pos] === '`' && md[pos + 1] === '`' && md[pos + 2] === '`') {
      pos += 3
      entryCode = !entryCode
      continue
    }
    if (md[pos - 1] !== '\n') {
      pos++
      continue
    }
    let ch = md[pos]
    if (ch === '#') {
      let level = 1
      let content = ''
      while (ch !== '\n') {
        ch = md[++pos]
        if (ch === '#') {
          level++
        } else {
          content += ch
        }
      }
      content = content.trim()
      toc.push({
        level,
        content,
        id: content.replace(/\s/g, ''),
      })
    }
    pos++
  }
  return toc
}
