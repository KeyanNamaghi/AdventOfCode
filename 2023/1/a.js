const file = Bun.file('data.txt')
const contents = await file.text()

const lines = contents.split('\n')
const numbers = lines.map((line) => line.match(/\d/g))
const calibrationValue = numbers
  .map((line) => line[0] + line.pop())
  .map(Number)
  .reduce((a, b) => a + b)

console.log(calibrationValue)
