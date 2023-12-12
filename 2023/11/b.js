const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()

const lines = contents
  .split('\n')
  .map((line) => (line.includes('#') ? line : new Array(line.length).fill('-').join('')))
  .map((line) => line.split(''))

const width = lines[0].length
const expansion = 1000000

function isColumnContainingHash(columnIndex) {
  for (let i = 0; i < width; i++) {
    if (lines[i][columnIndex] === '#') {
      return true
    }
  }
  return false
}

const galaxies = []

for (let i = 0; i < lines.length; i++) {
  const hasGalaxy = isColumnContainingHash(i)
  for (let j = 0; j < width; j++) {
    if (lines[j][i] === '#') {
      galaxies.push([j, i])
    }

    if (!hasGalaxy) {
      lines[j][i] = lines[j][i] === '-' ? '+' : '|'
    }
  }
}

const calculateDistance = ([yStart, xStart], [yEnd, xEnd]) => {
  let distance = 0

  for (let i = xStart; i !== xEnd; i = i + (xStart > xEnd ? -1 : 1)) {
    distance = ['+', '|'].includes(lines[yStart][i]) ? distance + expansion : distance + 1
  }

  for (let j = yStart; j !== yEnd; j = j + (yStart > yEnd ? -1 : 1)) {
    distance = ['-', '+'].includes(lines[j][xStart]) ? distance + expansion : distance + 1
  }

  return distance
}

let answer = 0

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    answer += calculateDistance(galaxies[i], galaxies[j])
  }
}

const t1 = performance.now()
// 635832237682 - Took 213 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
