var fs = require('fs')

const input = fs
  .readFileSync(`./8_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((val) => val.split('').map(Number))

const treesVisible = (val, arr) => {
  let score = 0
  for (let index = 0; index < arr.length; index++) {
    score += 1
    if (arr[index] >= val) break
  }

  return score
}

const isVisibleInRow = (value, arr, index) => {
  const left = arr.slice(0, index).reverse()
  const right = arr.slice(index + 1, arr.length)

  const scoreL = treesVisible(value, left)
  const scoreR = treesVisible(value, right)

  return scoreL * scoreR
}

let count = 0

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[0].length; col++) {
    const column = input.map((row) => row[col])

    const visibleRow = isVisibleInRow(input[row][col], input[row], col)
    const visibleCol = isVisibleInRow(input[row][col], column, row)

    if (count < visibleRow * visibleCol) count = visibleRow * visibleCol
  }
}

console.log({ count })
