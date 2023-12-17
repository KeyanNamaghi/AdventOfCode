const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const steps = contents.split(',')
let answer = 0

for (const step of steps) {
  let current = 0

  for (const char of step) {
    const ascii = char.charCodeAt(0)
    current += ascii
    current *= 17
    current %= 256
  }
  answer += current
}

const t1 = performance.now()
// 510388 - Took 4.93 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
