const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
let lines = contents.split('\n')

const transpose = (matrix) =>
  matrix.map((line, index) => {
    const column = []
    for (let i = 0; i < line.length; i++) {
      column.push(matrix[i][index])
    }
    return column.join('')
  })

function rotate90Degrees(matrix) {
  const joined = matrix.map((row) => row)
  return joined.map((_value, index) => joined.map((row) => row[index]).reverse()).map((row) => row.join(''))
}

const tiltLever = (matrix) =>
  transpose(
    transpose(matrix).map((line) =>
      line
        .split('#')
        .map((substr) =>
          substr
            .split('')
            .sort((a) => (a !== 'O' ? 1 : -1))
            .join(''),
        )
        .join('#'),
    ),
  )

const seen = new Set()
let cycles = 0

while (true) {
  cycles++
  for (let i = 0; i < 4; i++) {
    lines = rotate90Degrees(tiltLever(lines))
  }

  const stringifiedLines = JSON.stringify(lines)
  if (seen.has(stringifiedLines)) break
  seen.add(stringifiedLines)
}

const states = [...seen]
const offset = states.indexOf(JSON.stringify(lines)) + 1

const final = states[((1_000_000_000 - offset) % (cycles - offset)) + offset - 1]

const answer = JSON.parse(final)
  .map((line) => line.split('').filter((char) => char === 'O').length)
  .reverse()
  .reduce((prev, curr, i) => prev + (i + 1) * curr, 0)

const t1 = performance.now()
// 108404 - Took 966 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
