const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')

const transposed = lines.map((line, index) => {
  const column = []
  for (let i = 0; i < line.length; i++) {
    column.push(lines[i][index])
  }
  return column.join('')
})

const sorted = transposed.map((line) =>
  line
    .split('#')
    .map((substr) =>
      substr
        .split('')
        .sort((a) => (a !== 'O' ? 1 : -1))
        .join(''),
    )
    .join('#'),
)

const answer = sorted
  .map((line) =>
    line
      .split('')
      .reverse()
      .reduce((prev, curr, index) => prev + (curr === 'O' ? index + 1 : 0), 0),
  )
  .reduce((prev, curr) => prev + curr, 0)

const t1 = performance.now()
// 108144 - Took 7.39 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
