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

const counts = rounds
  .map((game) =>
    game.map((round) =>
      round
        .trim()
        .split(',')
        .reduce((acc, ball) => {
          const [num, color] = ball.trim().split(' ')
          return { ...acc, [color]: Number(num) }
        }, {}),
    ),
  )
  .map((counts) => {
    const minBalls = counts.reduce(
      (acc, count) => {
        const { red = 0, green = 0, blue = 0 } = count
        return { red: Math.max(red, acc.red), green: Math.max(green, acc.green), blue: Math.max(blue, acc.blue) }
      },
      { red: 0, green: 0, blue: 0 },
    )
    return minBalls.red * minBalls.green * minBalls.blue
  })

const result = counts.reduce((acc, val) => acc + val, 0)
console.log(result)
