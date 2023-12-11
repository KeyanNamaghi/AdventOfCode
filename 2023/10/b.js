const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')

const distances = {}

function shoelaceFormula(vertices) {
  let sum1 = 0
  let sum2 = 0

  for (let i = 0; i < vertices.length - 1; i++) {
    sum1 += vertices[i][0] * vertices[i + 1][1]
    sum2 += vertices[i][1] * vertices[i + 1][0]
  }
  sum1 += vertices[vertices.length - 1][0] * vertices[0][1]
  sum2 += vertices[vertices.length - 1][1] * vertices[0][0]

  return 0.5 * Math.abs(sum1 - sum2)
}

const findStart = () => {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === 'S') {
        return [x, y]
      }
    }
  }
}
let [posX, posY] = findStart()

const findStartingRoutes = (x, y) => {
  const routes = []
  if (lines[y][x + 1] === '-' || lines[y][x + 1] === '7' || lines[y][x + 1] === 'J') {
    routes.push([x + 1, y])
  }
  if (lines[y][x - 1] === '-' || lines[y][x - 1] === 'L' || lines[y][x - 1] === 'F') {
    routes.push([x - 1, y])
  }
  if (lines[y + 1][x] === '|' || lines[y + 1][x] === 'L' || lines[y + 1][x] === 'J') {
    routes.push([x, y + 1])
  }
  if (lines[y - 1][x] === '|' || lines[y - 1][x] === '7' || lines[y - 1][x] === 'F') {
    routes.push([x, y - 1])
  }
  return routes
}

const findNext = (x, y, prevX, prevY, distance) => {
  const tile = lines[y][x]
  if (tile === 'S') {
    return
  }

  if (!distances[`${x},${y}`] || distances[`${x},${y}`] >= distance) {
    distances[`${x},${y}`] = distance
  }

  switch (tile) {
    case '|':
      return findNext(x, y + (y - prevY), x, y, distance + 1)
    case '-':
      return findNext(x > prevX ? x + 1 : x - 1, y, x, y, distance + 1)
    case 'L':
      return findNext(y === prevY ? x : x + 1, y === prevY ? y - 1 : y, x, y, distance + 1)
    case 'J':
      return findNext(y === prevY ? x : x - 1, y === prevY ? y - 1 : y, x, y, distance + 1)
    case '7':
      return findNext(y === prevY ? x : x - 1, y === prevY ? y + 1 : y, x, y, distance + 1)
    case 'F':
      return findNext(y === prevY ? x : x + 1, y === prevY ? y + 1 : y, x, y, distance + 1)
    case '.':
    default:
      throw new Error(`Unknown tile ${tile}`)
  }
}

const routes = findStartingRoutes(posX, posY)

routes.forEach((route) => {
  findNext(route[0], route[1], posX, posY, 1)
})

// https://en.wikipedia.org/wiki/Shoelace_formula
// https://en.wikipedia.org/wiki/Pick%27s_theorem
const coords = Object.keys(distances).map((key) => key.split(',').map(Number))
const internal = shoelaceFormula(coords) - coords.length / 2 + 1

const t1 = performance.now()
// 467 - Took 27.8 ms
console.log(`${internal} - Took ${(t1 - t0).toPrecision(3)} ms.`)
