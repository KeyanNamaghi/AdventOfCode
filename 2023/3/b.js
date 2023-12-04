const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')

const findNumbers = (line, iY) => {
  const numbers = []

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      const number = line.slice(i).match(/\d+/)[0]
      numbers.push({ value: number, iX: i, iY })
      i += number.length
    }
  }
  return numbers
}

const checkAdjacentGears = ({ value, iX, iY }) => {
  const push = (y, x) => {
    const char = lines[y][x]
    if (char === '*') {
      if (!allGears[`${y},${x}`]) allGears[`${y},${x}`] = []
      allGears[`${y},${x}`].push(value)
    }
  }
  const numberLength = value.length

  for (let i = 0; i < numberLength; i++) {
    if (iY > 0) push(iY - 1, iX + i)
    if (iY < lines.length - 1) push(iY + 1, iX + i)
  }

  if (iX > 0) push(iY, iX - 1)
  if (iX < lines[iY].length - numberLength) push(iY, iX + numberLength)

  if (iY > 0) {
    if (iX > 0) push(iY - 1, iX - 1)
    if (iX < lines[iY].length - numberLength) push(iY - 1, iX + numberLength)
  }

  if (iY < lines.length - 1) {
    if (iX > 0) push(iY + 1, iX - 1)
    if (iX < lines[iY].length - numberLength) push(iY + 1, iX + numberLength)
  }
}

const allGears = {}
lines.forEach((line, i) => {
  findNumbers(line, i).forEach(checkAdjacentGears)
})

const result = Object.values(allGears)
  .filter((value) => value.length > 1)
  .map((value) => value.reduce((acc, curr) => acc * +curr, 1))
  .reduce((acc, curr) => acc + curr, 0)

// 81709807
console.log(result)
