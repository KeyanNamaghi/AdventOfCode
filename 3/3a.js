const fs = require('fs')
const input = fs.readFileSync(`./3_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const letterToValue = (letter) => {
  const charCode = letter.charCodeAt()

  if (charCode >= 97) return charCode - 96
  return charCode - 38
}

const data = input
  .split('\n')
  .map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
  .map(([first, second]) => {
    const duplicatedLetter = first.split('').find((item) => {
      return second.indexOf(item) !== -1
    })

    return letterToValue(duplicatedLetter)
  })
  .reduce((prev, curr) => prev + curr, 0)

console.log(data)
