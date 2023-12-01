var fs = require('fs')

const input = fs
  .readFileSync(`./10_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((instruction) => {
    const [operation, number] = instruction.split(' ')
    return { operation, number: Number(number || 0), cycles: operation === 'noop' ? 1 : 2 }
  })

let registerX = 1
const valueHistory = [1]

for (const signal of input) {
  valueHistory.push(registerX)

  if (signal.cycles === 2) {
    valueHistory.push(registerX)
    registerX += signal.number
  }
}

const signalStrengths = {
  20: 20 * valueHistory[20],
  60: 60 * valueHistory[60],
  100: 100 * valueHistory[100],
  140: 140 * valueHistory[140],
  180: 180 * valueHistory[180],
  220: 220 * valueHistory[220],
}

const answer = Object.values(signalStrengths).reduce((prev, curr) => prev + curr, 0)

console.log({ answer })
