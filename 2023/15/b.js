const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const steps = contents.split(',')
const hashmap = {}

const calculate = (step) => {
  let current = 0

  for (const char of step) {
    const ascii = char.charCodeAt(0)
    current += ascii
    current *= 17
    current %= 256
  }
  return current
}

for (const step of steps) {
  if (step.includes('=')) {
    const [key, value] = step.split('=')
    const calculated = calculate(key)
    const hashValue = { key, value }

    if (hashmap[calculated]) {
      const found = hashmap[calculated].find((item) => item.key === key)
      if (found) {
        found.value = value
        continue
      }
      hashmap[calculated].push(hashValue)
    } else {
      hashmap[calculated] = [hashValue]
    }

    continue
  }

  const remove = step.slice(0, -1)
  const calculated = calculate(remove)

  if (!hashmap[calculated]) continue
  hashmap[calculated] = hashmap[calculated]?.filter((item) => item.key !== remove)
}

const answer = Object.entries(hashmap).reduce((acc, [key, value]) => {
  return acc + (Number(key) + 1) * value.reduce((acc, item, index) => acc + (index + 1) * item.value, 0)
}, 0)

const t1 = performance.now()
// 291774 - Took 7.90 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
