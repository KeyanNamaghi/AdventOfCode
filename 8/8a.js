var fs = require('fs')

const input = fs
  .readFileSync(`./8_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((val) => val.split('').map(Number))

const isVisibleInRow = (value, arr, index) => {
  const left = arr.slice(0, index).every((val) => val < value)
  const right = arr.slice(index + 1, arr.length).every((val) => val < value)
  return left || right
}

let count = 0

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[0].length; col++) {
    const column = input.map((row) => row[col])

    const visibleRow = isVisibleInRow(input[row][col], input[row], col)
    const visibleCol = isVisibleInRow(input[row][col], column, row)

    if (visibleRow || visibleCol) count++
  }
}

console.log({ count })
