var fs = require('fs')

const input = fs
  .readFileSync(`./10_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((instruction) => {
    const [operation, number] = instruction.split(' ')
    return { operation, number: Number(number || 0), cycles: operation === 'noop' ? 1 : 2 }
  })

let cycle = 0
let registerX = 1
const display = []

const drawPixel = () => display.push(Math.abs(cycle - Math.floor(cycle / 40) * 40 - registerX) < 2 ? '⬜️' : '⬛️')

for (const signal of input) {
  drawPixel()
  cycle++

  if (signal.cycles === 2) {
    drawPixel()

    cycle++
    registerX += signal.number
  }
}

for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 40; x++) {
    process.stdout.write(display[40 * y + x])
  }

  // End line
  process.stdout.write(`\n`)
}

// ⬜️⬜️⬜️⬜️⬛️⬛️⬜️⬜️⬛️⬛️⬛️⬛️⬜️⬜️⬛️⬜️⬜️⬜️⬛️⬛️⬛️⬜️⬜️⬛️⬛️⬛️⬜️⬜️⬛️⬛️⬜️⬜️⬜️⬜️⬛️⬜️⬛️⬛️⬜️⬛️
// ⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬛️⬛️
// ⬜️⬜️⬜️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬜️⬜️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬜️⬜️⬛️⬛️⬜️⬜️⬛️⬛️⬛️
// ⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬜️⬜️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬛️⬛️
// ⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬜️⬛️⬛️
// ⬜️⬜️⬜️⬜️⬛️⬛️⬜️⬜️⬜️⬛️⬛️⬜️⬜️⬛️⬛️⬜️⬜️⬜️⬛️⬛️⬛️⬜️⬜️⬜️⬛️⬛️⬜️⬜️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️
