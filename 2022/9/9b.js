var fs = require('fs')

const input = fs
  .readFileSync(`./9_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((instruction) => {
    const [direction, number] = instruction.split(' ')
    return [direction, +number]
  })

const rope = new Array(10).fill(0).map(() => {
  return { x: 0, y: 0 }
})

const visited = { '0,0': true }

const pullTail = (leader, follower, last) => {
  const xDelta = leader.x - follower.x
  const yDelta = leader.y - follower.y

  // Don't need to pull
  if (Math.abs(xDelta) <= 1 && Math.abs(yDelta) <= 1) return

  follower.x += Math.sign(xDelta)
  follower.y += Math.sign(yDelta)

  if (last) visited[`${follower.x},${follower.y}`] = true
}

const stepMap = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0],
}

input.forEach(([direction, steps]) => {
  for (let i = 0; i < steps; i += 1) {
    rope[0].x += stepMap[direction][0]
    rope[0].y += stepMap[direction][1]

    for (let index = 0; index < rope.length - 1; index++) {
      pullTail(rope[index], rope[index + 1], index === 8)
    }
  }
})

console.log(Object.values(visited).length)
