const fs = require('fs')
const input = fs.readFileSync(`./3_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const letterToValue = (letter) => {
  const charCode = letter.charCodeAt()

  if (charCode >= 97) return charCode - 96
  return charCode - 38
}

const data = input.split('\n')

let groupedData = []

for (let index = 0; index < data.length; index += 3) {
  groupedData.push([data[index], data[index + 1], data[index + 2]])
}

groupedData = groupedData
  .map(([first, second, third]) => {
    const duplicatedLetter = first.split('').find((item) => {
      return second.indexOf(item) !== -1 && third.indexOf(item) !== -1
    })

    return letterToValue(duplicatedLetter)
  })
  .reduce((prev, curr) => prev + curr, 0)

console.log(groupedData)
