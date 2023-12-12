const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n').map((line) => {
  const [sequence, pattern] = line.split(' ')
  return [sequence, pattern.split(',').map(Number)]
})

const cache = new Map()
const cachedResult = (cacheKey, result) => {
  cache.set(cacheKey, result)
  return result
}

const countPermutations = (sequence, pattern) => {
  sequence = sequence.replace(/^\.+|\.+$/, '')

  const cacheKey = `${sequence} ${pattern.join(',')}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)

  if (!pattern.length) return sequence.includes('#') ? 0 : 1
  if (sequence === '') return pattern.length ? 0 : 1

  const damagedSprings = sequence.match(/^#+(?=\.|$)/)
  let result = 0

  if (damagedSprings) {
    if (damagedSprings[0].length === pattern[0]) {
      result += countPermutations(sequence.slice(pattern[0]), pattern.slice(1))
    }
    return cachedResult(cacheKey, result)
  }

  result += countPermutations(sequence.replace('?', '.'), pattern)

  const broken = sequence.match(/#/g) ?? []
  const total = pattern.reduce((a, b) => a + b, 0)
  if (broken.length < total) {
    result += countPermutations(sequence.replace('?', '#'), pattern)
  }

  return cachedResult(cacheKey, result)
}

const answer = lines.reduce((prev, curr) => countPermutations(...curr) + prev, 0)

const t1 = performance.now()
// 7622 - Took 94.3 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
