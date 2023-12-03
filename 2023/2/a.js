const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n')

const rounds = lines.map((line) => line.split(':').slice(1).join().split(';'))

const limits = {
  red: 12,
  green: 13,
  blue: 14,
}

const counts = rounds.map((game) =>
  game
    .map((round) =>
      round
        .trim()
        .split(',')
        .reduce((acc, ball) => {
          const [num, color] = ball.trim().split(' ')
          return num > limits[color] || acc
        }, false),
    )
    .reduce((acc, round) => acc || round, false),
)

console.log(counts.reduce((acc, val, index) => (val ? acc : acc + index + 1), 0))
