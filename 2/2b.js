// The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end:
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

// The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated.
// The example above now goes like this:

// In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock.
// This gives you a score of 1 + 3 = 4.
// In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
// In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
// Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

var fs = require('fs')

const scoring = {
  'A X': 3 + 0,
  'B X': 1 + 0,
  'C X': 2 + 0,
  'A Y': 1 + 3,
  'B Y': 2 + 3,
  'C Y': 3 + 3,
  'A Z': 2 + 6,
  'B Z': 3 + 6,
  'C Z': 1 + 6,
}

const totalScore = fs
  .readFileSync(`./2_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((round) => scoring[round])
  .reduce((prev, curr) => +prev + +curr, 0)

console.log('Score: ', totalScore)
