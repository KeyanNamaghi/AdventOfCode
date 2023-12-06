const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')
const [times, record] = lines.map((line) => line.split(' ').filter(Boolean).slice(1))

const quadraticRoots = (b, c) => {
  const discriminant = b * b - 4 * -1 * -c
  const root1 = (-b + Math.sqrt(discriminant)) / -2
  const root2 = (-b - Math.sqrt(discriminant)) / -2
  const lower = Number.isInteger(root1) ? root1 + 1 : Math.ceil(root1)
  const upper = Number.isInteger(root2) ? root2 - 1 : Math.floor(root2)
  return upper - lower + 1
}

const answers = times.map((time, index) => quadraticRoots(time, record[index]))
const answer = answers.reduce((acc, cur) => acc * cur, 1)
const t1 = performance.now()

// 781200 - Took 1.27 ms
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms`)
