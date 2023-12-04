const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')

const scratchCards = lines
  .map((line) =>
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
  .map((card) => [...card, 1])

let index = 0

while (index < scratchCards.length) {
  const [winningNumbers, numbers, copies] = scratchCards[index]
  const points = winningNumbers.filter((n) => numbers.includes(n)).length
  for (let i = 1; i <= points; i++) {
    scratchCards[index + i][2] += copies
  }
  index++
}

// 8172507
const result = scratchCards.reduce((acc, [_winningNumbers, _numbers, count]) => acc + count, 0)
console.log(result)
