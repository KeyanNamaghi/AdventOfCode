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

const checkAdjacent = ({ value, iX, iY }) => {
  const numberLength = value.length
  const neighbouring = []

  for (let i = 0; i < numberLength; i++) {
    if (iY > 0) neighbouring.push(lines[iY - 1][iX + i])
    if (iY < lines.length - 1) neighbouring.push(lines[iY + 1][iX + i])
  }

  if (iX > 0) neighbouring.push(lines[iY][iX - 1])
  if (iX < lines[iY].length - numberLength) neighbouring.push(lines[iY][iX + numberLength])

  if (iY > 0) {
    if (iX > 0) neighbouring.push(lines[iY - 1][iX - 1])
    if (iX < lines[iY].length - numberLength) neighbouring.push(lines[iY - 1][iX + numberLength])
  }

  if (iY < lines.length - 1) {
    if (iX > 0) neighbouring.push(lines[iY + 1][iX - 1])
    if (iX < lines[iY].length - numberLength) neighbouring.push(lines[iY + 1][iX + numberLength])
  }

  return neighbouring.filter((n) => n !== '.' && isNaN(n)).length > 0
}

const allNumbers = []
lines.forEach((line, i) => {
  const details = findNumbers(line, i)
  allNumbers.push(...details)
})

const result = allNumbers.filter(checkAdjacent).reduce((acc, curr) => acc + +curr.value, 0)

// 538046
console.log(result)
