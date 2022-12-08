var fs = require('fs')

// rock = A | X = 1  paper = B | Y = 2  scissors = C | Z = 3  loss = 0   draw = +3   win = +6

const scoring = {
  'A X': 1 + 3,
  'B X': 1 + 0,
  'C X': 1 + 6,
  'A Y': 2 + 6,
  'B Y': 2 + 3,
  'C Y': 2 + 0,
  'A Z': 3 + 0,
  'B Z': 3 + 6,
  'C Z': 3 + 3,
}

const totalScore = fs
  .readFileSync(`./2_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((round) => scoring[round])
  .reduce((prev, curr) => +prev + +curr, 0)

console.log('Score: ', totalScore)
