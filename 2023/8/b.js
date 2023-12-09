const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const [instructions, , ...lines] = contents.split('\n')

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm(a, b) {
  return (a * b) / gcd(a, b)
}

const parseLine = (line) => {
  const start = line.slice(0, 3)
  const [left, right] = line.slice(7, -1).split(', ')
  return { start, left, right }
}

const directions = {}
lines.forEach((line) => {
  const { start, left, right } = parseLine(line)
  directions[start] = { left, right }
})

const calculateSteps = (start) => {
  let index = 0
  let location = start
  let steps = 0

  while (true) {
    steps++
    const instruction = instructions[index]
    const { left, right } = directions[location]

    if (instruction === 'L') {
      location = left
    } else {
      location = right
    }
    if (location[2] === 'Z') break

    index++
    if (index > instructions.length - 1) {
      index = 0
    }
  }
  return steps
}

const starts = Object.keys(directions).filter((key) => key[2] === 'A')
const steps = starts.reduce((acc, start) => lcm(acc, calculateSteps(start)), 1)

const t1 = performance.now()

// 14631604759649 - Took 6.57 ms
console.log(`${steps} - Took ${(t1 - t0).toPrecision(3)} ms.`)
