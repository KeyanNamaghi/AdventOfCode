var fs = require('fs')

let starts = []
let end

const input = fs
  .readFileSync(`./12_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((row, y) =>
    row.split('').map((height, x) => {
      if (height === 'S' || height === 'a') {
        starts.push([x, y, 0])
        return 1
      }
      if (height === 'E') {
        end = [x, y]
        return 26
      }
      return height.charCodeAt(0) - 96
    }),
  )

const findMinSteps = ({ start, end, input }) => {
  const visited = {}
  const open = [start]

  while (open.length) {
    const [x, y, previousStep] = open.shift()
    const key = `${x},${y}`

    if (visited[key]) {
      continue
    }

    visited[key] = true

    // Check if we are at the end
    if (x === end[0] && y === end[1]) {
      return previousStep
    }

    const height = input[y][x]
    let step = previousStep + 1

    if (x > 0 && input[y][x - 1] - height <= 1) {
      open.push([x - 1, y, step])
    }

    if (x < input[0].length - 1 && input[y][x + 1] - height <= 1) {
      open.push([x + 1, y, step])
    }

    if (y > 0 && input[y - 1][x] - height <= 1) {
      open.push([x, y - 1, step])
    }

    if (y < input.length - 1 && input[y + 1][x] - height <= 1) {
      open.push([x, y + 1, step])
    }
  }
}

let shortest = Infinity
starts.forEach((start) => {
  const length = findMinSteps({ start, end, input })
  if (length < shortest) {
    shortest = length
  }
})

console.log({ shortest })
