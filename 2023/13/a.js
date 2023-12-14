const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const patterns = contents.split('\n\n').map((patterm) => patterm.split('\n'))

const checkRows = (pattern) => {
  for (let splitPoint = 1; splitPoint < pattern.length; splitPoint++) {
    const above = pattern.slice(0, splitPoint).reverse()
    const below = pattern.slice(splitPoint)

    const matchedLengthAbove = above.slice(0, below.length)
    const matchedLengthBelow = below.slice(0, above.length)

    if (matchedLengthAbove.length !== matchedLengthBelow.length) break

    if (matchedLengthAbove.every((row, index) => row === matchedLengthBelow[index])) {
      return splitPoint
    }
  }
  return 0
}

const transposeColumns = (pattern) => {
  const columns = []
  for (let i = 0; i < pattern[0].length; i++) {
    let column = ''
    for (let j = 0; j < pattern.length; j++) {
      column += pattern[j][i]
    }
    columns.push(column)
  }
  return columns
}

const answer = patterns.reduce((prev, curr) => 100 * checkRows(curr) + checkRows(transposeColumns(curr)) + prev, 0)

const t1 = performance.now()
// 34993 - Took 5.16 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
