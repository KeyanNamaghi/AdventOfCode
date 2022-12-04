var fs = require('fs')

const mostCalories = fs
  .readFileSync(`./1_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n\n')
  .map((elf) => elf.split('\n').reduce((prev, curr) => prev + +curr, 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((prev, curr) => prev + +curr, 0)

console.log('Top 3 Elves with the most is carrying: ', mostCalories)
