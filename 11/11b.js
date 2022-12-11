var fs = require('fs')

const input = fs
  .readFileSync(`./11_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n\n')
  .map((instruction) => {
    const monkeyData = instruction.split('\n')
    return {
      monkey: Number(monkeyData[0].match(/\d+/)[0]),
      items: monkeyData[1]
        .match(/Starting items: (.*)/)[1]
        .split(',')
        .map(Number),
      operation: (old) => eval(monkeyData[2].match(/Operation: new = (.*)/)[1]),
      test: Number(monkeyData[3].match(/Test: divisible by (.*)/)[1]),
      true: Number(monkeyData[4].match(/If true: throw to monkey (.*)/)[1]),
      false: Number(monkeyData[5].match(/If false: throw to monkey (.*)/)[1]),
      inspectedCount: 0,
    }
  })

// Need to scale things down to avoid overflowing
const scaleDown = input.map((monkey) => monkey.test).reduce((a, b) => a * b, 1)

for (let round = 0; round < 10000; round++) {
  for (const monkey of input) {
    while (monkey.items.length > 0) {
      const inspectedItem = monkey.items.shift()
      const worryFromItem = monkey.operation(inspectedItem) % scaleDown
      const monkeyToThrowTo = monkey[worryFromItem % monkey.test === 0]

      input[monkeyToThrowTo].items.push(worryFromItem)
      monkey.inspectedCount += 1
    }
  }
}

const answer = input
  .map((monkeyFinalStates) => monkeyFinalStates.inspectedCount)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((prev, curr) => prev * curr, 1)

console.log({ answer })
