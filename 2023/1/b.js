const file = Bun.file('data.txt')
const contents = await file.text()

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const regex = `(\\d|${numbers.join('|')})`
const convertToNumber = (str) => numbers.indexOf(str) + 1 || str

const result = contents
  .split('\n')
  .map((line) => {
    const [, first] = line.match(regex)
    const [, last] = line.match(new RegExp('.*' + regex))
    return Number(`${convertToNumber(first)}${convertToNumber(last)}`)
  })
  .reduce((a, b) => a + b)

console.log(result)
