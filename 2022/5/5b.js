var fs = require('fs')

const [rawStacks, rawInstructions] = fs
  .readFileSync(`./5_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n\n')

const stacks = rawStacks.split('\n')

const formattedStacks = new Array(Math.floor(stacks[0].length / 3)).fill(0).map(() => [])

// Build initial state
for (let stackIndex = 0; stackIndex < stacks.length - 1; stackIndex++) {
  for (let index = 1; index < stacks[0].length - 1; index += 4) {
    const value = stacks[stackIndex][index].trim()
    if (value) {
      formattedStacks[(index - 1) / 4].unshift(value)
    }
  }
}

console.log(formattedStacks)

const moveCargo = (amount, from, to) => {
  const removed = []
  for (let index = 0; index < amount; index++) {
    removed.unshift(formattedStacks[from - 1].pop())
  }
  for (let index = 0; index < amount; index++) {
    formattedStacks[to - 1].push(removed[index])
  }
}

rawInstructions.split('\n').forEach((instruction) => {
  const instructionArray = instruction.split(' ')
  const moveAmount = instructionArray[1]
  const moveFrom = instructionArray[3]
  const moveTo = instructionArray[5]
  //   console.log({ moveAmount, moveFrom, moveTo })

  moveCargo(moveAmount, moveFrom, moveTo)
})
console.log(formattedStacks)

console.log(formattedStacks.map((val) => val[val.length - 1]).join(''))
