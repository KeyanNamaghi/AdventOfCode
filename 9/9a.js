var fs = require('fs')

// If the head is ever two steps directly up, down, left, or right from the tail,
//  the tail must also move one step in that direction so it remains close enough:

const input = fs
  .readFileSync(`./9_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((instruction) => {
    const [direction, number] = instruction.split(' ')
    return [direction, +number]
  })

const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }
const visited = { '0,0': true }

const pullTail = () => {
  const xDelta = head.x - tail.x
  const yDelta = head.y - tail.y

  // Don't need to pull
  if (Math.abs(xDelta) <= 1 && Math.abs(yDelta) <= 1) return

  // Pull in straight line
  if (xDelta > 0 && yDelta === 0) tail.x += 1
  if (xDelta < 0 && yDelta === 0) tail.x -= 1
  if (xDelta === 0 && yDelta > 0) tail.y += 1
  if (xDelta === 0 && yDelta < 0) tail.y -= 1

  // Pull Diagonally
  if (xDelta > 0 && yDelta > 0) {
    tail.x += 1
    tail.y += 1
  }
  if (xDelta > 0 && yDelta < 0) {
    tail.x += 1
    tail.y -= 1
  }
  if (xDelta < 0 && yDelta > 0) {
    tail.x -= 1
    tail.y += 1
  }
  if (xDelta < 0 && yDelta < 0) {
    tail.x -= 1
    tail.y -= 1
  }

  visited[`${tail.x},${tail.y}`] = true
}

const stepMap = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0],
}

input.forEach(([direction, steps]) => {
  for (let i = 0; i < steps; i += 1) {
    head.x += stepMap[direction][0]
    head.y += stepMap[direction][1]
    pullTail()
  }
})

console.log(Object.keys(visited).length)
