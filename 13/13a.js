var fs = require('fs')

const input = fs
  .readFileSync(`./13_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n\n')
  .map((pairs) => pairs.split('\n').map(JSON.parse))

const compare = (firstElement, secondElement) => {
  const firstIsANumber = typeof firstElement === 'number'
  const secondIsANumber = typeof secondElement === 'number'

  if (firstIsANumber && secondIsANumber) {
    if (firstElement < secondElement) {
      return true
    }
    if (firstElement > secondElement) {
      return false
    }
    return
  }

  if (firstIsANumber && !secondIsANumber) {
    return compare([firstElement], secondElement)
  }

  if (!firstIsANumber && secondIsANumber) {
    return compare(firstElement, [secondElement])
  }

  let index = 0
  while (index < 100) {
    if (index > firstElement.length - 1 && index <= secondElement.length - 1) {
      return true
    }

    if (index <= firstElement.length - 1 && index > secondElement.length - 1) {
      return false
    }

    if (index > firstElement.length - 1 && index > secondElement.length - 1) {
      return
    }

    const check = compare(firstElement[index], secondElement[index])
    if (typeof check !== 'undefined') {
      return check
    }

    index++
  }

  throw 'Got stuck in while loop!'
}

let score = 0

input.forEach(([first, second], index) => {
  if (compare(first, second)) {
    score += index + 1
  }
})

console.log(score)
