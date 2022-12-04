var fs = require('fs')

const mostCalories = fs
  .readFileSync(`./1_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n\n')
  .map((elf) => elf.split('\n').reduce((prev, curr) => prev + +curr, 0))
  .reduce((a, b) => Math.max(a, b), -Infinity)

console.log('Elf with the most is carrying: ', mostCalories)
