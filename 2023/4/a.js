const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')

const scratchCards = lines.map((line) =>
  line
    .split(':')[1]
    .split('|')
    .map((n) =>
      n
        .trim()
        .split(' ')
        .filter((item) => item !== ''),
    ),
)

const points = scratchCards.map((card) => {
  const [winningNumbers, numbers] = card
  const points = winningNumbers.filter((n) => numbers.includes(n)).length
  if (!points) return 0
  return 2 ** (points - 1)
})

const result = points.reduce((acc, curr) => acc + curr, 0)
// 20107
console.log(result)
